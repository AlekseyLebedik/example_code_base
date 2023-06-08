import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const AddFilenameForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-filename-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="clientType"
          component={Input}
          type="text"
          label="Client Type:"
          min={0}
          validate={[V.required, V.clientType]}
          fullWidth
        />
        <Field
          name="filename"
          component={Input}
          type="text"
          label="Filename:"
          validate={[V.required]}
          fullWidth
        />
      </Form>
    </div>
  );
};
AddFilenameForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddFilenameForm;
