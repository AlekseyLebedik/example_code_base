import React from 'react';
import PropTypes from 'prop-types';

import CassetteSelect from '../../CassetteSelect';

const ReduxFormCassetteSelect = ({
  input,
  meta: { touched, error },
  helperText,
  ...props
}) => (
  <CassetteSelect
    error={Boolean(touched && error)}
    helperText={(touched && error) || helperText}
    {...input}
    {...props}
  />
);

ReduxFormCassetteSelect.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  helperText: PropTypes.string,
};

ReduxFormCassetteSelect.defaultProps = {
  input: {},
  meta: {},
  helperText: null,
};

export default ReduxFormCassetteSelect;
