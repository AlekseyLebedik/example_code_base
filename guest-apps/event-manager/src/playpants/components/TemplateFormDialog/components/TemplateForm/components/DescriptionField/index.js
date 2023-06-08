import React from 'react';
import { Field } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';

const DescriptionField = () => (
  <Field
    data-cy="template-description-field"
    component={Input}
    fullWidth
    label="Description"
    name="description"
  />
);

export default DescriptionField;
