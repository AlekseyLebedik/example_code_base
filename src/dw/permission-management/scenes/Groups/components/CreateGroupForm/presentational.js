import React from 'react';
import {
  Field,
  Form,
  FieldArray,
  propTypes as reduxFormPropTypes,
} from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import UsersList from 'dw/core/components/FormFields/UsersList';
import Select from 'dw/core/components/FormFields/Select';
import UserAutoComplete from 'dw/core/components/AutocompleteGeneral';
import LoadingComponent from 'dw/core/components/Loading';

const CreateGroupForm = props => {
  const {
    handleSubmit,
    onSubmit,
    companies,
    availableGroupUsersList,
    loading,
  } = props;

  return (
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

          <Field
            name="companyId"
            component={Select}
            label="Company"
            validate={[V.required]}
            fullWidth
          >
            {companies &&
              companies.map(company => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
          </Field>

          <FieldArray
            name="members"
            component={UsersList}
            props={{
              availableUsers: availableGroupUsersList.map(user => ({
                label: user.name,
                value: user.name,
                ...user,
              })),
              userInputComponent: UserAutoComplete,
              isMulti: true,
              expanded: true,
            }}
          />
        </Form>
      )}
    </div>
  );
};

CreateGroupForm.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

CreateGroupForm.defaultProps = {};

export default CreateGroupForm;
