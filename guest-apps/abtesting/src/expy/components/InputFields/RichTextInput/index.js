import React from 'react';
import PropTypes from 'prop-types';
import EasyEdit, { Types } from 'react-easy-edit';
import CustomDisplay from './support/CustomDisplay';
import CustomInput from './support/CustomInput';

import { useStyles } from './styles';

const RichTextInput = ({
  placeholder,
  value,
  onSave,
  onCancel,
  error,
  errorMsg,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.editContainer}>
      <EasyEdit
        type={Types.TEXTAREA}
        onSave={onSave}
        onCancel={onCancel}
        placeholder={placeholder}
        disableAutoSubmit
        saveButtonLabel="Save"
        saveButtonStyle={classes.saveBtn}
        cancelButtonStyle={classes.cancelBtn}
        cancelButtonLabel="Cancel"
        onHoverCssClass={classes.textHoverClass}
        value={value}
        editComponent={<CustomInput />}
        displayComponent={<CustomDisplay error={error} errorMsg={errorMsg} />}
        onValidate={v => v !== (null || '')}
      />
    </div>
  );
};

RichTextInput.defaultProps = {
  placeholder: 'None',
  onCancel: () => {},
  error: false,
  errorMsg: null,
  onSave: () => {},
  value: null,
};

RichTextInput.propTypes = {
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  value: PropTypes.string,
};

export default RichTextInput;
