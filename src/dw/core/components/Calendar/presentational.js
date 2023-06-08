import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Toolbar from './components/Toolbar';
import Month from './components/Month';

import styles from './presentational.module.css';

const CalendarStateless = ({
  currentDate,
  selectedDate,
  backMonthHandler,
  forwardMonthHandler,
  changeMonthHandler,
  changeYearHandler,
  onChange,
  minDate,
  maxDate,
  classes,
  renderDay,
  timezone,
}) => (
  <div className={classNames(classes.calendar, styles.calendar)}>
    <Toolbar
      currentDate={currentDate}
      backMonthHandler={backMonthHandler}
      forwardMonthHandler={forwardMonthHandler}
      changeMonthHandler={changeMonthHandler}
      changeYearHandler={changeYearHandler}
    />
    <Month
      currentDate={currentDate}
      selectedDate={selectedDate}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      renderDay={renderDay}
      timezone={timezone}
    />
  </div>
);

CalendarStateless.propTypes = {
  currentDate: PropTypes.object.isRequired,
  backMonthHandler: PropTypes.func.isRequired,
  forwardMonthHandler: PropTypes.func.isRequired,
  changeMonthHandler: PropTypes.func.isRequired,
  changeYearHandler: PropTypes.func.isRequired,
  selectedDate: PropTypes.object,
  onChange: PropTypes.func,
  renderDay: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  classes: PropTypes.object,
  timezone: PropTypes.string,
};

CalendarStateless.defaultProps = {
  onChange: () => {},
  renderDay: undefined,
  selectedDate: null,
  minDate: {},
  maxDate: {},
  classes: {},
  timezone: 'UTC',
};

export default CalendarStateless;
