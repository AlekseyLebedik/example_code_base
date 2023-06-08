import { reduxForm } from 'redux-form';

import { REPLACE_USERS_FORM_NAME } from 'abtesting/scenes/ABTestGroups/constants';
import ReplaceUsersFormStateless from './presentational';

export default reduxForm({
  form: REPLACE_USERS_FORM_NAME,
})(ReplaceUsersFormStateless);
