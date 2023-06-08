import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const MIN_GROUP_ID = 2;
const MAX_GROUP_ID = 254;

const validateGroupId = value => {
  const intValue = parseInt(value, 10);
  return intValue < MIN_GROUP_ID || intValue > MAX_GROUP_ID
    ? `Should be a number in range (${MIN_GROUP_ID} - ${MAX_GROUP_ID})`
    : undefined;
};

const AddGroupMemberForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-listItem-form group-members">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="groupId"
          component={Input}
          type="number"
          label="Group ID"
          validate={[V.required, validateGroupId]}
          fullWidth
        />
        <Field
          name="userIds"
          component={UserInput}
          label="User IDs"
          validate={[V.required]}
          isMulti
        />
      </Form>
    </div>
  );
};

AddGroupMemberForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddGroupMemberForm;
