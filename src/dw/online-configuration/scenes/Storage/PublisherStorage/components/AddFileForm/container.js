import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddFileFormStateless from './presentational';

const AddFileForm = reduxForm({
  form: FORM_NAME,
})(AddFileFormStateless);

export default AddFileForm;
