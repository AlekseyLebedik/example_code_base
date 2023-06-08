import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Delete from '../Delete';

const Dropdown = props => {
  const {
    deletable,
    disabled,
    handleChange,
    handleDelete,
    label,
    multiple,
    options: { enumOptions },
    properties,
    value,
  } = props;

  const options = enumOptions || properties.enum;

  return (
    <>
      <Select
        disabled={disabled}
        displayEmpty
        fullWidth
        id={`textfield-${label}`}
        multiple={multiple}
        name={label}
        onChange={handleChange}
        value={value}
      >
        <MenuItem value="" disabled>
          Select {label}
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {deletable && (
        <Delete handleDelete={handleDelete} name={label} disabled={disabled} />
      )}
    </>
  );
};

Dropdown.propTypes = {
  deletable: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.object,
  properties: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Dropdown.defaultProps = {
  deletable: false,
  disabled: false,
  handleDelete: () => {},
  multiple: false,
  options: {},
  properties: {},
};

export default Dropdown;
