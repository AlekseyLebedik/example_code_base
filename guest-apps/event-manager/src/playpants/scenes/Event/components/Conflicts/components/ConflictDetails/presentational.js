import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Grid from '@material-ui/core/Grid';

import ConflictActivityDetailsComponent from './components/ConflictActivityDetails';
import ConflictOverview from './components/ConflictOverview';

import styles from './index.module.css';

const ConflictDetailsPresentational = props => {
  const {
    conflictActivityDetails,
    conflictDetails,
    dateTime,
    eventData,
    userTimezone,
  } = props;

  return (
    <div className={styles.conflictsDetailsContainer}>
      {!isEmpty(conflictDetails) && (
        <ConflictOverview
          conflictDetails={conflictDetails}
          dateTime={dateTime}
          userTimezone={userTimezone}
        />
      )}
      <Grid className={styles.gridContainer} container spacing={5}>
        {conflictActivityDetails.event_activity && (
          <Grid item xs={12}>
            <ConflictActivityDetailsComponent
              {...props}
              activity={conflictActivityDetails.event_activity}
              activityConflictSeverity={conflictActivityDetails.severity}
              details={conflictActivityDetails.details}
              event={eventData}
            />
          </Grid>
        )}
        {conflictActivityDetails.overlapping_event_activity && (
          <Grid item xs={12}>
            <ConflictActivityDetailsComponent
              {...props}
              activity={conflictActivityDetails.overlapping_event_activity}
              activityConflictSeverity={conflictActivityDetails.severity}
              details={conflictActivityDetails.details}
              event={conflictDetails.conflicting_event}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

ConflictDetailsPresentational.propTypes = {
  conflictActivityDetails: PropTypes.object,
  conflictDetails: PropTypes.object,
  dateTime: PropTypes.func.isRequired,
  eventData: PropTypes.object,
  userTimezone: PropTypes.string.isRequired,
};

ConflictDetailsPresentational.defaultProps = {
  conflictActivityDetails: {},
  conflictDetails: {},
  eventData: null,
};

export default ConflictDetailsPresentational;
