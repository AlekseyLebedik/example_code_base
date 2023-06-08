import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';

function checkExistingCategory(value, _, { categories }) {
  if (categories && categories.includes(value)) {
    return 'Category already exists';
  }
  return undefined;
}
const AddCategoryForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div
      className="publisher-objects__add-category-form"
      data-cy="add-category-form"
    >
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="categoryName"
          component={Input}
          label="Name"
          fullWidth
          validate={[V.required, checkExistingCategory]}
        />
      </Form>
    </div>
  );
};
AddCategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddCategoryForm;
