import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FORM_NAME } from './constants';
import AddFileFormStateless from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  contextsList: state.Scenes.Storage.UserContextStorage.contextsList,
});

const AddFileForm = reduxForm({
  form: FORM_NAME,
})(AddFileFormStateless);

export default connect(stateToProps)(AddFileForm);
