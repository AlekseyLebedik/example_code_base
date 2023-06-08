import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteField from 'dw/core/components/AutocompleteGeneral';

function AutoCompleteFormField({
  input,
  meta: { touched, error },
  helperText,
  ...props
}) {
  return (
    <AutoCompleteField
      {...props}
      {...input}
      error={Boolean(touched && error)}
      helperText={touched && error ? String(error) : helperText}
    />
  );
}

AutoCompleteFormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  helperText: PropTypes.string,
};

AutoCompleteFormField.defaultProps = {
  helperText: undefined,
};

export default AutoCompleteFormField;
