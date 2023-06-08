import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/FormFields/Select';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import * as V from 'dw/core/components/FormFields/validation';

const AddMonitoredUserForm = props => {
  const { monitoringGroups, handleSubmit, externalSubmit } = props;

  return (
    <div className="add-monitored-user-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="userId"
          component={UserInput}
          label="User ID"
          validate={[V.required]}
          fullWidth
        />
        <Field
          name="monitoringGroup"
          component={Select}
          label="Monitoring group"
          validate={[V.required]}
          fullWidth
        >
          {Object.keys(monitoringGroups).map(key => (
            <MenuItem key={`monitoring-group-${key}`} value={key}>
              {monitoringGroups[key]}
            </MenuItem>
          ))}
        </Field>
      </Form>
    </div>
  );
};

AddMonitoredUserForm.propTypes = {
  monitoringGroups: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

AddMonitoredUserForm.defaultProps = {
  monitoringGroups: {},
};

export default AddMonitoredUserForm;
