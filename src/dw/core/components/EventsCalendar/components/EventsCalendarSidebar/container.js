import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { fetchEventGroups } from 'dw/core/components/EventsCalendar/helpers';

import EventsCalendarSidebarStateless from './presentational';

export const EventsCalendarSidebar = props => {
  const {
    eventGroups,
    filteredEvents,
    onFetchEvents,
    setCalendarSettings,
    userTimezone,
  } = props;

  const dispatch = useDispatch();
  const filters = useSelector(state => state.Core.EventsCalendar.filters);
  const selectedDay = useSelector(
    state => state.Core.EventsCalendar.selectedDay
  );
  const numberOfDays = useSelector(
    state => state.Core.EventsCalendar.numberOfDays
  );
  const toastMsg = (msg, type) =>
    dispatch(GlobalSnackBarActions.show(msg, type));
  const copyLinkToClipboard = () =>
    new Promise((resolve, reject) => {
      const text = window.location.href;
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (success) resolve();
      else reject();
    }).then(
      () =>
        toastMsg(
          'A URL with your current calendar settings has been copied to your clipboard',
          'success'
        ),
      err => toastMsg(`Could not copy text: ${err}`, 'error')
    );

  const filterDaysWithDots = () => {
    const daysWithDots = {};
    if (filteredEvents) {
      filteredEvents
        .map(event => moment(event.start).tz(userTimezone).startOf('day'))
        .forEach(event => {
          // eslint-disable-next-line no-unused-expressions
          daysWithDots.hasOwnProperty(event)
            ? (daysWithDots[event] += 1)
            : (daysWithDots[event] = 1);
        });
    }
    return daysWithDots;
  };

  const toggleDisplayView = view => {
    const settings = { displayView: view };
    if (view === 'calendar') {
      const days = Math.min(numberOfDays, 100);
      settings.customRangeInput = days;
      settings.numberOfDays = days;
      fetchEventGroups(
        onFetchEvents,
        eventGroups,
        filters.sources,
        selectedDay,
        numberOfDays
      );
    } else {
      fetchEventGroups(onFetchEvents, eventGroups, filters.sources);
    }
    setCalendarSettings(settings);
  };

  return (
    <EventsCalendarSidebarStateless
      {...props}
      copyLinkToClipboard={copyLinkToClipboard}
      daysWithDots={filterDaysWithDots()}
      toggleDisplayView={toggleDisplayView}
    />
  );
};

EventsCalendarSidebar.propTypes = {
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredEvents: PropTypes.arrayOf(PropTypes.object),
  onFetchEvents: PropTypes.func.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

EventsCalendarSidebar.defaultProps = {
  filteredEvents: [],
};

export default EventsCalendarSidebar;
