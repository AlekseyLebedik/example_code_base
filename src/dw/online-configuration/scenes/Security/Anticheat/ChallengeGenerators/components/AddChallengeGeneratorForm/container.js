import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddChallengeGeneratorFormStateless from './presentational';

const AddChallengeGeneratorsForm = reduxForm({
  form: FORM_NAME,
})(AddChallengeGeneratorFormStateless);

export default AddChallengeGeneratorsForm;
