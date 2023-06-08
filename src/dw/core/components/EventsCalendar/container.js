import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment-timezone';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import pick from 'lodash/pick';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import {
  timezoneOrDefaultSelector,
  timestampToMoment,
} from 'dw/core/helpers/date-time';
import { useCompare } from 'dw/core/hooks';
import {
  setEventsCalendarSettings,
  clearEventsCalendarSettings as clearEventsCalendarSettingsAction,
} from './actions';
import { calendarTheme } from './theme';
import {
  LOCAL_STORAGE_CALENDAR_SETTINGS,
  LOCAL_STORAGE_PRESETS,
} from './constants';
import {
  createLoadingStatuses,
  dateInHoverRange,
  dateInPickedRange,
  dateIsSelected,
  fetchEventGroups,
  filterIgnoredPresetSettings,
  generateFilterPath,
  getLocalStorage,
  getLocalTimezoneOffset,
  isResetHover,
  parseJSON,
  removeGroupLocalTimezoneOffset,
  removeLocalTimezoneOffset,
  selectGroup,
  setCalendarFilters,
  setLocalStorage,
  validateSearchParams,
  sumEventGroupsEventTypes,
} from './helpers';

import { useCalendarDefaults } from './hooks';

import {
  makeFilteredEventsSelector,
  makeFilteredGamertagGroupsSelector,
  showAllColorsSelector,
} from './selectors';

import EventsCalendarStateless from './presentational';

export const EventsCalendar = props => {
  const {
    disabledFilters,
    eventGroups,
    gamertagGroups,
    datePickerInfo,
    affiliatedProjects,
    platforms,
    onFetchEvents,
    projectId: projectId_,
    availableViews,
    fetchDroppedEvent,
    updateHiddenGamertagList,
    onDropHeaderGroup,
  } = props;
  const dispatch = useDispatch();
  const clearEventsCalendarSettings = useCallback(
    () => dispatch(clearEventsCalendarSettingsAction()),
    [dispatch]
  );

  const history = useHistory();
  const location = useLocation();
  const { projectId: paramsProjectId } = useParams();
  const projectId = projectId_ || paramsProjectId;
  const showAllColors = useSelector(showAllColorsSelector);
  const userTimezone = useSelector(timezoneOrDefaultSelector);
  const eventsCalendarSettings = useSelector(
    state => state.Core.EventsCalendar
  );
  const {
    selectedDay,
    selectedStyle,
    selectedView,
    numberOfDays,
    customViewOn,
    groupLoadingStatuses,
    datePickerProps,
    eventTimeOffset,
    filters,
  } = eventsCalendarSettings;

  const getNonCustomDays = useCallback(
    view => {
      let numDays;
      switch (view) {
        case 'day':
          numDays = 1;
          break;
        case 'week':
          numDays = 7;
          break;
        default:
          numDays = moment(selectedDay).daysInMonth();
      }

      return Number(numDays);
    },
    [selectedDay]
  );

  const calendarDefaults = useCalendarDefaults(props);

  const setCalendarPresetSettings = useCallback(
    newSettings => {
      const storedSettings = {
        ...eventsCalendarSettings,
        ...newSettings,
      };
      const filteredSettings = filterIgnoredPresetSettings(storedSettings);
      setLocalStorage(
        LOCAL_STORAGE_CALENDAR_SETTINGS,
        projectId,
        filteredSettings
      );
      history.replace({
        search: generateFilterPath(filteredSettings),
      });
    },
    [eventsCalendarSettings, history, projectId]
  );

  const onSetCalendarSettings = useCallback(
    calendarSettings => dispatch(setEventsCalendarSettings(calendarSettings)),
    [dispatch]
  );

  const setCalendarSettings = useCallback(
    newSettings => {
      if (!datePickerInfo) {
        setCalendarPresetSettings(newSettings);
      }
      if (newSettings?.filters?.gamertags && updateHiddenGamertagList) {
        updateHiddenGamertagList(newSettings.filters.gamertags);
      }
      onSetCalendarSettings(newSettings);
    },
    [
      datePickerInfo,
      onSetCalendarSettings,
      setCalendarPresetSettings,
      updateHiddenGamertagList,
    ]
  );

  useEffect(() => {
    const calendarPresets = getLocalStorage(LOCAL_STORAGE_PRESETS, projectId);
    const presetSettings = calendarPresets ? JSON.parse(calendarPresets) : {};
    const previousCalendarSettings = getLocalStorage(
      LOCAL_STORAGE_CALENDAR_SETTINGS,
      projectId
    );
    const parsedPresetSettings = parseJSON(presetSettings.path);
    const parsedPreviousCalendarSettings = parseJSON(previousCalendarSettings);
    const {
      filters: defaultFilters,
      numberOfDays: defaultNumberOfDays,
      selectedDay: defaultSelectedDay,
    } = calendarDefaults;
    const fetchSelectedDay =
      parsedPreviousCalendarSettings &&
      parsedPreviousCalendarSettings.displayView === 'list'
        ? undefined
        : defaultSelectedDay;
    const parsedUrlSearch = validateSearchParams(
      location.search,
      defaultFilters
    );

    /**
     * Sets calendar settings on mount with any presets, previous
     * calendar settings, or search params overriding defaults
     */
    setCalendarSettings(
      merge(
        calendarDefaults,
        !datePickerInfo &&
          merge(
            parsedPresetSettings,
            parsedPreviousCalendarSettings,
            parsedUrlSearch
          )
      )
    );

    fetchEventGroups(
      onFetchEvents,
      eventGroups,
      filters.sources,
      fetchSelectedDay,
      defaultNumberOfDays
    );
    return () => clearEventsCalendarSettings();
  }, []);

  const prevUserTimezone = useCompare(userTimezone);
  useEffect(() => {
    if (prevUserTimezone !== userTimezone) {
      setCalendarSettings({
        eventTimeOffset: getLocalTimezoneOffset(userTimezone),
        selectedDay: selectedDay.tz(userTimezone),
      });
    }
  }, [prevUserTimezone, selectedDay, setCalendarSettings, userTimezone]);

  const prevDisabledFilters = useCompare(disabledFilters);
  useEffect(() => {
    if (prevDisabledFilters !== disabledFilters) {
      if (!isEmpty(disabledFilters) && disabledFilters.stories) {
        setCalendarSettings({
          filters: setCalendarFilters(
            filters,
            eventGroups,
            affiliatedProjects,
            platforms,
            gamertagGroups,
            disabledFilters
          ),
        });
      }
    }
  }, [
    prevDisabledFilters,
    affiliatedProjects,
    eventGroups,
    filters,
    gamertagGroups,
    platforms,
    setCalendarSettings,
    disabledFilters,
  ]);

  const eventTypesLength = sumEventGroupsEventTypes(eventGroups);
  const prevEventTypesLength = useCompare(eventTypesLength);
  useEffect(() => {
    if (prevEventTypesLength !== eventTypesLength) {
      setCalendarSettings({
        filters: setCalendarFilters(
          filters,
          eventGroups,
          affiliatedProjects,
          platforms,
          gamertagGroups,
          disabledFilters
        ),
      });
    }
  }, [
    prevEventTypesLength,
    eventTypesLength,
    affiliatedProjects,
    eventGroups,
    filters,
    gamertagGroups,
    platforms,
    setCalendarSettings,
    disabledFilters,
  ]);

  const prevDatePickerInfo = useCompare(datePickerInfo);
  useEffect(() => {
    if (
      prevDatePickerInfo &&
      datePickerInfo &&
      JSON.stringify(prevDatePickerInfo) !== JSON.stringify(datePickerInfo)
    ) {
      setCalendarSettings({
        datePickerProps: { ...datePickerInfo },
      });
    }
  }, [prevDatePickerInfo, setCalendarSettings, datePickerInfo]);

  const updatedGroupLoadingStatuses = useMemo(
    () => createLoadingStatuses(eventGroups),
    [eventGroups]
  );

  useEffect(() => {
    if (!isEqual(updatedGroupLoadingStatuses, groupLoadingStatuses)) {
      setCalendarSettings({
        groupLoadingStatuses: updatedGroupLoadingStatuses,
      });
    }
  }, [updatedGroupLoadingStatuses, groupLoadingStatuses, setCalendarSettings]);

  const prevGamertagGroups = useCompare(gamertagGroups);

  useEffect(() => {
    if (
      !isEqual(
        pick(prevGamertagGroups, ['active', 'name']),
        pick(gamertagGroups, ['active', 'name'])
      )
    ) {
      setCalendarSettings({
        filters: setCalendarFilters(
          filters,
          eventGroups,
          affiliatedProjects,
          platforms,
          gamertagGroups,
          disabledFilters
        ),
      });
    }
  }, [
    prevGamertagGroups,
    affiliatedProjects,
    disabledFilters,
    eventGroups,
    filters,
    platforms,
    setCalendarSettings,
    gamertagGroups,
  ]);

  const onChangeDatePickerSelection = useCallback(() => {
    if (datePickerProps) {
      const { endDate, startDate } = datePickerProps;
      let start;
      let end;
      let selectionDiff;
      if (startDate) start = timestampToMoment(startDate, userTimezone);
      if (endDate) end = timestampToMoment(endDate, userTimezone);
      if (startDate && endDate)
        selectionDiff = Math.abs(start.diff(end, 'days')) + 1;

      const startOfCurrentRange = moment(selectedDay)
        .startOf('week')
        .tz(userTimezone)
        .unix();
      const endOfCurrentRange = moment(selectedDay)
        .add(numberOfDays, 'days')
        .endOf('week')
        .tz(userTimezone)
        .unix();

      if (
        startDate &&
        endDate &&
        (startDate < startOfCurrentRange ||
          startDate > endOfCurrentRange ||
          endDate > endOfCurrentRange ||
          endDate < startOfCurrentRange)
      ) {
        setCalendarSettings({
          customViewOn: true,
          numberOfDays: selectionDiff <= 100 ? selectionDiff : 100,
          selectedDay: start,
        });
      } else if (Boolean(start) ^ Boolean(end)) {
        setCalendarSettings({
          customViewOn: true,
          numberOfDays: 30,
          selectedDay: start || end,
        });
      }
    }
  }, [
    datePickerProps,
    numberOfDays,
    selectedDay,
    setCalendarSettings,
    userTimezone,
  ]);

  const onDrillDown = useCallback(
    e => {
      const drillDownDay =
        (e.target && e.target.attributes && e.target.attributes.value.value) ||
        e;
      if (availableViews.find(view => view === 'day')) {
        setCalendarSettings({
          customViewOn: false,
          numberOfDays: 1,
          selectedDay: timestampToMoment(
            new Date(drillDownDay),
            userTimezone
          ).endOf('day'),
          selectedView: 'day',
        });
      } else {
        setCalendarSettings({
          selectedDay: timestampToMoment(
            new Date(drillDownDay),
            userTimezone
          ).endOf('day'),
        });
      }
    },
    [availableViews, setCalendarSettings, userTimezone]
  );

  const onEventDrop = useCallback(
    (event, selectedEventGroups, action) => {
      const { isRightClick } = event;
      if (isRightClick) {
        fetchDroppedEvent(event.event.id);
      }
      const { type } = event.event;
      const eventGroup = selectGroup(selectedEventGroups, type);
      const updatedEvent = removeLocalTimezoneOffset(event, eventTimeOffset);
      if (eventGroup && eventGroup.eventDragDrop) {
        eventGroup.eventDragDrop(updatedEvent, eventGroup.modifyEvent, action);
      }
    },
    [eventTimeOffset, fetchDroppedEvent]
  );

  const setDayMonthStyle = useCallback(
    (classes, date) => {
      const outOfRange =
        moment(date)
          .tz(userTimezone)
          .endOf('day')
          .isBefore(moment(selectedDay).startOf('day')) ||
        moment(date)
          .tz(userTimezone)
          .startOf('day')
          .isAfter(
            moment(selectedDay)
              .add(numberOfDays - 1, 'day')
              .endOf('day')
          );

      return {
        className: classNames(
          {
            [classes.dayMonth]: (customViewOn && !outOfRange) || !customViewOn,
          },
          {
            [classes.dayMonthOutOfRange]:
              customViewOn && outOfRange && selectedView === 'month',
          },
          {
            [classes.dayMonthHover]: Boolean(datePickerProps),
          },
          {
            [classes.dayMonthSelectedInRange]:
              (dateInPickedRange(date, datePickerProps, userTimezone) ||
                dateInHoverRange(date, datePickerProps, userTimezone)) &&
              !isResetHover(date, datePickerProps, userTimezone),
          },
          {
            [classes.dayMonthSelection]:
              dateIsSelected(date, datePickerProps, userTimezone) &&
              !isResetHover(date, datePickerProps, userTimezone),
          },
          {
            [classes.dayMonthResetHover]: isResetHover(
              date,
              datePickerProps,
              userTimezone
            ),
          }
        ),
      };
    },
    [
      customViewOn,
      datePickerProps,
      numberOfDays,
      selectedDay,
      selectedView,
      userTimezone,
    ]
  );

  const setCustomEvent = useCallback(
    ({ event }, parentClasses) => {
      const { type } = event;
      const eventGroup = selectGroup(eventGroups, type);
      if (!isEmpty(eventGroup)) {
        const { classes, CustomEvent, CustomEventProps } = eventGroup;
        return (
          <CustomEvent
            {...CustomEventProps}
            classes={classes}
            event={event}
            eventsCalendarSettings={eventsCalendarSettings}
            parentClasses={parentClasses}
            userTimezone={userTimezone}
          />
        );
      }
      return <div />;
    },
    [eventGroups, eventsCalendarSettings, userTimezone]
  );

  const setEventStyle = useCallback(
    (event, styles, classes) => {
      const { classes: groupClasses, customEventStyles = () => {} } =
        selectGroup(eventGroups, event.type);

      const allClasses = { ...classes, ...groupClasses };
      const customStyle =
        allClasses[
          customEventStyles(
            event,
            showAllColors,
            filters,
            selectedStyle,
            affiliatedProjects
          )
        ] || allClasses['noCustomTags-event'];

      const isNoEnd =
        event.type === 'abTesting' ? !event.testPeriodTo : !event.end_at;

      const noEndStyle =
        isNoEnd &&
        selectedView === 'month' &&
        // eslint-disable-next-line no-underscore-dangle
        !event.__isOverlayEvent &&
        `event-with-noEnd`;

      return {
        className: classNames(...styles, customStyle, allClasses[noEndStyle]),
        parentClasses: classNames(...styles, customStyle),
      };
    },
    [
      affiliatedProjects,
      eventGroups,
      filters,
      selectedStyle,
      selectedView,
      showAllColors,
    ]
  );

  const changeCalendarView = view => {
    const numDays = getNonCustomDays(view);

    setCalendarSettings({
      customViewOn: false,
      numberOfDays: numDays,
      selectedView: view,
    });
  };

  const navigateCalendar = date => {
    const daysInMonth =
      !customViewOn && selectedView === 'month'
        ? moment(date).daysInMonth()
        : numberOfDays;
    const newSelectedDay = moment(date).tz(userTimezone).endOf('day');

    setCalendarSettings({
      numberOfDays: daysInMonth,
      selectedDay: newSelectedDay,
    });
  };

  const handleSelectEvent = (event, selectedEventGroups) => {
    const eventGroup = selectGroup(selectedEventGroups, event.type);
    if (eventGroup) {
      const { onSelectEvent } = eventGroup;
      return onSelectEvent(event);
    }
    return null;
  };

  const handleHeaderGroupDrop = ({ group, start }) => {
    onDropHeaderGroup({
      group,
      start: removeGroupLocalTimezoneOffset(start, eventTimeOffset),
    });
  };

  const filteredEventsSelector = useMemo(
    () => makeFilteredEventsSelector(),
    []
  );
  const filteredEvents = useSelector(state =>
    filteredEventsSelector(state, props)
  );
  const filteredGamertagGroupsSelector = useMemo(
    () => makeFilteredGamertagGroupsSelector(),
    []
  );
  const filteredGamertagGroups = useSelector(state =>
    filteredGamertagGroupsSelector(state, props)
  );
  const newProps = {
    ...props,
    filteredEvents,
    filteredGamertagGroups,
    changeCalendarView,
    defaultDate:
      selectedDay.endOf('day') || moment().tz(userTimezone).endOf('day'),
    getNonCustomDays,
    handleHeaderGroupDrop,
    handleSelectEvent,
    navigateCalendar,
    onChangeDatePickerSelection,
    onDrillDown,
    onEventDrop,
    setCalendarSettings,
    setCustomEvent,
    setDayMonthStyle,
    setEventStyle,
    eventsCalendarSettings,
    showAllColors,
    userTimezone,
    selectedStyle,
  };

  return (
    <MuiThemeProvider theme={calendarTheme}>
      <EventsCalendarStateless {...newProps} />
    </MuiThemeProvider>
  );
};

EventsCalendar.propTypes = {
  affiliatedProjects: PropTypes.arrayOf(PropTypes.object),
  availableViews: PropTypes.arrayOf(PropTypes.string),
  datePickerInfo: PropTypes.object,
  eventsCalendarSettings: PropTypes.object,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  gamertagGroups: PropTypes.arrayOf(PropTypes.object),
  onFetchEvents: PropTypes.func.isRequired,
  onSelectSlot: PropTypes.func,
  onDropHeaderGroup: PropTypes.func,
  platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectId: PropTypes.string,
  sidebar: PropTypes.bool.isRequired,
  disabledFilters: PropTypes.object,
  updateHiddenGamertagList: PropTypes.func,
  fetchDroppedEvent: PropTypes.func,
};

EventsCalendar.defaultProps = {
  affiliatedProjects: undefined,
  eventsCalendarSettings: {},
  fetchDroppedEvent: undefined,
  updateHiddenGamertagList: undefined,
  availableViews: ['day', 'week', 'month'],
  datePickerInfo: null,
  gamertagGroups: [],
  onSelectSlot: () => {},
  onDropHeaderGroup: () => {},
  projectId: '',
  disabledFilters: {},
};

export default EventsCalendar;
