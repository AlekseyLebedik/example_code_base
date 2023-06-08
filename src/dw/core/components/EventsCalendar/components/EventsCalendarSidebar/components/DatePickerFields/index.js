import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import {
  DATE_TIME_FORMATS,
  formatDateTime,
  timestampToMoment,
} from 'dw/core/helpers/date-time';

import {
  clearOutOfOrderErrorMsg,
  datePickerField,
  endBeforeEndErrorMsg,
  startAfterEndErrorMsg,
} from './helpers';

import styles from './index.module.css';

const DatePickerFields = props => {
  const [endValue, setEndValue] = useState('N/A');
  const [endValueError, setEndValueError] = useState(null);
  const [startValue, setStartValue] = useState('N/A');
  const [startValueError, setStartValueError] = useState(null);

  const { onChangeDatePickerSelection, userTimezone } = props;
  const datePickerProps = useSelector(
    state => state.Core.EventsCalendar.datePickerProps
  );
  const { disableDateSelection, endDate, setEndDate, setStartDate, startDate } =
    datePickerProps;

  const startBeforeEnd =
    startValue === 'N/A' ||
    endValue === 'N/A' ||
    moment(startValue, DATE_TIME_FORMATS.DEFAULT_DATE_LONG).isBefore(
      moment(endValue, DATE_TIME_FORMATS.DEFAULT_DATE_LONG)
    );

  const numDaysSelected =
    startDate &&
    endDate &&
    Math.abs(
      timestampToMoment(startDate, userTimezone).diff(
        timestampToMoment(endDate, userTimezone),
        'days'
      )
    ) + 1;

  useEffect(() => {
    if (disableDateSelection) {
      if (!endValueError && !startValueError && endDate && startDate) {
        disableDateSelection(false);
      } else {
        disableDateSelection(true);
      }
    }
  }, [
    endDate,
    endValueError,
    startDate,
    startValueError,
    disableDateSelection,
  ]);

  useEffect(() => {
    setStartValue(
      formatDateTime(
        startDate,
        DATE_TIME_FORMATS.DEFAULT_DATE_LONG,
        userTimezone
      )
    );
    onChangeDatePickerSelection();
  }, [startDate, onChangeDatePickerSelection, userTimezone]);

  useEffect(() => {
    setEndValue(
      formatDateTime(endDate, DATE_TIME_FORMATS.DEFAULT_DATE_LONG, userTimezone)
    );
    onChangeDatePickerSelection();
  }, [endDate, onChangeDatePickerSelection, userTimezone]);

  useEffect(() => {
    if (!startBeforeEnd && !startValueError) {
      setStartValueError(startAfterEndErrorMsg);
    }
    clearOutOfOrderErrorMsg(
      startBeforeEnd,
      startValueError,
      setStartValueError,
      endValueError,
      setEndValueError
    );
  }, [startValue, endValueError, startBeforeEnd, startValueError]);

  useEffect(() => {
    if (!startBeforeEnd && !endValueError) {
      setEndValueError(endBeforeEndErrorMsg);
    }
    clearOutOfOrderErrorMsg(
      startBeforeEnd,
      startValueError,
      setStartValueError,
      endValueError,
      setEndValueError
    );
  }, [endValue, endValueError, startBeforeEnd, startValueError]);

  return (
    <div className={styles.eventsCalendarSidebarDatePickerInfo}>
      <TextField
        fullWidth
        InputLabelProps={{
          className: styles.eventsCalendarSidebarDatePickerInfoField,
        }}
        label="Project"
        value={datePickerProps?.project?.name}
      />
      {datePickerField(
        'Start Date',
        setStartDate,
        setStartValue,
        setStartValueError,
        startValue,
        startValueError,
        startBeforeEnd
      )}
      {datePickerField(
        'End Date',
        setEndDate,
        setEndValue,
        setEndValueError,
        endValue,
        endValueError
      )}
      {startDate &&
        endDate &&
        startBeforeEnd &&
        `${numDaysSelected} Days Selected`}
    </div>
  );
};

DatePickerFields.propTypes = {
  onChangeDatePickerSelection: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

DatePickerFields.defaultProps = {};

export default DatePickerFields;
