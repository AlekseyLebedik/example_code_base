import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Select from 'dw/core/components/FormFields/Select';

const CategoryField = ({ allowNull, options, onChange, disabled }) => (
  <Field
    component={Select}
    disabled={disabled}
    key={options.length}
    fullWidth
    label="Category"
    name="category"
    onChange={onChange}
    options={allowNull ? [{ value: 'All', label: 'All' }, ...options] : options}
    placeholder="All"
  />
);

CategoryField.propTypes = {
  allowNull: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
};

CategoryField.defaultProps = {
  allowNull: true,
  disabled: false,
  onChange: undefined,
  options: [],
};

export default CategoryField;
