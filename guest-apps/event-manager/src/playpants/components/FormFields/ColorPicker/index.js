import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import styles from './index.module.css';

const ColorPicker = ({
  customError,
  helperText,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <FormControl>
    <FormLabel className={styles.formLabel}>{label}</FormLabel>
    <ChromePicker
      {...input}
      color={input.value}
      className={styles.colorPicker}
      error={!!((touched && error) || customError)}
      helperText={(touched && error) || customError || helperText}
      label={label}
      onChange={value => input.onChange(value.hex)}
      placeholder={label}
      {...custom}
    />
  </FormControl>
);

ColorPicker.propTypes = {
  customError: PropTypes.object,
  helperText: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
};
ColorPicker.defaultProps = {
  customError: null,
  helperText: null,
  label: null,
};

export default ColorPicker;
