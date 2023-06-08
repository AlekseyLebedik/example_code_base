/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  initialValuesSelector,
  selectedItemSelector,
  contentTypesSelector,
  isLoadingDetailsSelector,
  availableGroupUsersList,
} from 'dw/permission-management/scenes/Groups/selectors';
import {
  fetchContentTypesDetails,
  fetchObjectPermissions,
  fetchGroupUsers as fetchGroupUsersAction,
  editObjectPermissions,
  editGroupUsers,
} from 'dw/permission-management/scenes/Groups/actions';
import { fetchAvailableCompanyGroupUsers as fetchAvailableCompanyGroupUsersAction } from 'dw/permission-management/scenes/actionCreators';
import { FORM_NAME } from 'dw/permission-management/scenes/Groups/constants';
import {
  DRAG_TYPE_OBJECT_PERM,
  DRAG_TYPE_DETAILS,
} from 'dw/permission-management/scenes/constants';
import { transformToObjectPermission } from 'dw/permission-management/scenes/helpers';

import DetailsStateless from './presentational';

const stateToProps = (state, props) => ({
  initialValues: initialValuesSelector(state, props),
  selectedItem: selectedItemSelector(state, props),
  contentTypes: contentTypesSelector(state),
  isLoading: isLoadingDetailsSelector(state, props),
  availableGroupUsersList: availableGroupUsersList(state),
  form: FORM_NAME,
  dragTypeObjectPerm: DRAG_TYPE_OBJECT_PERM,
  dragTypeDetails: DRAG_TYPE_DETAILS,
  transformToObjectPerm: transformToObjectPermission,
});

const dispatchToProps = {
  fetchContentTypesDetails,
  fetchObjectPermissions,
  fetchGroupUsers: fetchGroupUsersAction,
  fetchAvailableCompanyGroupUsers: fetchAvailableCompanyGroupUsersAction,
  editObjectPermissions,
  editGroupUsers,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSave: value => {
    const { id: groupId } = stateProps.selectedItem;
    dispatchProps.editGroupUsers(groupId, {
      users: value.users.map(u => ({ id: u.id })),
    });
  },
});

class Details extends Component {
  state = {
    selectedItemId: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedItem, fetchGroupUsers, fetchAvailableCompanyGroupUsers } =
      nextProps;
    if (selectedItem && selectedItem.id !== prevState.selectedItemId) {
      const { id: selectedItemId, company: companyId } = selectedItem;
      fetchGroupUsers({ groupId: selectedItemId });
      fetchAvailableCompanyGroupUsers({ companyId });
      return { selectedItemId };
    }
    return null;
  }

  render() {
    return <DetailsStateless {...this.props} />;
  }
}

Details.propTypes = {
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  fetchContentTypesDetails: PropTypes.func.isRequired,
  fetchObjectPermissions: PropTypes.func.isRequired,
  fetchGroupUsers: PropTypes.func.isRequired,
  fetchAvailableCompanyGroupUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Details.defaultProps = {
  selectedItem: null,
  selectedItemId: null,
  isLoading: false,
};

export default connect(stateToProps, dispatchToProps, mergeProps)(Details);
