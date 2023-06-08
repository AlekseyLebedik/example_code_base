import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Delete from '../Delete';

import styles from '../../index.module.css';

const TextboxStateless = props => {
  const {
    label,
    properties,
    error,
    errorMessage,
    value,
    onSubmit,
    onChange,
    onKeyDown,
    handleDelete,
    deletable,
    disabled,
  } = props;

  const {
    type,
    minLength,
    maxLength,
    minimum,
    maximum,
    multipleOf,
    exclusiveMaximum,
  } = properties;

  return (
    <>
      <TextField
        error={error}
        helperText={error && errorMessage}
        id={`textfield-${label}`}
        name={label}
        value={value}
        type={type}
        onBlur={onSubmit}
        onKeyDown={onKeyDown}
        onChange={onChange}
        disabled={disabled}
        inputProps={{
          minLength,
          maxLength,
          min: minimum,
          max: exclusiveMaximum ? maximum - multipleOf : maximum,
          step: multipleOf,
          className: styles.input,
        }}
      />
      {deletable && (
        <Delete handleDelete={handleDelete} name={label} disabled={disabled} />
      )}
    </>
  );
};

TextboxStateless.propTypes = {
  label: PropTypes.string.isRequired,
  properties: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  deletable: PropTypes.bool,
  handleDelete: PropTypes.func,
  disabled: PropTypes.bool,
};

TextboxStateless.defaultProps = {
  handleDelete: () => {},
  deletable: false,
  disabled: false,
};

export default TextboxStateless;
