import { connect } from 'react-redux';

import { timezoneOrDefaultSelector } from 'dw/core/helpers/date-time';

import MySQLDatePicker from './MySQLDatePicker';
import MySQLDateTimePicker from './MySQLDateTimePicker';

const stateToProps = state => ({
  timezone: timezoneOrDefaultSelector(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  timezone: stateProps.timezone,
});

const LocalizedMySQLDatePicker = connect(
  stateToProps,
  null,
  mergeProps
)(MySQLDatePicker);

const LocalizedMySQLDateTimePicker = connect(
  stateToProps,
  null,
  mergeProps
)(MySQLDateTimePicker);

export { LocalizedMySQLDatePicker, LocalizedMySQLDateTimePicker };
