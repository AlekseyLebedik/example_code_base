import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddChallengeFormStateless from './presentational';

const AddChallengesForm = reduxForm({
  form: FORM_NAME,
})(AddChallengeFormStateless);

export default AddChallengesForm;
