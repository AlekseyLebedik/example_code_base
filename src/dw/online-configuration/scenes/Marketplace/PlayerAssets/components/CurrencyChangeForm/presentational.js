import React from 'react';
import PropTypes from 'prop-types';
import Input from 'dw/core/components/FormFields/Input';
import { Field, Form, propTypes as reduxFormPropTypes } from 'redux-form';
import * as V from 'dw/core/components/FormFields/validation';
import styles from './presentational.module.css';

const CurrencyChangeFormStateless = ({ onSubmit, fieldName, handleSubmit }) => (
  <div>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name={fieldName}
        component={Input}
        type="number"
        label="Value to add/remove"
        validate={[V.required]}
        inputProps={{ className: styles.currenciesInput }}
        fullWidth
      />
    </Form>
  </div>
);

CurrencyChangeFormStateless.propTypes = {
  fieldName: PropTypes.number.isRequired,
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

export default CurrencyChangeFormStateless;
