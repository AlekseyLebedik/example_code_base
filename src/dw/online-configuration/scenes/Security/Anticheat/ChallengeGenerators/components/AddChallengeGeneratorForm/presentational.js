import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const generatorIdValidator = V.intRangeValidator(0, 2147483647);
const configValidator = V.isValidJSON({
  requiredFields: [
    'cron',
    'type',
    'function_id',
    'challenge_group',
    'user_group',
    'user_override',
    'data',
    'quorum',
    'threshold',
  ],
});

const AddChallengeGeneratorForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-challenge-generator-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="generatorId"
          component={Input}
          type="number"
          label="generator ID"
          validate={[V.required, generatorIdValidator]}
          fullWidth
        />
        <Field
          name="config"
          component={Input}
          multiline
          rows={2}
          rowsMax={6}
          label="Config"
          validate={[V.required, configValidator]}
          fullWidth
        />
      </Form>
    </div>
  );
};
AddChallengeGeneratorForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddChallengeGeneratorForm;
