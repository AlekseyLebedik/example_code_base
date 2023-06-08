import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddCategoryFormStateless from './presentational';

export default reduxForm({
  form: FORM_NAME,
})(AddCategoryFormStateless);
