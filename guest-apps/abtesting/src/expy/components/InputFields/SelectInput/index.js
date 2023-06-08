import React from 'react';
import PropTypes from 'prop-types';
import EasyEdit, { Types } from 'react-easy-edit';
import CustomSelectInput from './support/CustomSelectInput';
import CustomSelectDisplay from './support/CustomSelectDisplay';
import { useStyles } from './styles';

const SelectInput = ({
  value,
  label,
  options,
  placeholder,
  instructions,
  onSave,
  error,
  errorMsg,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.editContainer}>
      <EasyEdit
        type={Types.SELECT}
        options={options}
        value={value}
        onSave={onSave}
        placeholder={placeholder}
        instructions={instructions}
        disableAutoSubmit
        onHoverCssClass={classes.textHoverClass}
        saveButtonStyle={classes.saveBtn}
        cancelButtonStyle={classes.cancelBtn}
        saveButtonLabel="Save"
        cancelButtonLabel="Cancel"
        displayComponent={
          <CustomSelectDisplay error={error} errorMsg={errorMsg} />
        }
        editComponent={<CustomSelectInput label={label} options={options} />}
      />
    </div>
  );
};

SelectInput.defaultProps = {
  error: false,
  errorMsg: null,
  instructions: null,
  placeholder: 'None',
};

SelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  options: PropTypes.array.isRequired,
  instructions: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SelectInput;
