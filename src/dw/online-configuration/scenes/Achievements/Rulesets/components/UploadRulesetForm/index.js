import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import Upload from 'dw/core/components/FormFields/Upload';
import * as V from 'dw/core/components/FormFields/validation';
import { FORM_NAME } from './constants';

import './index.css';

const UploadRulesetForm = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <div className="rulesets__upload-ruleset-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="label"
            component={Input}
            label="Label"
            validate={[V.required]}
          />
        </div>
        <div>
          <Field
            name="fileData"
            type="text"
            component={Upload}
            label="Choose file"
            validate={[V.required]}
          />
        </div>
      </Form>
    </div>
  );
};
UploadRulesetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: FORM_NAME,
})(UploadRulesetForm);
