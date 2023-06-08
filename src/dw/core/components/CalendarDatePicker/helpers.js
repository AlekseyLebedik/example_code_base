import React from 'react';
import sortBy from 'lodash/sortBy';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import {
  DATE_TIME_FORMATS,
  dateToUTCTimestamp,
  formatDateTime,
  timestampToMoment,
} from 'dw/core/helpers/date-time';

export const clearPickerDate = (event, setDate) => {
  event.stopPropagation();
  setDate(null);
};

export const selectStartEnd = (
  { start },
  startDate,
  endDate,
  setStart,
  setEnd,
  timezone
) => {
  const selectedDate = dateToUTCTimestamp(start);
  // If neither start or end are defined
  if (!startDate && !endDate) {
    setStart(selectedDate);
  }
  // Reset the start date if clicked twice
  else if (
    startDate &&
    timestampToMoment(start, timezone).isSame(
      timestampToMoment(startDate, timezone),
      'day'
    )
  ) {
    setStart(null);
  }
  // Reset the end date if clicked twice
  else if (
    endDate &&
    timestampToMoment(start, timezone).isSame(
      timestampToMoment(endDate, timezone),
      'day'
    )
  ) {
    setEnd(null);
  }
  // If only the start or end is chosen, sort the one that is
  // already defined and the one just clicked and set the start
  // and end respectively
  else if (!!startDate ^ !!endDate) {
    const definedDate = startDate || endDate;
    const [selectedStart, selectedEnd] = sortBy([definedDate, selectedDate]);
    setStart(selectedStart);
    setEnd(selectedEnd);
  }
  // If start and end are defined and the user clicks outside the range,
  // reset and set the start to the newly clicked date
  else if (selectedDate < startDate || selectedDate > endDate) {
    setStart(selectedDate);
    setEnd(null);
  }
  // Else set the end to the selected date
  else {
    setEnd(selectedDate);
  }
};

export const renderEndAdornment = (clearable, date, disabled, setDate) =>
  clearable &&
  date &&
  !disabled && (
    <InputAdornment position="end">
      <IconButton onClick={e => clearPickerDate(e, setDate)}>
        <Icon fontSize="small">clear</Icon>
      </IconButton>
    </InputAdornment>
  );

export const renderDateValue = (date, timezone) =>
  date
    ? formatDateTime(date, DATE_TIME_FORMATS.DEFAULT_DATE_LONG, timezone)
    : '';
