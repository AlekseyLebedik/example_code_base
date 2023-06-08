import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { ENV_TYPES } from 'playpants/scenes/Templates/constants';

const Environment = ({
  eventData: { env_type: env, activities },
  disabled,
  onSave,
}) => {
  const [environment, setEnv] = useState(env);

  useEffect(() => {
    setEnv(env);
  }, [env]);

  const onSaveEnvironment = ({ target: { value } }) => {
    if (value !== env) {
      onSave('env_type', value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Environment</InputLabel>
      <Select
        value={environment}
        onChange={({ target: { value } }) => setEnv(value)}
        data-cy="eventDetailsEnv"
        onBlur={onSaveEnvironment}
        disabled={disabled || !isEmpty(activities)}
      >
        {Object.keys(ENV_TYPES).map(e => (
          <MenuItem key={e} value={e}>
            {ENV_TYPES[e]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Environment.propTypes = {
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Environment;
