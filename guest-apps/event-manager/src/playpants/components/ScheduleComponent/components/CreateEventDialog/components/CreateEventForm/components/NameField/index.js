import React from 'react';
import { Field } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
import { required, maxLength } from 'dw/core/components/FormFields/validation';
import { TITLE_MAX_CHAR_LENGTH } from 'playpants/constants/validation';

const maxCharLength = maxLength(TITLE_MAX_CHAR_LENGTH);

const NameField = () => (
  <Field
    component={Input}
    data-cy="createEventNameField"
    fullWidth
    label="Event Name"
    name="eventName"
    validate={[required, maxCharLength]}
  />
);

export default NameField;
