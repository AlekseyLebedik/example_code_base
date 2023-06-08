import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, Form } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Input from 'dw/core/components/FormFields/Input';
import Select from 'dw/core/components/FormFields/Select';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import * as V from 'dw/core/components/FormFields/validation';

import './index.css';

const replaceIndex = '0';

const AddKeyForm = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <div className="account-details__tabs__user-keys__add-key-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="index"
            component={Input}
            label="Index"
            validate={[V.required, V.number16]}
            fullWidth
          />
        </div>
        <div>
          <Field
            name="value"
            component={Input}
            label="Value"
            validate={[V.required, V.number64]}
            fullWidth
          />
        </div>
        <div>
          <Field
            name="writeType"
            component={Select}
            label="Write Type"
            validate={[V.required]}
            fullWidth
          >
            <MenuItem value={replaceIndex}>Replace</MenuItem>
            <MenuItem value="1">Add</MenuItem>
            <MenuItem value="2">Max</MenuItem>
            <MenuItem value="3">Min</MenuItem>
          </Field>
        </div>
        <div>
          <Field
            name="isDedicated"
            component={Checkbox}
            label="Is Dedicated"
            labelPlacement="start"
          />
        </div>
      </Form>
    </div>
  );
};
AddKeyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export const formName =
  'accounts__account-details__tabs__user-keys__add-user-key-form';

export default reduxForm({
  form: formName,
  initialValues: { writeType: replaceIndex },
})(AddKeyForm);
