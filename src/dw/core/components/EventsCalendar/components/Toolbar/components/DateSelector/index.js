import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import range from 'lodash/range';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { formatDateTime } from 'dw/core/helpers/date-time';

import styles from './index.module.css';

export const getCustomDateRangeFormat = (date, numberOfDays, userTimezone) =>
  numberOfDays > 1
    ? `${formatDateTime(
        date,
        'ddd MMM D, YYYY',
        userTimezone
      )} – ${formatDateTime(
        moment(date)
          .endOf('day')
          .add(numberOfDays - 1, 'day')
          .toDate(),
        'ddd MMM D, YYYY',
        userTimezone
      )}`
    : formatDateTime(date, 'dddd MMMM D, YYYY', userTimezone);

export const getDateFormat = (date, view, userTimezone) => {
  switch (view) {
    case 'day':
      return formatDateTime(date, 'dddd, MMMM D, YYYY', userTimezone);
    case 'week':
      return `${formatDateTime(
        moment(date).endOf('day').day(0).toDate(),
        'MMMM D',
        userTimezone
      )} – ${formatDateTime(
        moment(date).endOf('week').toDate(),
        'MMMM D',
        userTimezone
      )}`;
    default:
      return formatDateTime(date, 'MMMM YYYY', userTimezone);
  }
};

const generateSelectDates = (date, view, customViewOn, numberOfDays) => {
  const viewType = customViewOn ? 'day' : view;
  const startDecrement = customViewOn ? numberOfDays * 3 : 3;
  const incrementValue = customViewOn ? numberOfDays : 1;
  const selectOption = moment(date).subtract(startDecrement, viewType);

  return range(0, 12).map(() => {
    selectOption.add(incrementValue, viewType);
    return selectOption.toDate();
  });
};

export const DateSelector = ({
  customViewOn,
  numberOfDays,
  onNavigate,
  selectedDay,
  selectedView,
  userTimezone,
}) => {
  const selectValues = generateSelectDates(
    selectedDay,
    selectedView,
    customViewOn,
    numberOfDays
  );
  return (
    <Select
      className={styles.dateSelectorInner}
      disableUnderline
      onChange={event => {
        onNavigate('DATE', moment(event.target.value).tz(userTimezone));
      }}
      value={moment(selectValues[2]).format()}
    >
      {selectValues.map(selectValue => (
        <MenuItem
          key={moment(selectValue).format()}
          value={moment(selectValue).format()}
        >
          {customViewOn
            ? getCustomDateRangeFormat(selectValue, numberOfDays, userTimezone)
            : getDateFormat(selectValue, selectedView, userTimezone)}
        </MenuItem>
      ))}
    </Select>
  );
};

DateSelector.propTypes = {
  customViewOn: PropTypes.bool.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  selectedView: PropTypes.string.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

export default DateSelector;
