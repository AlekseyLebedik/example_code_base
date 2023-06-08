import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import styles from './index.module.css';

const DAYSNUMBER = 42;
const WEEKSIZE = 7;

const Header = () => (
  <div className={styles.daysOfWeekHeader}>
    {moment.weekdaysShort().map(day => (
      <span key={day}>{day.charAt(0)}</span>
    ))}
  </div>
);

const Day = ({
  day,
  selectedDate,
  isInDisplayedMonth,
  classes,
  onChange,
  minDate,
  maxDate,
  renderDay,
  timezone,
}) => {
  const current = moment().tz(timezone).isSame(moment(day), 'day');
  const selected = moment(selectedDate).isSame(moment(day), 'day');
  let disabled = false;
  if (minDate) {
    disabled = day.isBefore(minDate, 'day');
  }
  if (maxDate && !disabled) {
    disabled = day.isAfter(maxDate, 'day');
  }

  const className = classNames(styles.dayStyle, classes.dayStyle, {
    [classes.currentDate]: current,
    [classes.dayNotInDisplayedMonth]: !isInDisplayedMonth || disabled,
    [classes.selectedDate]: selected && !current,
  });

  const dayProps = {
    className,
    onClick: () => !disabled && onChange(day),
  };

  return renderDay ? (
    renderDay(dayProps, day)
  ) : (
    <div {...dayProps}>{day.date()}</div>
  );
};

Day.propTypes = {
  day: PropTypes.object.isRequired,
  selectedDate: PropTypes.object,
  isInDisplayedMonth: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  timezone: PropTypes.string,
};

Day.defaultProps = {
  selectedDate: undefined,
  minDate: null,
  maxDate: null,
  renderDay: undefined,
  timezone: undefined,
};

const DayStyled = withStyles(theme => ({
  dayStyle: {
    color: theme.palette.grey['900'],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey['200'],
    },
  },
  currentDate: {
    backgroundColor: teal['500'],
    color: theme.palette.primary.contrastText,
    '&:hover': { backgroundColor: theme.palette.primary.main },
  },
  selectedDate: {
    backgroundColor: theme.palette.grey['300'],
    '&:hover': { backgroundColor: theme.palette.grey['300'] },
  },
  dayNotInDisplayedMonth: {
    cursor: 'default',
    color: theme.palette.grey['400'],
    '&:hover': { backgroundColor: 'initial' },
  },
}))(Day);

const Days = props => {
  const { currentDate, timezone, ...rest } = props;
  const monthFirstDay = moment(currentDate).startOf('month');
  const displayedMonth = moment(currentDate).format('YYYY-MM');
  let day = moment(monthFirstDay).startOf('week');

  return chunk(range(DAYSNUMBER), WEEKSIZE).map(week => (
    <div className={styles.daysOfWeek} key={week}>
      {week.map(() => {
        const sameMonth = moment(displayedMonth).isSame(day, 'month');
        const dayComponent = (
          <DayStyled
            day={day}
            isInDisplayedMonth={sameMonth}
            key={`${sameMonth}-${day.format('DD')}`}
            timezone={timezone}
            {...rest}
          />
        );
        day = moment(day).add(1, 'days');
        return dayComponent;
      })}
    </div>
  ));
};

const Month = props => (
  <>
    <Header />
    <Days {...props} />
  </>
);

export default Month;
