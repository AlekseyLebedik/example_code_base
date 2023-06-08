import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const AddQuotaUsageForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-listItem-form quota-usage">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="userId"
          component={UserInput}
          label="User ID"
          validate={[V.required]}
        />
        <Field
          name="dailyUploadBandwidth"
          component={Input}
          type="number"
          label="Daily upload bandwidth"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="dailyDownloadBandwidth"
          component={Input}
          type="number"
          label="Daily download bandwidth"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="totalUploadBandwidth"
          component={Input}
          type="number"
          label="Total upload bandwidth"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="totalDownloadBandwidth"
          component={Input}
          type="number"
          label="Total download bandwidth"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
      </Form>
    </div>
  );
};

AddQuotaUsageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddQuotaUsageForm;
