/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  initialValuesSelector,
  selectedItemSelector,
  contentTypesSelector,
  loadingDetailsSelector,
  availableCompanyUsersList,
} from 'dw/permission-management/scenes/Companies/selectors';

import { FORM_NAME } from 'dw/permission-management/scenes/Companies/constants';
import {
  DRAG_TYPE_OBJECT_PERM,
  DRAG_TYPE_DETAILS,
} from 'dw/permission-management/scenes/constants';

import { transformToObjectPermission } from 'dw/permission-management/scenes/helpers';

import {
  fetchCompanies,
  fetchAvailableCompanyGroupUsersModal as fetchAvailableUsersAction,
  fetchAvailableCompanyGroupUsers as fetchSelectedUsersAction,
} from 'dw/permission-management/scenes/actionCreators';
import {
  fetchContentTypesDetails,
  fetchObjectPermissions,
  editObjectPermissions,
  editCompanyUsers,
} from 'dw/permission-management/scenes/Companies/actions';
import DetailStateless from './presentational';

const stateToProps = (state, props) => ({
  initialValues: initialValuesSelector(state, props),
  selectedItem: selectedItemSelector(state, props),
  contentTypes: contentTypesSelector(state),
  isLoading: loadingDetailsSelector(state, props),
  form: FORM_NAME,
  dragTypeObjectPerm: DRAG_TYPE_OBJECT_PERM,
  dragTypeDetails: DRAG_TYPE_DETAILS,
  transformToObjectPerm: transformToObjectPermission,
  availableCompanyUsersList: availableCompanyUsersList(state),
});

const dispatchToProps = {
  fetchContentTypesDetails,
  fetchObjectPermissions,
  fetchCompanies,
  editObjectPermissions,
  editCompanyUsers,
  fetchAvailableUsers: fetchAvailableUsersAction,
  fetchSelectedUsers: fetchSelectedUsersAction,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSave: value => {
    const { id: companyId } = stateProps.selectedItem;
    dispatchProps.editCompanyUsers(companyId, {
      users: value.users.map(u => ({ id: u.id })),
    });
  },
});

class Details extends Component {
  state = {
    selectedItemId: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedItemId, fetchAvailableUsers, fetchSelectedUsers } =
      nextProps;
    if (selectedItemId !== prevState.selectedItemId) {
      fetchAvailableUsers();
      fetchSelectedUsers({ companyId: selectedItemId });
      return { selectedItemId };
    }
    return null;
  }

  render() {
    return <DetailStateless {...this.props} />;
  }
}

Details.propTypes = {
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  fetchContentTypesDetails: PropTypes.func.isRequired,
  fetchObjectPermissions: PropTypes.func.isRequired,
  fetchAvailableUsers: PropTypes.func.isRequired,
  fetchSelectedUsers: PropTypes.func.isRequired,
};

Details.defaultProps = {
  selectedItem: null,
  selectedItemId: null,
};

export default connect(stateToProps, dispatchToProps, mergeProps)(Details);
