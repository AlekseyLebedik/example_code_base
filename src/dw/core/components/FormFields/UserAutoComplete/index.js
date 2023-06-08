import React from 'react';
import PropTypes from 'prop-types';
import UserAutoComplete from 'dw/core/components/UserAutoComplete';

function UserAutoCompleteFormField({
  input: { value, ...input },
  meta: { touched, error },
  helperText,
  ...props
}) {
  return (
    <UserAutoComplete
      {...props}
      {...input}
      defaultValue={value}
      error={Boolean(touched && error)}
      helperText={touched && error ? String(error) : helperText}
    />
  );
}

UserAutoCompleteFormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  helperText: PropTypes.string,
};

UserAutoCompleteFormField.defaultProps = {
  helperText: undefined,
};

export default UserAutoCompleteFormField;
