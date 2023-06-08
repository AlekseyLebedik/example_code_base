import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Calendar } from '@demonware/ct-react-big-calendar';
import { useSelector } from 'react-redux';

import momentLocalizer from '@demonware/ct-react-big-calendar/lib/localizers/moment';
import withDragAndDrop from '@demonware/ct-react-big-calendar/lib/addons/dragAndDrop';
import '@demonware/ct-react-big-calendar/lib/sass/styles.scss';
import '@demonware/ct-react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { useCompare } from 'dw/core/hooks';

import EventsCalendarSidebar from './components/EventsCalendarSidebar';
import EventsList from './components/EventsList';
import EventsTimeline from './components/EventsTimeline';
import ToolbarConnected from './components/Toolbar';
import DateHeaderGroup from './components/DateHeaderGroup';
import DateHeaderGroupWrapper from './components/DateHeaderGroupWrapper';

import { useStyles } from './theme';

import {
  customFiltersSelected,
  getGamertagsStartTime,
  getSelectedViewStyles,
  setViewComponents,
} from './helpers';

import styles from './index.module.css';

import './rbcOverrides.css';

const DnDCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

const formats = {
  dateFormat: 'D',
  dayHeaderFormat: 'dddd MMMM D, YYYY',
  dayFormat: 'ddd D',
  dayRangeHeaderFormat: ({ start, end }, culture, dateLocalizer) =>
    `${dateLocalizer.format(
      start,
      'MMM D, YYYY',
      culture
    )} — ${dateLocalizer.format(end, 'MMM D, YYYY', culture)}`,
  eventTimeRangeFormat: () => null,
  weekdayFormat: 'dddd',
};

const useSetGamertagsInterval = (props, delay) => {
  const savedProps = useRef(props);

  // Remember the latest props
  const latestProps = useCompare(props);
  useEffect(() => {
    savedProps.current = latestProps;
  }, [latestProps]);

  const setGamertags = () => {
    const {
      eventTimeOffset,
      filteredGamertagGroups,
      setDateHeaderGroups,
      userTimezone,
    } = savedProps.current;
    if (filteredGamertagGroups.length) {
      const gamertags = getGamertagsStartTime(
        filteredGamertagGroups,
        userTimezone,
        eventTimeOffset
      );
      setDateHeaderGroups(gamertags);
    }
  };

  // handle initial set on load
  const filteredGamertagGroups = useCompare(props.filteredGamertagGroups);
  useEffect(() => {
    setGamertags();
  }, [filteredGamertagGroups]);

  // Set up the interval
  useEffect(() => {
    const id = setInterval(() => {
      setGamertags();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export const EventsCalendarPresentational = props => {
  const classes = useStyles();

  const [dateHeaderGroups, setDateHeaderGroups] = useState([]);
  const {
    affiliatedProjects,
    availableViews,
    changeCalendarView,
    defaultDate,
    eventGroups,
    filteredEvents,
    filteredGamertagGroups,
    handleHeaderGroupDrop,
    handleSelectEvent,
    navigateCalendar,
    onChangeDatePickerSelection,
    onDrillDown,
    onEventDrop,
    onSelectHeaderGroup,
    onSelectSlot,
    permissions,
    setCalendarSettings,
    setCustomEvent,
    setDayMonthStyle,
    setEventStyle,
    showAllColors,
    sidebar,
    userTimezone,
    selectedStyle,
  } = props;
  const {
    displayView,
    eventTimeOffset,
    filters: {
      customTags: { userTags },
    },
    selectedDay,
    selectedView,
  } = useSelector(state => state.Core.EventsCalendar);
  const views = setViewComponents(availableViews);

  // Set gamertag start time at interval considering offset
  useSetGamertagsInterval(
    {
      eventTimeOffset,
      filteredGamertagGroups,
      setDateHeaderGroups,
      userTimezone,
    },
    60000
  );

  const renderDnDCalendar = useMemo(
    () => (
      <DnDCalendar
        key={`${showAllColors}-${selectedStyle}`}
        classes={classes}
        className={styles.eventCalendarView}
        components={{
          dateHeaderGroup: DateHeaderGroup,
          dateHeaderGroupWrapper: DateHeaderGroupWrapper,
          event: event => {
            const { parentClasses } = setEventStyle(
              event.event,
              [
                styles.calendarEvent,
                getSelectedViewStyles(event, selectedView),
              ],
              classes
            );
            return setCustomEvent(event, parentClasses);
          },
        }}
        date={selectedDay && moment(selectedDay).tz(userTimezone).toDate()}
        dateHeaderGroups={dateHeaderGroups}
        dayPropGetter={date => setDayMonthStyle(classes, date)}
        defaultDate={moment(defaultDate).tz(userTimezone).toDate()}
        defaultView={selectedView}
        dragDropStyles={{
          dragged: styles.draggedComponent,
        }}
        eventPropGetter={event => {
          const { className } = setEventStyle(
            event,
            [styles.calendarEvent, getSelectedViewStyles(event, selectedView)],
            classes
          );
          return { className };
        }}
        events={filteredEvents}
        formats={formats}
        localizer={localizer}
        onDrillDown={onDrillDown}
        onEventDrop={event => onEventDrop(event, eventGroups, 'move')}
        onEventResize={event => onEventDrop(event, eventGroups, 'resize')}
        onGroupDrop={handleHeaderGroupDrop}
        onNavigate={navigateCalendar}
        onSelectSlot={event => {
          if (event.slots.length) {
            onSelectSlot(event, eventTimeOffset, selectedView);
            onChangeDatePickerSelection();
          }
        }}
        onSelectEvent={event => handleSelectEvent(event, eventGroups)}
        onSelectHeaderGroup={onSelectHeaderGroup}
        onView={changeCalendarView}
        popup
        resizable
        selectable
        showMultiDayTimes
        toolbar={false}
        userTimezone={userTimezone}
        view={selectedView}
        views={views}
      />
    ),
    [
      changeCalendarView,
      classes,
      dateHeaderGroups,
      defaultDate,
      eventGroups,
      eventTimeOffset,
      filteredEvents,
      handleHeaderGroupDrop,
      handleSelectEvent,
      navigateCalendar,
      onChangeDatePickerSelection,
      onDrillDown,
      onEventDrop,
      onSelectHeaderGroup,
      onSelectSlot,
      selectedDay,
      selectedView,
      setCustomEvent,
      setDayMonthStyle,
      setEventStyle,
      userTimezone,
      views,
      showAllColors,
      selectedStyle,
    ]
  );

  const renderDisplayView = () => {
    switch (displayView) {
      case 'list':
        return (
          <EventsList
            affiliatedProjects={affiliatedProjects}
            classes={classes}
            customFiltersSelected={customFiltersSelected(userTags)}
            eventGroups={eventGroups}
            events={filteredEvents}
            permissions={permissions}
            showAllColors={showAllColors}
            userTimezone={userTimezone}
          />
        );
      case 'timeline':
        return (
          <div className={classes.calendarView}>
            <EventsTimeline
              eventGroups={eventGroups}
              events={filteredEvents}
              onSelectEvent={event => handleSelectEvent(event, eventGroups)}
              onSelectSlot={event =>
                onSelectSlot(event, eventTimeOffset, selectedView)
              }
              setCalendarSettings={setCalendarSettings}
              userTimezone={userTimezone}
            />
          </div>
        );
      default:
        return renderDnDCalendar;
    }
  };

  return (
    <div className={styles.eventCalendarContainer}>
      {sidebar && (
        <EventsCalendarSidebar
          {...props}
          classes={classes}
          filteredEvents={filteredEvents}
        />
      )}
      <div className={styles.eventsCalendarToolbarContainer}>
        {displayView !== 'list' && (
          <ToolbarConnected {...props} classes={classes} views={views} />
        )}
        {renderDisplayView()}
      </div>
    </div>
  );
};

EventsCalendarPresentational.propTypes = {
  affiliatedProjects: PropTypes.arrayOf(PropTypes.object),
  availableViews: PropTypes.arrayOf(PropTypes.string),
  changeCalendarView: PropTypes.func.isRequired,
  defaultDate: PropTypes.object,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredEvents: PropTypes.arrayOf(PropTypes.object),
  filteredGamertagGroups: PropTypes.arrayOf(PropTypes.object),
  handleHeaderGroupDrop: PropTypes.func,
  handleSelectEvent: PropTypes.func.isRequired,
  navigateCalendar: PropTypes.func.isRequired,
  onChangeDatePickerSelection: PropTypes.func.isRequired,
  onDrillDown: PropTypes.func.isRequired,
  onEventDrop: PropTypes.func.isRequired,
  onSelectHeaderGroup: PropTypes.func,
  onSelectSlot: PropTypes.func.isRequired,
  permissions: PropTypes.object.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  setCustomEvent: PropTypes.func.isRequired,
  setDayMonthStyle: PropTypes.func.isRequired,
  setEventStyle: PropTypes.func.isRequired,
  showAllColors: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired,
  userTimezone: PropTypes.string.isRequired,
  selectedStyle: PropTypes.string,
};

EventsCalendarPresentational.defaultProps = {
  affiliatedProjects: [],
  availableViews: ['day', 'week', 'month'],
  defaultDate: moment(),
  handleHeaderGroupDrop: null,
  onSelectHeaderGroup: () => {},
  filteredEvents: [],
  filteredGamertagGroups: [],
  selectedStyle: '',
};

export default EventsCalendarPresentational;
