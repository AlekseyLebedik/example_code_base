import React from 'react';
import { Field, Form, propTypes as reduxFormPropTypes } from 'redux-form';

import * as V from 'dw/core/components/FormFields/validation';
import Upload from 'dw/core/components/FormFields/Dropzone';

import styles from './presentational.module.css';

const ReplaceUsersForm = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="source"
        classes={{
          container: styles.fileUpload,
          button: styles.browserFileButton,
        }}
        accept=".csv"
        component={Upload}
        validate={[V.required, V.isAnyFileLoading]}
        label="Choose a user csv file"
        fullWidth
      />
    </Form>
  );
};

ReplaceUsersForm.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

ReplaceUsersForm.defaultProps = {};

export default ReplaceUsersForm;
