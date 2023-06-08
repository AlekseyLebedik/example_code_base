import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddVariablesSetFormStateless from './presentational';

export default reduxForm({
  form: FORM_NAME,
  initialValues: {
    variables: [{}],
    majorVersion: 0,
    minorVersion: 1,
  },
})(AddVariablesSetFormStateless);
