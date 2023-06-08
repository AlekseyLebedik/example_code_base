import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FORM_NAME } from './constants';
import AddFileFormStateless from './presentational';

const selector = formValueSelector(FORM_NAME);

const AddFileForm = reduxForm({
  form: FORM_NAME,
})(AddFileFormStateless);

const stateToProps = (state, props) => ({
  checksumTypeValue: selector(state, 'checksumType'),
  initialValues: {
    checksumType: 'b64_md5sum_digest',
    userId: props.match.params.id,
  },
});

const AddFileFormConnected = withRouter(connect(stateToProps)(AddFileForm));

export default AddFileFormConnected;
