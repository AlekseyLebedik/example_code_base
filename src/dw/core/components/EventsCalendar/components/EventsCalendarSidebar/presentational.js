import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useSelector } from 'react-redux';

import IconButton from 'dw/core/components/IconButton';

import { roundUpMomentHour } from 'dw/core/helpers/date-time';

import Calendar from './components/MiniCalendar';
import DatePickerFields from './components/DatePickerFields';
import CalendarPresets from './components/CalendarPresets';
import FiltersTable from './components/FiltersTable';

import styles from './index.module.css';

const EventsCalendarSidebar = ({
  classes,
  copyLinkToClipboard,
  createDisabled,
  datePickerInfo,
  daysWithDots,
  eventGroups,
  exportEvents,
  exportExcludeTypes,
  filteredEvents,
  navigateCalendar,
  onChangeDatePickerSelection,
  onFetchEvents,
  onPresetsUpdate,
  onSelectSlot,
  permissions: { adminUser, staffUser },
  presetOptions,
  projectId,
  setCalendarSettings,
  toggleDisplayView,
  userTimezone,
  disabledFilters,
}) => {
  const { datePickerProps, displayView, eventTimeOffset, selectedDay } =
    useSelector(state => state.Core.EventsCalendar);

  const ShareLinkTrigger = () => (
    <IconButton
      icon="insert_link"
      onClick={copyLinkToClipboard}
      tooltip="Share URL Link"
    />
  );

  const CreateEventTrigger = () => (
    <IconButton
      dataCy="createEventButton"
      color="inherit"
      icon="add_circle"
      onClick={() =>
        onSelectSlot(roundUpMomentHour(moment()).toDate(), eventTimeOffset)
      }
      tooltip="Create Event"
    />
  );

  const DisplayViewToggleOption = (classname, icon, view, tooltip) => (
    <IconButton
      className={classname}
      icon={icon}
      onClick={() => toggleDisplayView(view)}
      tooltip={tooltip}
      type="button"
      variant={(displayView === view && 'contained') || 'outlined'}
    />
  );

  const renderHelperButtons = () => (
    <>
      {exportEvents &&
        !isEmpty(
          filteredEvents.filter(
            e => !exportExcludeTypes.find(type => type === e.event_type)
          )
        ) &&
        staffUser && (
          <IconButton
            icon="save_alt"
            onClick={exportEvents}
            tooltip="Export Events"
          />
        )}
      <ShareLinkTrigger />
      {onSelectSlot && !createDisabled && <CreateEventTrigger />}
    </>
  );

  return (
    <div
      className={styles.eventsCalendarSidebarContainer}
      data-cy="eventsCalendarSidebarContainer"
      onMouseEnter={() => setCalendarSettings({ sidebarHovering: true })}
      onMouseLeave={() => setCalendarSettings({ sidebarHovering: false })}
    >
      {isNil(datePickerProps) && (
        <div className={styles.eventsCalendarSidebarTop}>
          <div className={styles.buttonGroup}>
            {DisplayViewToggleOption(
              styles.leftButton,
              'date_range',
              'calendar',
              'Calendar View'
            )}
            {DisplayViewToggleOption(
              styles.middleButton,
              'view_list',
              'list',
              'List View'
            )}
            {DisplayViewToggleOption(
              styles.rightButton,
              'clear_all',
              'timeline',
              'Timeline View'
            )}
          </div>
          {renderHelperButtons()}
        </div>
      )}
      {!datePickerInfo &&
        (adminUser || (!adminUser && !isEmpty(presetOptions))) && (
          <CalendarPresets
            adminUser={adminUser}
            onPresetsUpdate={onPresetsUpdate}
            presetOptions={presetOptions}
            projectId={projectId}
            setCalendarSettings={setCalendarSettings}
          />
        )}
      {isNil(datePickerProps) ? (
        <Calendar
          classes={classes}
          daysWithDots={daysWithDots}
          navigateCalendar={navigateCalendar}
          selectedDay={selectedDay}
          userTimezone={userTimezone}
        />
      ) : (
        <DatePickerFields
          onChangeDatePickerSelection={onChangeDatePickerSelection}
          userTimezone={userTimezone}
        />
      )}
      <FiltersTable
        classes={classes}
        eventGroups={eventGroups}
        onFetchEvents={onFetchEvents}
        setCalendarSettings={setCalendarSettings}
        disabledFilters={disabledFilters}
      />
    </div>
  );
};

EventsCalendarSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  copyLinkToClipboard: PropTypes.func.isRequired,
  createDisabled: PropTypes.bool,
  datePickerInfo: PropTypes.object,
  daysWithDots: PropTypes.object.isRequired,
  disabledFilters: PropTypes.object.isRequired,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  exportEvents: PropTypes.func,
  exportExcludeTypes: PropTypes.arrayOf(PropTypes.string),
  filteredEvents: PropTypes.arrayOf(PropTypes.object),
  navigateCalendar: PropTypes.func.isRequired,
  onChangeDatePickerSelection: PropTypes.func.isRequired,
  onFetchEvents: PropTypes.func.isRequired,
  onPresetsUpdate: PropTypes.func,
  onSelectSlot: PropTypes.func.isRequired,
  presetOptions: PropTypes.arrayOf(PropTypes.object),
  projectId: PropTypes.string.isRequired,
  permissions: PropTypes.shape({
    adminUser: PropTypes.bool.isRequired,
    staffUser: PropTypes.bool.isRequired,
  }).isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  toggleDisplayView: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

EventsCalendarSidebar.defaultProps = {
  createDisabled: false,
  datePickerInfo: null,
  exportEvents: null,
  exportExcludeTypes: [],
  filteredEvents: [],
  onPresetsUpdate: () => {},
  presetOptions: [],
};

export default EventsCalendarSidebar;
