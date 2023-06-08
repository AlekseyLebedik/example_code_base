import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  Form,
  FieldArray,
  propTypes as reduxFormPropTypes,
} from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoCompleteComponent from 'dw/online-configuration/components/UserAutoComplete';
import Dropzone from 'dw/core/components/FormFields/Dropzone';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import styles from './presentational.module.css';

const CreateGroupForm = props => {
  const { handleSubmit, onSubmit, members, source } = props;

  return (
    <div className="stores__upload-store-form">
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
