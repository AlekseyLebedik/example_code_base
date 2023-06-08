import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Component = ({
  input,
  helperText,
  label,
  meta: { touched, error },
  customError,
  ...custom
}) => (
  <TextField
    helperText={(touched && error) || customError || helperText}
    label={label}
    error={!!((touched && error) || customError)}
    placeholder={label}
    {...input}
    {...custom}
  />
);

Component.propTypes = {
  input: PropTypes.object,
  helperText: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  customError: PropTypes.string,
};
Component.defaultProps = {
  input: {},
  customError: '',
  helperText: '',
  label: '',
};

export default Component;
