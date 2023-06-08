import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { FORM_NAME } from './constants';
import PropagateObjectsFormStateless from './presentational';

const PropagateObjectsForm = reduxForm({
  form: FORM_NAME,
  onSubmitSuccess: (result, dispatch, props) =>
    props.onPropagateSubmitSuccess(),
})(PropagateObjectsFormStateless);

export default connect()(PropagateObjectsForm);
