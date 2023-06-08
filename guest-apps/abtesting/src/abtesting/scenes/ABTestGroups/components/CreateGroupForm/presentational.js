import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  Form,
  FieldArray,
  propTypes as reduxFormPropTypes,
  formValues,
} from 'redux-form';

import MenuItem from '@material-ui/core/MenuItem';
import Input from 'dw/core/components/FormFields/Input';
import Select from 'dw/core/components/FormFields/Select';
import * as V from 'dw/core/components/FormFields/validation';
import UsersListFormField from 'dw/core/components/FormFields/UsersList';
import UserAutoCompleteComponent from 'dw/core/components/UserAutoComplete';
import Dropzone from 'dw/core/components/FormFields/Dropzone';
import FeatureSwitchesCheck from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';

import styles from './presentational.module.css';

const ContextUsersList = ({ context, ...props }) => (
  <UsersListFormField {...props} context={context} />
);
ContextUsersList.propTypes = {
  context: PropTypes.string,
};
ContextUsersList.defaultProps = {
  context: undefined,
};
const UsersList = formValues('context')(ContextUsersList);

const CreateGroupForm = props => {
  const { handleSubmit, onSubmit, members, source, contextList, change } =
    props;

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="groupName"
          component={Input}
          label="Group Name"
          validate={[V.required]}
          fullWidth
        />

        <Field
          name="description"
          component={Input}
          label="Description"
          validate={[V.required]}
          fullWidth
        />
        <Field
          name="context"
          component={Select}
          label="Context"
          validate={[V.required]}
          fullWidth
          onChange={() => change('members', [])}
        >
          {contextList.map(context => (
            <MenuItem value={context.id} key={context.id}>
              {context.name}
            </MenuItem>
          ))}
        </Field>
        <FeatureSwitchesCheck
          featureSwitches={[fs.GROUPS_UPLOAD_PLAYERS]}
          isStaffAllowed={false}
        >
          <Field
            name="source"
            classes={{
              container: styles.fileUpload,
              button: styles.browserFileButton,
            }}
            accept=".csv"
            component={Dropzone}
            validate={[V.isAnyFileLoading]}
            disabled={members && members.length > 0}
            label="Choose a user csv file"
            fullWidth
          />
        </FeatureSwitchesCheck>

        <FieldArray
          name="members"
          component={UsersList}
          disabled={source && source.base64}
          props={{
            userInputComponent: UserAutoCompleteComponent,
            expanded: false,
            excludeColumns: ['email'],
          }}
        />
      </Form>
    </div>
  );
};

CreateGroupForm.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
  members: PropTypes.array,
  source: PropTypes.object,
};

CreateGroupForm.defaultProps = {
  members: [],
  source: {},
};

export default CreateGroupForm;
