import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddFunctionFormStateless from './presentational';

const AddFunctionsForm = reduxForm({
  form: FORM_NAME,
})(AddFunctionFormStateless);

export default AddFunctionsForm;
