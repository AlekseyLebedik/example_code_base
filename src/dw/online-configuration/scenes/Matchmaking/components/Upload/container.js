import { connect } from 'dw/core/helpers/component';

import { joinPath } from 'dw/core/helpers/path';

import { uploadRuleset } from '../../actions';
import UploadStateles from './presentational';

const dispatchToProps = dispatch => ({
  uploadRuleset: (values, callback) =>
    new Promise((_, reject) =>
      dispatch(uploadRuleset(values, callback, reject))
    ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  uploadRuleset: values => {
    const { history, baseUrl } = ownProps;
    const callback = id => {
      history.push(joinPath(baseUrl, id));
      dispatchProps.closeModal();
    };
    return dispatchProps.uploadRuleset(values, callback);
  },
});

export default connect(null, dispatchToProps, UploadStateles, mergeProps);
