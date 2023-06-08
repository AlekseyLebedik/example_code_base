import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';

import Checkbox from 'dw/core/components/FormFields/Checkbox';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import Monaco from 'dw/core/components/FormFields/Monaco';

const AddScriptForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="lootgen__add-script-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="baseBranch"
          component={Input}
          label="Base Branch"
          validate={[V.required]}
        />
        <Field
          name="newScriptConfig"
          component={Monaco}
          label="Script"
          height={300}
          width={Infinity}
          options={{
            folding: false,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
          language="json"
          validate={[V.required]}
        />
        <Field
          name="mergeScriptToBaseBranch"
          component={Checkbox}
          label="Merge with Base Branch"
        />
      </Form>
    </div>
  );
};

AddScriptForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddScriptForm;
