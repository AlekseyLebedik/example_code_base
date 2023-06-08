import React from 'react';
import PropTypes from 'prop-types';

import SelectField from 'dw/core/components/Select';

const ReduxFormSelect = ({
  input,
  meta: { touched, error },
  helperText,
  ...props
}) => (
  <SelectField
    error={Boolean(touched && error)}
    helperText={(touched && error) || helperText}
    {...input}
    {...props}
  />
);

ReduxFormSelect.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  helperText: PropTypes.string,
};

ReduxFormSelect.defaultProps = {
  input: {},
  meta: {},
  helperText: null,
};

export default ReduxFormSelect;
