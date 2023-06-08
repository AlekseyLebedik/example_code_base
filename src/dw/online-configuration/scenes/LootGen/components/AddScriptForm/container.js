import { reduxForm } from 'redux-form';
import { FORM_NAME } from './constants';
import AddScriptFormStateless from './presentational';

export default reduxForm({
  form: FORM_NAME,
})(AddScriptFormStateless);
