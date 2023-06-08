import React from 'react';
import isNil from 'lodash/isNil';

import TextField from '@material-ui/core/TextField';

import {
  changeDateValue,
  renderDatePickerClearDate,
} from 'dw/core/components/EventsCalendar/helpers';

import styles from './index.module.css';

export const endBeforeEndErrorMsg = 'End Date must be after Start Date!';
export const startAfterEndErrorMsg = 'Start Date must be before End Date!';

export const clearOutOfOrderErrorMsg = (
  startBeforeEnd,
  startValueError,
  setStartValueError,
  endValueError,
  setEndValueError
) => {
  if (startBeforeEnd && endValueError === endBeforeEndErrorMsg) {
    setEndValueError(null);
  }
  if (startBeforeEnd && startValueError === startAfterEndErrorMsg) {
    setStartValueError(null);
  }
};

export const datePickerField = (
  label,
  setDate,
  setValue,
  setValueError,
  value,
  valueError
) => (
  <TextField
    autoFocus
    fullWidth
    error={!isNil(valueError)}
    helperText={valueError}
    InputLabelProps={{
      className: styles.eventsCalendarSidebarDatePickerInfoField,
    }}
    InputProps={{
      className: styles.eventsCalendarSidebarDatePickerInfoField,
      endAdornment: renderDatePickerClearDate(value, setDate),
    }}
    label={label}
    onChange={e =>
      changeDateValue(e.target.value, setDate, setValue, setValueError)
    }
    value={value}
  />
);
