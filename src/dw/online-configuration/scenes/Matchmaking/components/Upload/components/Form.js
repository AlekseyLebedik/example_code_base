import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm } from 'redux-form';

import Upload from 'dw/core/components/FormFields/Dropzone';
import * as V from 'dw/core/components/FormFields/validation';

const UploadForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <Form onSubmit={handleSubmit(externalSubmit)}>
      <Field
        name="source"
        component={Upload}
        label="Choose ruleset file"
        validate={[V.required]}
        fullWidth
      />
    </Form>
  );
};

UploadForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ enableReinitialize: true })(UploadForm);
