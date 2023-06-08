import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import keyPressAction from 'playpants/helpers/keyPressAction';
import { TITLE_MAX_CHAR_LENGTH } from 'playpants/constants/validation';

import { maxLength, required, validateEventName } from './helpers';

const EventName = ({ eventData, disabled, onSave }) => {
  const { title } = eventData;
  const [input, setInput] = useState(title || '');

  const onSaveTitle = ({ target: { value } }) => {
    if (value !== title) {
      onSave('title', value);
    }
  };

  return (
    <TextField
      data-cy="eventDetailsName"
      disabled={disabled}
      fullWidth
      label="Event Name"
      multiline
      onBlur={onSaveTitle}
      onChange={({ target: { value } }) => setInput(value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        keyPressAction(
          e,
          () => onSaveTitle(e),
          () => setInput(title)
        );
      }}
      theme={useTheme()}
      value={input}
      {...validateEventName([
        maxLength(input, TITLE_MAX_CHAR_LENGTH),
        required(input),
      ])}
    />
  );
};

EventName.propTypes = {
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default EventName;
