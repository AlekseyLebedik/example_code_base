import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import EventCards from './components/EventCards';

import * as actions from './actions';
import { historySelector } from './selectors';

import styles from './index.module.css';

const HistoryLog = ({ fetchLogs, eventId, history, eventData, dateTime }) => {
  useEffect(() => {
    fetchLogs(eventId);
  }, [eventData]);

  return (
    <div className={styles.timeline}>
      <Grid container justify="space-around" className={styles.headerGrid}>
        <Grid item>Field</Grid>
        <Grid item>Original Value</Grid>
        <Grid item>New Value</Grid>
      </Grid>
      <EventCards history={history.slice().reverse()} dateTime={dateTime} />
    </div>
  );
};

const mapStateToProps = state => ({
  history: historySelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchLogs: bindActionCreators(actions.fetchLogs, dispatch),
});

HistoryLog.propTypes = {
  dateTime: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  fetchLogs: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryLog);
