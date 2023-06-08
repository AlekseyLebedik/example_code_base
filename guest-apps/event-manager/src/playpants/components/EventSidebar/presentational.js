import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import CalendarPresets from './components/CalendarPresets';
import EventFilters from '../EventFilters';

import styles from './index.module.css';

const EventsSidebar = props => {
  const {
    classes,
    eventGroups,
    onFetchEvents,
    onPresetsUpdate,
    permissions: { adminPermission: adminUser },
    presetOptions,
    currentProject,
    disabledFilters,
    setCalendarSettings,
    ...filterProps
  } = props;

  return (
    <div
      className={styles.eventsCalendarSidebarContainer}
      data-cy="eventsCalendarSidebarContainer"
    >
      {(adminUser || (!adminUser && !isEmpty(presetOptions))) && (
        <CalendarPresets
          adminUser={adminUser}
          onPresetsUpdate={onPresetsUpdate}
          presetOptions={presetOptions}
          projectId={`${currentProject?.id}`}
          setCalendarSettings={setCalendarSettings}
        />
      )}
      <EventFilters
        classes={classes}
        eventGroups={eventGroups}
        onFetchEvents={onFetchEvents}
        setCalendarSettings={setCalendarSettings}
        disabledFilters={disabledFilters}
        {...filterProps}
      />
    </div>
  );
};

EventsSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  disabledFilters: PropTypes.object.isRequired,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFetchEvents: PropTypes.func.isRequired,
  onPresetsUpdate: PropTypes.func,
  presetOptions: PropTypes.arrayOf(PropTypes.object),
  permissions: PropTypes.shape({
    adminPermission: PropTypes.bool.isRequired,
    eventWritePermission: PropTypes.bool.isRequired,
    staffUser: PropTypes.bool.isRequired,
  }).isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  currentProject: PropTypes.object.isRequired,
};

EventsSidebar.defaultProps = {
  onPresetsUpdate: () => {},
  presetOptions: [],
};

export default EventsSidebar;
