import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddPooledFileFormStateless from './presentational';

const AddPooledFileForm = reduxForm({
  form: FORM_NAME,
})(AddPooledFileFormStateless);

export default AddPooledFileForm;
