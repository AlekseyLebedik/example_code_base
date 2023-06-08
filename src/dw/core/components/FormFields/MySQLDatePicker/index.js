import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import DateTimePicker from 'dw/core/components/DateTimePicker';
import { formatDateTime, DATE_TIME_FORMATS } from 'dw/core/helpers/date-time';

const MySQLDatePicker = ({
  onChange: origOnChange,
  value: origValue,
  includeTime,
  ...props
}) => {
  const format = includeTime
    ? DATE_TIME_FORMATS.DATETIME_MYSQL
    : DATE_TIME_FORMATS.DATE_MYSQL;
  const onChange = date => {
    const formatted = formatDateTime(date, format, props.timezone);
    origOnChange(formatted);
  };
  const value = origValue && moment(origValue, format);
  return (
    <DateTimePicker
      {...props}
      onChange={onChange}
      value={value}
      dateOnly={!includeTime}
    />
  );
};

MySQLDatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  includeTime: PropTypes.bool.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default MySQLDatePicker;
