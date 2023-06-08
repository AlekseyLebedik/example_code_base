import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import keyPressAction from 'playpants/helpers/keyPressAction';

const Notes = ({ eventData, disabled, onSave }) => {
  const { note } = eventData;
  const [input, setInput] = useState(note);

  const handleSave = () => {
    if (note !== input) {
      onSave('note', input);
    }
  };

  return (
    <TextField
      data-cy="notesField"
      disabled={disabled}
      fullWidth
      multiline
      onBlur={handleSave}
      onChange={({ target: { value } }) => setInput(value)}
      onKeyDown={e => keyPressAction(e, handleSave, () => setInput(note))}
      placeholder="Notes"
      value={input}
    />
  );
};

Notes.propTypes = {
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Notes;
