import React from 'react';
import { reduxForm } from 'redux-form';

export default story =>
  React.createElement(reduxForm({ form: 'FORM_TEST' })(story));
