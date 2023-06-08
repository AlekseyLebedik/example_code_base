import React from 'react';
import { Field } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';

const NotesField = () => (
  <Field
    component={Input}
    data-cy="createEventNotesField"
    fullWidth
    label="Notes"
    name="eventNotes"
  />
);

export default NotesField;
