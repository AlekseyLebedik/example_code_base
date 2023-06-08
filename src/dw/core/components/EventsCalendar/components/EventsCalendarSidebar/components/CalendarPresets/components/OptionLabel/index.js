import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import styles from './index.module.css';

const OptionLabel = ({
  adminUser,
  focusCreatable,
  label,
  removePresetOption,
  savedPreset,
  setStayOpen,
  updatePresetOption,
  value,
}) => {
  const [name, setName] = useState(label);
  const [editing, setEditing] = useState(false);

  const handleInputBlur = () => {
    setStayOpen(false);
    updatePresetOption({
      value,
      label: name,
    });
    setEditing(false);
  };

  const handleTextChange = ({ target: { value: newName } }) => setName(newName);

  const handleKeyActions = e => {
    e.stopPropagation();
    if (e.key === 'Enter') focusCreatable();
  };

  const handleEditMode = e => {
    e.stopPropagation();
    setEditing(true);
    setStayOpen(true);
  };

  const handleDelete = e => {
    e.stopPropagation();
    removePresetOption({ value });
  };

  return (
    <div className={styles.optionRow}>
      {savedPreset.value === value ? (
        <Icon fontSize="small">bookmark</Icon>
      ) : (
        <Icon fontSize="small">bookmark_border</Icon>
      )}
      {!editing ? (
        <span className={styles.valueSpan}>
          {name}
          {adminUser && (
            <Icon
              className={styles.editIcon}
              fontSize="small"
              onClick={handleEditMode}
            >
              edit
            </Icon>
          )}
        </span>
      ) : (
        <TextField
          autoFocus
          onBlur={handleInputBlur}
          onChange={handleTextChange}
          onKeyDown={handleKeyActions}
          value={name}
        />
      )}
      {adminUser && (
        <Icon
          className={styles.deleteIcon}
          fontSize="small"
          onClick={handleDelete}
        >
          delete
        </Icon>
      )}
    </div>
  );
};

OptionLabel.propTypes = {
  adminUser: PropTypes.bool.isRequired,
  focusCreatable: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  removePresetOption: PropTypes.func.isRequired,
  savedPreset: PropTypes.object,
  setStayOpen: PropTypes.func.isRequired,
  updatePresetOption: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
OptionLabel.defaultProps = {
  savedPreset: {},
};

export default OptionLabel;
