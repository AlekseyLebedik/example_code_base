import React from 'react';
import PropTypes from 'prop-types';
import { getNowTimestamp } from 'playpants/helpers/dateTime';

import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';
import CustomEndAdornment from './components/CustomEndAdornment';
import styles from './index.module.css';

const Date = props => {
  const {
    clearable,
    detachedEvent,
    disabled,
    editEvent,
    eventData: event,
  } = props;

  const onChange = ({ startDate, endDate }) => {
    editEvent(event.id, {
      publish_at: startDate || null,
      end_at: endDate || null,
    });
  };

  const input = {
    ...props,
    classes: { input: styles.dateInput, dialog: styles.dialog },
    clearable: clearable && !detachedEvent,
    CustomEndAdornment,
    endDateFieldProps: {
      clearable: true,
      placeholder: 'Select to add an end date',
    },
    InputLabelProps: { shrink: true },
    InputProps: { disabled },
    minDate: getNowTimestamp(),
    onChange,
    ranged: true,
    rangeLabels: {
      startDate: 'From',
      endDate: 'To',
    },
    returnTimestamp: true,
    value: { startDate: event.publish_at, endDate: event.end_at },
    verticalRangeFields: true,
  };

  return <DateTimePicker input={input} />;
};

Date.propTypes = {
  clearable: PropTypes.bool,
  detachedEvent: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
};

Date.defaultProps = {
  clearable: false,
};

export default Date;
