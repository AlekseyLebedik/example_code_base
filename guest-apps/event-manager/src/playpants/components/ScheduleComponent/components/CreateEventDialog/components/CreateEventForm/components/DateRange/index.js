import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';

export const checkDates =
  endDateRequired =>
  (value = {}) => {
    const { startDate, endDate } = value;
    if (endDateRequired && !endDate) {
      return 'End Date Required';
    }
    if (!startDate) {
      return 'Start Date Required';
    }
    return undefined;
  };

const DateRange = ({ minDate, endDateRequired }) => {
  const required = useCallback(() => {
    checkDates(endDateRequired);
  }, [endDateRequired]);
  return (
    <Field
      component={DateTimePicker}
      dataCy="createEventDateRange"
      endDateFieldProps={{ clearable: true }}
      footerLabel="Confirm"
      fullWidth
      label="Start Date"
      minDate={minDate}
      name="eventDates"
      ranged
      rangeLabels={{
        startDate: 'Start Date',
        endDate: `End Date (${endDateRequired ? 'Required' : 'Optional'})`,
      }}
      returnTimestamp
      validate={[required]}
    />
  );
};
DateRange.propTypes = {
  endDateRequired: PropTypes.bool,
  minDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

DateRange.defaultProps = {
  endDateRequired: false,
  minDate: null,
};

export default DateRange;
