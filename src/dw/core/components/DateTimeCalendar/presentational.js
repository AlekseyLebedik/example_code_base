import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import classNames from 'classnames';

import Calendar from 'dw/core/components/Calendar';
import DateText from './components/DateText';
import Time from './components/Time';

import styles from './presentational.module.css';

const DateTimeCalendarStateless = ({
  value,
  timezone,
  onDateTextChange,
  calendarProps,
  onDateChange,
  onTimeChange,
  changeTimezoneHandler,
  classes,
}) => (
  <div
    className={classNames(classes.dateTimeCalendar, styles.dateTimeCalendar)}
  >
    <DateText
      value={value}
      timezone={timezone}
      onDateTextChange={onDateTextChange}
      changeTimezoneHandler={changeTimezoneHandler}
      minDate={calendarProps.minDate}
      maxDate={calendarProps.maxDate}
    />
    <Calendar
      value={moment(value).startOf('day')}
      timezone={timezone}
      {...calendarProps}
      onChange={onDateChange}
      classes={classes}
    />
    <Time
      value={value}
      timezone={timezone}
      onTimeChange={onTimeChange}
      minDate={calendarProps.minDate}
      maxDate={calendarProps.maxDate}
    />
  </div>
);

DateTimeCalendarStateless.propTypes = {
  value: PropTypes.object.isRequired,
  timezone: PropTypes.string.isRequired,
  onDateTextChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  changeTimezoneHandler: PropTypes.func.isRequired,
  calendarProps: PropTypes.object,
  classes: PropTypes.object,
};

DateTimeCalendarStateless.defaultProps = {
  calendarProps: {},
  classes: {},
};

export default DateTimeCalendarStateless;
