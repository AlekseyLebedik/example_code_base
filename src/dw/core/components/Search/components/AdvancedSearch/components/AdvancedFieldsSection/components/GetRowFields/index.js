import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateTimePicker from 'dw/core/components/DateTimePicker';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import SelectField from 'dw/core/components/Select';
import NumericInput from 'dw/core/components/NumericInput';

const NumericInputField = ({
  keyValue,
  label,
  adornment,
  values,
  onChange,
}) => (
  <NumericInput
    label={label || keyValue}
    value={values[keyValue] || ''}
    onChange={e => onChange(e.target.value, keyValue)}
    fullWidth
    InputProps={{
      endAdornment: adornment && (
        <InputAdornment position="end">{adornment}</InputAdornment>
      ),
    }}
  />
);

NumericInputField.propTypes = {
  keyValue: PropTypes.string.isRequired,
  adornment: PropTypes.node,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

NumericInputField.defaultProps = {
  adornment: undefined,
};

const InputField = ({ keyValue, label, adornment, values, onChange }) => (
  <TextField
    label={label || keyValue}
    value={values[keyValue] || ''}
    onChange={e => onChange(e.target.value, keyValue)}
    fullWidth
    InputProps={{
      endAdornment: adornment && (
        <InputAdornment position="end">{adornment}</InputAdornment>
      ),
    }}
  />
);

InputField.propTypes = {
  keyValue: PropTypes.string.isRequired,
  adornment: PropTypes.node,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  adornment: undefined,
};

const BoolInput = ({ keyValue, label, adornment, values, onChange }) => (
  <SelectField
    select
    label={label || keyValue}
    onChange={event => onChange(event.target.value, keyValue)}
    value={values[keyValue] || ''}
    fullWidth
    InputProps={{
      endAdornment: adornment && (
        <InputAdornment position="end">{adornment}</InputAdornment>
      ),
    }}
  >
    <MenuItem value={null} />
    <MenuItem value={1}>Yes</MenuItem>
    <MenuItem value={0}>No</MenuItem>
  </SelectField>
);

BoolInput.propTypes = {
  keyValue: PropTypes.string.isRequired,
  adornment: PropTypes.node,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

BoolInput.defaultProps = {
  adornment: undefined,
};

const DateInput = ({
  keyValue,
  label,
  adornment,
  values,
  timezone,
  onChange,
}) => (
  <DateTimePicker
    label={label || keyValue}
    onChange={value => onChange(value, keyValue)}
    value={values[keyValue]}
    fullWidth
    returnTimestamp
    timezone={timezone}
    dateOnly
    InputProps={{
      endAdornment: adornment && (
        <InputAdornment position="end">{adornment}</InputAdornment>
      ),
    }}
  />
);

DateInput.propTypes = {
  keyValue: PropTypes.string.isRequired,
  adornment: PropTypes.node,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
};

DateInput.defaultProps = {
  adornment: undefined,
};

const DateTimeInput = ({
  keyValue,
  label,
  adornment,
  values,
  onChange,
  timezone,
}) => (
  <DateTimePicker
    label={label || keyValue}
    onChange={value => onChange(value, keyValue)}
    value={values[keyValue]}
    fullWidth
    returnTimestamp
    timezone={timezone}
    InputProps={{
      endAdornment: adornment && (
        <InputAdornment position="end">{adornment}</InputAdornment>
      ),
    }}
  />
);

DateTimeInput.propTypes = {
  keyValue: PropTypes.string.isRequired,
  adornment: PropTypes.node,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
};

DateTimeInput.defaultProps = {
  adornment: undefined,
};

const GetFieldRowComponent = ({
  field,
  adornment,
  values,
  onChange,
  timezone,
}) => {
  switch (field.type) {
    case 'date':
      return (
        <DateInput
          keyValue={field.key}
          label={field.label}
          adornment={adornment}
          values={values}
          onChange={onChange}
          timezone={timezone}
        />
      );
    case 'datetime':
      return (
        <DateTimeInput
          keyValue={field.key}
          label={field.label}
          adornment={adornment}
          values={values}
          onChange={onChange}
          timezone={timezone}
        />
      );
    case 'number':
      return (
        <NumericInputField
          keyValue={field.key}
          label={field.label}
          adornment={adornment}
          values={values}
          onChange={onChange}
        />
      );
    case 'bool':
      return (
        <BoolInput
          keyValue={field.key}
          label={field.label}
          adornment={adornment}
          values={values}
          onChange={onChange}
        />
      );
    default:
      return (
        <InputField
          keyValue={field.key}
          label={field.label}
          adornment={adornment}
          values={values}
          onChange={onChange}
        />
      );
  }
};

GetFieldRowComponent.propTypes = {
  field: PropTypes.object.isRequired,
  adornment: PropTypes.node,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

GetFieldRowComponent.defaultProps = {
  adornment: undefined,
};

export default GetFieldRowComponent;
