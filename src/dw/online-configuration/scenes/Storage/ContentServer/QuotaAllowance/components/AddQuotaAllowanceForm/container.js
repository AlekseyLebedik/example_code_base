import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddQuotaAllowanceFormStateless from './presentational';

const AddQuotaAllowanceForm = reduxForm({
  form: FORM_NAME,
})(AddQuotaAllowanceFormStateless);

export default AddQuotaAllowanceForm;
