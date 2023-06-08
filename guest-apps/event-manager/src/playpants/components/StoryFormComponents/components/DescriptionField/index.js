import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import keyPressAction from 'playpants/helpers/keyPressAction';

const DescriptionField = ({ onBlur }) => (
  <Field
    component={Input}
    fullWidth
    label="Description"
    name="description"
    onBlur={onBlur}
    onKeyDown={e => keyPressAction(e, () => e.target.blur())}
  />
);

DescriptionField.propTypes = {
  onBlur: PropTypes.func,
};

DescriptionField.defaultProps = {
  onBlur: undefined,
};

export default DescriptionField;
