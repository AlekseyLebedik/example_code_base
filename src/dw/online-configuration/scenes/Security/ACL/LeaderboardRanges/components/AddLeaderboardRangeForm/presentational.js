import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const AddLeaderboardRangeForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-leaderboard-range-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="clientType"
          component={Input}
          type="text"
          label="Client Type:"
          min={0}
          validate={[V.clientType]}
          fullWidth
        />
        <Field
          name="minId"
          component={Input}
          type="number"
          label="Min ID:"
          validate={[V.nonNegativeInt]}
          min={0}
          fullWidth
        />
        <Field
          name="maxId"
          component={Input}
          type="number"
          label="Max ID:"
          validate={[V.nonNegativeInt]}
          min={0}
          fullWidth
        />
      </Form>
    </div>
  );
};
AddLeaderboardRangeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddLeaderboardRangeForm;
