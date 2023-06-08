import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FORM_NAME } from './constants';
import { addCategory } from './action';
import AddFileFormStateless from './presentational';
import { contentInCloudSelector } from './selectors';

const selector = formValueSelector(FORM_NAME);

const stateToProps = (state, props) => {
  const contentInCloud = contentInCloudSelector(state);
  return {
    checksumTypeValue: selector(state, 'checksumType'),
    initialValues: {
      checksumType: 'b64_md5sum_digest',
      groupID: props.selectedGroup ? props.selectedGroup.groupID : undefined,
      ...(contentInCloud && { acl: 'public' }),
    },
    contentInCloud,
  };
};

const dispatchProps = dispatch => ({
  onAddCategory: categoryName => dispatch(addCategory({ categoryName })),
});

export default compose(
  connect(stateToProps, dispatchProps),
  reduxForm({
    form: FORM_NAME,
  })
)(AddFileFormStateless);
