import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'dw/core/components/FormFields/Select';
import { optionsSelector, formatOptions } from 'dw/core/helpers/selectors';

const PermissionSelect = ({
  name,
  ItemComponent,
  itemProps,
  placeholder,
  label,
  onDrop,
  options,
}) => (
  <Field
    name={name}
    component={Select}
    placeholder={placeholder}
    label={label}
    ItemComponent={ItemComponent}
    itemProps={itemProps}
    fullWidth
    multiple
    onDrop={onDrop}
    options={optionsSelector(formatOptions(options), {
      groupBy: 'group',
      value: 'id',
      label: 'name',
    })}
  />
);

PermissionSelect.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  ItemComponent: PropTypes.elementType.isRequired,
  itemProps: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDrop: PropTypes.func,
};

PermissionSelect.defaultProps = {
  placeholder: '',
  onDrop: undefined,
};

export default PermissionSelect;
