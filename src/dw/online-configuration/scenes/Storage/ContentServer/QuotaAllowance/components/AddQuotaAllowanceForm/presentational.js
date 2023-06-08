import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const AddQuotaAllowanceForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-listItem-form quota-allowance">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="userId"
          component={UserInput}
          label="User ID"
          validate={[V.required]}
        />
        <Field
          name="maxStorageSpace"
          component={Input}
          type="number"
          label="Max storage space"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="maxNumFiles"
          component={Input}
          type="number"
          label="Max num files"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="maxDailyUploadBandwidth"
          component={Input}
          type="number"
          label="Max daily upload bandwidth"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="maxDailyDownloadBandwidth"
          component={Input}
          type="number"
          label="Max daily download bandwidth"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
      </Form>
    </div>
  );
};

AddQuotaAllowanceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddQuotaAllowanceForm;
