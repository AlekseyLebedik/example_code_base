import React from 'react';
import PropTypes from 'prop-types';

import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';
import styles from './index.module.css';

const DateStateless = ({
  onSave,
  date,
  minDate,
  maxDate,
  disabled,
  label,
  placeholder,
  clearable,
}) => (
  <DateTimePicker
    input={{
      value: date,
      label,
      disabled,
      minDate,
      maxDate,
      clearable,
      InputLabelProps: { shrink: true },
      InputProps: { disabled, placeholder },
      classes: { input: styles.dateInput, dialog: styles.dialog },
      onChange: onSave,
    }}
  />
);

DateStateless.propTypes = {
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  minDate: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  maxDate: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  placeholder: PropTypes.string,
  date: PropTypes.number,
  clearable: PropTypes.bool,
};

DateStateless.defaultProps = {
  placeholder: null,
  date: null,
  maxDate: null,
  clearable: false,
};

export default DateStateless;
