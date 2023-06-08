import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { required } from 'dw/core/components/FormFields/validation';
import Select from 'dw/core/components/FormFields/Select';

const TitleEnvField = ({ options, asyncValidating, onChange, disabled }) => (
  <Field
    component={Select}
    required
    disabled={disabled}
    fullWidth
    label="Title Environment"
    name="title_env"
    onChange={onChange}
    placeholder="Title Environment"
    SelectProps={{
      endAdornment: (
        <InputAdornment>
          {asyncValidating && <CircularProgress thickness={10} size={16} />}
        </InputAdornment>
      ),
    }}
    validate={[required]}
  >
    {options.map(option => (
      <MenuItem key={option.label} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Field>
);

TitleEnvField.propTypes = {
  asyncValidating: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
};

TitleEnvField.defaultProps = {
  asyncValidating: false,
  disabled: false,
  onChange: undefined,
  options: [],
};

export default TitleEnvField;
