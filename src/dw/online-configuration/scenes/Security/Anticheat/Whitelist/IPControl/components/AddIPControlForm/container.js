import { reduxForm } from 'redux-form';

import AddIPControlFormStateless from './presentational';

export default reduxForm({
  form: 'add-whitelist',
})(AddIPControlFormStateless);
