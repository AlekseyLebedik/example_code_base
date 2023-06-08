import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import ObjectPermissionManagerPresentational from './presentational';

const stateToProps = (state, props) => ({
  contentTypePermissions:
    state.Core.ObjectPermissionManager.contentTypePermissions[props.ctypeId] ||
    [],
});

const dispatchToProps = dispatch => ({
  fetchContentType: bindActionCreators(actions.fetchContentType, dispatch),
  fetchRelatedPermissions: bindActionCreators(
    actions.fetchRelatedPermissions,
    dispatch
  ),

  onSaveClick: (e, form, formProps) => {
    dispatch(submit(formProps.form));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onDialogShow: () => {
    if (stateProps.contentTypePermissions.length === 0) {
      dispatchProps.fetchContentType(ownProps.ctypeId);
    }
  },
});

const ObjectPermissionManager = connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(ObjectPermissionManagerPresentational);

ObjectPermissionManager.propTypes = {
  ctypeId: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
};

export default ObjectPermissionManager;
