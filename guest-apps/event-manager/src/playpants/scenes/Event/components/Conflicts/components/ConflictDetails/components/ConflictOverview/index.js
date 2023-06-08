import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import { CONFLICT_TYPES } from 'playpants/constants/conflicts';

import styles from './index.module.css';

const ConflictOverview = ({
  conflictDetails: {
    conflicting_event: {
      end_at: endAt,
      env_type: envType,
      id,
      publish_at: publishAt,
      status,
      title,
    },
    severity,
  },
  dateTime,
}) => (
  <>
    <AppBar position="static">
      <Grid container className={styles.gridPadding}>
        <Grid item xs={6} lg={4}>
          Event ID: {id}
        </Grid>
        <Grid item xs={6} lg={4}>
          Title: {title}
        </Grid>
        <Grid item xs={6} lg={4}>
          Status: {capitalize(status)}
        </Grid>
        <Grid item xs={6} lg={4}>
          Env Type: {envType}
        </Grid>
        <Grid item xs={6} lg={4}>
          Publish at: {dateTime(publishAt)}
        </Grid>
        <Grid item xs={6} lg={4}>
          End at: {dateTime(endAt)}
        </Grid>
        <Grid item xs={6} lg={4}>
          Event Conflict Severity: {CONFLICT_TYPES[severity]}
        </Grid>
      </Grid>
    </AppBar>
  </>
);

ConflictOverview.propTypes = {
  conflictDetails: PropTypes.object.isRequired,
  dateTime: PropTypes.func.isRequired,
};

export default ConflictOverview;
