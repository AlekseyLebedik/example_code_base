import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  initialValuesAdvancedUsersSelector,
  selectedItemSelector,
  contentTypesSelector,
  isLoadingDetailsSelector,
} from 'dw/permission-management/scenes/Users/selectors';
import {
  fetchContentTypesDetails,
  fetchObjectPermissions,
  editObjectPermissions,
  fetchAssignedGroups,
  fetchMemberships,
} from 'dw/permission-management/scenes/Users/actions';
import {
  PERMISSION_ADVANCED_FORM_NAME,
  PERMISSION_GROUPS_FORM_NAME,
} from 'dw/permission-management/scenes/Users/constants';
import {
  DRAG_TYPE_OBJECT_PERM,
  DRAG_TYPE_DETAILS,
} from 'dw/permission-management/scenes/constants';
import { transformToObjectPermission } from 'dw/permission-management/scenes/helpers';

import DetailsStateless from './presentational';

const stateToProps = (state, props) => ({
  initialValuesAdvancedUsers: initialValuesAdvancedUsersSelector(state, props),
  selectedItem: selectedItemSelector(state, props),
  contentTypes: contentTypesSelector(state),
  isLoading: isLoadingDetailsSelector(state, props),
  formAdvanced: PERMISSION_ADVANCED_FORM_NAME,
  formGroups: PERMISSION_GROUPS_FORM_NAME,
  dragTypeObjectPerm: DRAG_TYPE_OBJECT_PERM,
  dragTypeDetails: DRAG_TYPE_DETAILS,
  transformToObjectPerm: transformToObjectPermission,
});

const dispatchToProps = {
  fetchContentTypesDetails,
  fetchObjectPermissions,
  editObjectPermissions,
  fetchAssignedGroups: userID => fetchAssignedGroups({ userID }),
  fetchMemberships: userID => fetchMemberships({ userID }),
};

class Details extends Component {
  state = { userID: null };

  static getDerivedStateFromProps(props, state) {
    const { selectedItem } = props;
    const userID = selectedItem && selectedItem.id;
    if (userID !== state.userID) {
      props.fetchAssignedGroups(userID);
      props.fetchMemberships(userID);
      return { userID };
    }
    return null;
  }

  render() {
    return <DetailsStateless {...this.props} key={this.state.userID} />;
  }
}

Details.propTypes = {
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  fetchAssignedGroups: PropTypes.func.isRequired,
  fetchMemberships: PropTypes.func.isRequired,
  fetchContentTypesDetails: PropTypes.func.isRequired,
  fetchObjectPermissions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Details.defaultProps = {
  selectedItem: null,
  selectedItemId: null,
  isLoading: false,
};

export default connect(stateToProps, dispatchToProps)(Details);
