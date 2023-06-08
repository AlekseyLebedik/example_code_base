import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SelectField from 'dw/core/components/Select';

import { uuid } from 'dw/core/helpers/uuid';

import './presentational.css';

const AddTaskRuleForm = props => (
  <div className="add-task-rule-form">
    <TextField
      placeholder="Client Type"
      label="Client Type"
      onChange={e => props.onChange('clientType', e.target.value)}
      onBlur={() => props.onBlur('clientType')}
      value={
        props.formValues.clientType || props.formValues.clientType === 0
          ? props.formValues.clientType
          : ''
      }
      error={!!props.formErrors.clientType}
      helperText={props.formErrors.clientType}
      fullWidth
    />
    <SelectField
      label="Service"
      value={props.formValues.service || ''}
      onChange={e => {
        props.onChange('service', e.target.value);
      }}
      error={!!props.formErrors.service}
      helperText={props.formErrors.service}
      fullWidth
    >
      {props.servicesList.map(serviceName => (
        <MenuItem value={serviceName} key={uuid()}>
          {serviceName}
        </MenuItem>
      ))}
    </SelectField>
    <SelectField
      label="Task"
      value={props.formValues.task || ''}
      onChange={e => {
        props.onChange('task', e.target.value);
      }}
      error={!!props.formErrors.task}
      helperText={props.formErrors.task}
      fullWidth
    >
      {props.taskChoices.map(taskName => (
        <MenuItem value={taskName} key={taskName}>
          {taskName}
        </MenuItem>
      ))}
    </SelectField>
    <div className="justify">
      <label htmlFor="allow-checkbox">Allow</label>
      <Checkbox
        color="default"
        name="allow"
        className="allow-checkbox"
        id="allow-checkbox"
        checked={!!props.formValues.allow}
        onClick={() => props.onChange('allow', !props.formValues.allow)}
      />
    </div>
    <div className="justify">
      This will alter the ACL task rules - Are you sure you wish to add this
      rule?
    </div>
  </div>
);

AddTaskRuleForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    clientType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    service: PropTypes.string,
    task: PropTypes.string,
    allow: PropTypes.bool,
  }),
  formErrors: PropTypes.shape({
    clientType: PropTypes.string,
    service: PropTypes.string,
    task: PropTypes.string,
  }),
  servicesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  taskChoices: PropTypes.arrayOf(PropTypes.string).isRequired,
};

AddTaskRuleForm.defaultProps = {
  formValues: {},
  formErrors: {},
};

export default AddTaskRuleForm;
