import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddQuotaUsageFormStateless from './presentational';

const AddQuotaUsageForm = reduxForm({
  form: FORM_NAME,
})(AddQuotaUsageFormStateless);

export default AddQuotaUsageForm;
