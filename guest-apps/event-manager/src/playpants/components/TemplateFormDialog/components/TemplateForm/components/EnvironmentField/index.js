import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'dw/core/components/FormFields/Select';
import { ENV_TYPES } from 'playpants/scenes/Templates/constants';

const EnvironmentField = () => (
  <Field component={Select} name="env_type" label="Environment" fullWidth>
    {Object.keys(ENV_TYPES).map(e => (
      <MenuItem key={e} value={e}>
        {ENV_TYPES[e]}
      </MenuItem>
    ))}
  </Field>
);

export default connect()(EnvironmentField);
