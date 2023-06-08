import { reduxForm } from 'redux-form';

import { REPLACE_USERS_FORM_NAME } from 'dw/online-configuration/scenes/ObjectStore/ObjectGroups/constants';
import ReplaceUsersFormStateless from './presentational';

export default reduxForm({
  form: REPLACE_USERS_FORM_NAME,
})(ReplaceUsersFormStateless);
