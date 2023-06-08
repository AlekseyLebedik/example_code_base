import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/FormFields/Select';
import { projectsDropdownSelector } from 'playpants/components/App/selectors';
import { required } from 'dw/core/components/FormFields/validation';

export default function ProjectsField() {
  const projects = useSelector(projectsDropdownSelector);
  return (
    <Field
      component={Select}
      fullWidth
      label="Project(s)"
      multiple
      name="eventProjects"
      validate={[required]}
    >
      {projects.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Field>
  );
}
