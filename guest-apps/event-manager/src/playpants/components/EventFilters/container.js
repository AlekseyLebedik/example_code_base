import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { affiliatedProjectsSelector } from 'playpants/components/App/selectors';
import { filterPropsDisabledSelector } from 'playpants/components/ScheduleComponent/selectors';
import { setEventsCalendarSettings } from 'dw/core/components/EventsCalendar/actions';
import { useCalendarDefaults } from 'dw/core/components/EventsCalendar/hooks';
import { PLATFORM_FILTERS } from 'dw/core/components/EventsCalendar/constants';
import { useCalendarPresets } from 'playpants/components/EventSidebar/components/CalendarPresets/hooks';
import {
  useInformationalEventsEnabledCheck,
  useEventManagerEventsEnabledCheck,
} from './hooks';
import EventFiltersStateless from './presentational';
import {
  getGroups,
  getInitialFilters,
  updateQueryWithFilters,
} from './helpers';

const EventFilters = props => {
  const { eventGroups, filtersRef } = props;
  const history = useHistory();
  const disabledFilters = useSelector(filterPropsDisabledSelector, isEqual);
  const presets = useCalendarPresets();

  const affiliatedProjects = useSelector(affiliatedProjectsSelector, isEqual);
  const platforms = PLATFORM_FILTERS;
  const calendarDefaults = useCalendarDefaults({
    ...props,
    platforms,
    affiliatedProjects,
    eventGroups,
  });

  const initialSettings = useMemo(() => {
    const query = queryString.parse(history.location.search);
    const initialFilters = merge({}, calendarDefaults.filters, presets.filters);
    // If presets have not been updated with current affiliated projects list, there
    // may be some projects in the initial filters that shouldn't be there, this will
    // filter them out
    initialFilters.projects = omit(
      initialFilters?.projects || {},
      Object.keys(presets?.filters?.projects || {}).filter(project => {
        return !Object.keys(calendarDefaults?.filters?.projects || {}).find(
          p => p === project
        );
      })
    );
    const queryFilters = getInitialFilters(query, initialFilters);
    return {
      filters: queryFilters,
      selectedStyle:
        query.selectedStyle ||
        presets.selectedStyle ||
        calendarDefaults.selectedStyle ||
        'projects',
      numberOfDays: presets.numberOfDays || calendarDefaults.numberOfDays,
    };
    // eslint-disable-next-line
  }, []);

  const selectedStyle = useSelector(
    state => state.Core.EventsCalendar.selectedStyle
  );
  const filters = useSelector(
    state => state.Core.EventsCalendar.filters,
    isEqual
  );

  const dispatch = useDispatch();
  const setCalendarSettings = useCallback(
    newSettings => {
      const merged = merge(
        {},
        initialSettings,
        { filters: omit(filters, ['projects']), selectedStyle },
        newSettings
      );
      dispatch(setEventsCalendarSettings(merged));
    },
    [initialSettings, dispatch, filters, selectedStyle]
  );

  useEffect(
    () => setCalendarSettings(initialSettings),
    // eslint-disable-next-line
    [initialSettings]
  );

  useEffect(() => {
    filtersRef(filters);
    const query = updateQueryWithFilters(
      queryString.parse(history.location.search),
      filters
    );
    history.replace({
      pathname: history.location.pathname,
      search: queryString.stringify(query),
    });
  }, [filters, filtersRef, history]);

  useEffect(() => {
    const query = queryString.parse(history.location.search);
    query.selectedStyle = selectedStyle;
    history.replace({
      pathname: history.location.pathname,
      search: queryString.stringify(query),
    });
  }, [history, selectedStyle]);

  const filterGroups = useMemo(
    () =>
      filters
        ? getGroups({
            eventGroups,
            filters,
            disabledFilters,
          }).filter(({ name }) => name !== 'eventManager')
        : [],
    [eventGroups, filters, disabledFilters]
  );
  const informationalEventsEnabled = useInformationalEventsEnabledCheck();
  const eventManagerEventsEnabled = useEventManagerEventsEnabledCheck();
  return (
    <EventFiltersStateless
      filterGroups={filterGroups}
      filters={filters}
      informationalEventsEnabled={informationalEventsEnabled}
      eventManagerEventsEnabled={eventManagerEventsEnabled}
      {...props}
      setCalendarSettings={setCalendarSettings}
    />
  );
};

EventFilters.propTypes = {
  eventGroups: PropTypes.array,
  disabledFilters: PropTypes.object,
  onFetchEvents: PropTypes.func,
  filtersRef: PropTypes.func,
};

EventFilters.defaultProps = {
  eventGroups: [],
  disabledFilters: {},
  onFetchEvents: () => {},
  filtersRef() {},
};

export default EventFilters;
