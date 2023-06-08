import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';

import './presentational.css';

const AddChallengeForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-challenge-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="functionId"
          component={Input}
          type="number"
          label="Function Id"
          fullWidth
        />
        <Field
          name="parameters"
          component={Input}
          type="text"
          label="Parameters"
          fullWidth
        />
        <Field
          name="validResponse"
          component={Input}
          type="text"
          label="Valid Response"
          fullWidth
        />
        <Field
          name="challengeGroup"
          component={Input}
          type="text"
          label="Challenge Group"
          fullWidth
        />
      </Form>
    </div>
  );
};
AddChallengeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddChallengeForm;
