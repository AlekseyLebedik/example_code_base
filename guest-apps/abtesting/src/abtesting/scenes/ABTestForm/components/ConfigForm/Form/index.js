import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
import NonFieldError from 'dw/core/components/FormFields/NonFieldError';
import * as V from 'dw/core/components/FormFields/validation';

import styles from './index.module.css';

const ConfigForm = props => {
  const { handleSubmit, externalSubmit } = props;
  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field name="error" component={NonFieldError} />
        <Field
          name="name"
          component={Input}
          label="Name"
          fullWidth
          validate={[V.required]}
        />
        <Field
          name="serviceID"
          component={Input}
          label="Target"
          fullWidth
          validate={[V.required]}
        />
        <Field
          name="modifiers"
          component={Input}
          label="Custom config (JSON structure)"
          fullWidth
          multiline
          rows={4}
        />
      </Form>
    </div>
  );
};

ConfigForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ConfigForm);
