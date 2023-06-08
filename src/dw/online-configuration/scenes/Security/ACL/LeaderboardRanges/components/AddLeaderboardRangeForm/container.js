import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddLeaderboardRangeFormStateless from './presentational';

const validate = values => {
  const errors = {};
  const minId = parseInt(values.minId, 10);
  const maxId = parseInt(values.maxId, 10);
  if (!(Number.isNaN(minId) || Number.isNaN(maxId)) && minId > maxId) {
    errors.maxId = 'The Max ID cannot be less than Min ID.';
  }
  return errors;
};

const AddUserLeaderboardRangesForm = reduxForm({
  form: FORM_NAME,
  validate,
})(AddLeaderboardRangeFormStateless);

export default AddUserLeaderboardRangesForm;
