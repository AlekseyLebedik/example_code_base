import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddFilenameFormStateless from './presentational';

const AddUserFilenameForm = reduxForm({
  form: FORM_NAME,
})(AddFilenameFormStateless);

export default AddUserFilenameForm;
