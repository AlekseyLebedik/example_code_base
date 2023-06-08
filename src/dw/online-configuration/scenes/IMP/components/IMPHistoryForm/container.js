import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddUserFileFormStateless from './presentational';

const AddUserFileForm = reduxForm({
  form: FORM_NAME,
})(AddUserFileFormStateless);

export default AddUserFileForm;
