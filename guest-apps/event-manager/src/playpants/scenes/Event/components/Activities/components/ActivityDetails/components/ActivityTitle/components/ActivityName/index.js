import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import keyPressAction from 'playpants/helpers/keyPressAction';

const MAX_NAME_CHAR = 31;

const ActivityName = ({ disabled, onNameChange, selectedActivity }) => {
  const { name } = selectedActivity;
  const [input, setInput] = useState(name || '');

  // make sure input updates on activity selection
  useEffect(() => {
    setInput(name || '');
  }, [name]);

  const onSaveName = ({ target: { value } }) => {
    if (value !== name) {
      onNameChange(value);
    }
  };

  return (
    <TextField
      value={input}
      data-cy="activityNameField"
      onChange={({ target: { value } }) => setInput(value)}
      onBlur={onSaveName}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        keyPressAction(
          e,
          () => onSaveName(e),
          () => setInput(name)
        );
      }}
      disabled={disabled}
      InputProps={{
        startAdornment: <InputAdornment position="start">Name</InputAdornment>,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        maxLength: MAX_NAME_CHAR,
      }}
    />
  );
};

ActivityName.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onNameChange: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
};

export default ActivityName;
