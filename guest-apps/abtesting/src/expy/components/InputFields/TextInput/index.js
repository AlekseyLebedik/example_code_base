import React from 'react';
import PropTypes from 'prop-types';
import EasyEdit, { Types } from 'react-easy-edit';
import CustomTextInput from './support/CustomTextInput';
import CustomTextDisplay from './support/CustomTextDisplay';

import { useStyles } from './styles';

const TextInput = ({
  placeholder,
  onSave,
  value,
  onCancel,
  error,
  errorMsg,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.editContainer}>
      <EasyEdit
        type={Types.TEXT}
        fullWidth
        onSave={onSave}
        onCancel={onCancel}
        placeholder={placeholder}
        disableAutoSubmit
        onHoverCssClass={classes.textHoverClass}
        value={value}
        saveButtonStyle={classes.saveBtn}
        cancelButtonStyle={classes.cancelBtn}
        saveButtonLabel="Save"
        cancelButtonLabel="Cancel"
        displayComponent={
          <CustomTextDisplay error={error} errorMsg={errorMsg} />
        }
        editComponent={<CustomTextInput />}
        onValidate={v => v !== (null || '')}
      />
    </div>
  );
};

TextInput.defaultProps = {
  onCancel: () => {},
  placeholder: 'None',
  error: false,
  errorMsg: null,
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default TextInput;
