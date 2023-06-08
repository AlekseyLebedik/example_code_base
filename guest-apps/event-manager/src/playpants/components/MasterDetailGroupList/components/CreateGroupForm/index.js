import React from 'react';
import {
  reduxForm,
  Field,
  Form,
  propTypes as reduxFormPropTypes,
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import LoadingComponent from 'dw/core/components/Loading';

import { initialValuesSelector } from './selectors';
import { CREATE_GROUP_FORM_NAME } from '../../constants';

const CreateGroupForm = ({ handleSubmit, loading, onSubmit, extraFields }) => (
  <div className="stores__upload-store-form">
    {loading ? (
      <LoadingComponent />
    ) : (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="groupName"
          component={Input}
          label="Group Name"
          validate={[V.required]}
          fullWidth
        />
        {extraFields}
        <Field
          name="description"
          component={Input}
          label="Description"
          fullWidth
        />
      </Form>
    )}
  </div>
);

CreateGroupForm.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

const stateToProps = state => ({
  initialValues: initialValuesSelector(state),
});

export default compose(
  connect(stateToProps),
  reduxForm({
    form: CREATE_GROUP_FORM_NAME,
    enableReinitialize: true,
  })
)(CreateGroupForm);
