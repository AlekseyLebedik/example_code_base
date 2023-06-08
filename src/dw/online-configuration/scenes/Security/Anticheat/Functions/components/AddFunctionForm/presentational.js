import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const AddFunctionForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-function-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="functionId"
          component={Input}
          type="number"
          label="Function ID"
          min={0}
          max={65535}
          validate={[V.nonNegativeInt, V.number16]}
          fullWidth
        />
        <Field
          name="functionName"
          component={Input}
          type="text"
          label="Function Name"
          validate={[V.required]}
          fullWidth
        />
        <Field
          name="argumentNames"
          component={Input}
          type="text"
          label="Argument Names"
          fullWidth
        />
      </Form>
    </div>
  );
};
AddFunctionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddFunctionForm;
