import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { publisherObjectsLoadingSelector } from 'dw/online-configuration/scenes/ObjectStore/PublisherObjects/selectors';
import {
  getGroupDetails,
  addGroupMember,
  removeGroupMembers,
  replaceUsers,
  deleteGroup,
} from '../../actions';
import {
  groupMembersSelector,
  groupDetailsLoadingSelector,
  groupObjectsCountSelector,
  dataFormatterSelector,
  groupsListSelector,
  categoriesSelector,
} from '../../selectors';
import GroupDetailsStateless from './presentational';

const stateToProps = state => ({
  groupMembers: groupMembersSelector(state),
  isLoading: groupDetailsLoadingSelector(state),
  isLoadingObjects: publisherObjectsLoadingSelector(state),
  formatDateTime: formatDateTimeSelector(state),
  groupObjectsCount: groupObjectsCountSelector(state),
  dataFormatter: dataFormatterSelector(state),
  groups: groupsListSelector(state),
  categories: categoriesSelector(state),
});

const dispatchToProps = dispatch => ({
  getGroupDetails: bindActionCreators(getGroupDetails, dispatch),
  addGroupMember: bindActionCreators(addGroupMember, dispatch),
  removeGroupMembers: bindActionCreators(removeGroupMembers, dispatch),
  replaceUsers: bindActionCreators(replaceUsers, dispatch),
  deleteGroup: bindActionCreators(deleteGroup, dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedItemId } = ownProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmitReplaceUsers: values =>
      dispatchProps.replaceUsers(selectedItemId, values),
  };
};

class GroupDetails extends Component {
  state = { selectedItemId: null };

  static getDerivedStateFromProps(props, state) {
    if (props.selectedItemId !== state.selectedItemId) {
      props.getGroupDetails(props.selectedItemId);
      return { selectedItemId: props.selectedItemId };
    }
    return null;
  }

  addGroupMember = users =>
    this.props.addGroupMember(
      this.props.selectedItemId,
      users.map(({ id: userID, username: userName }) => ({ userID, userName }))
    );

  removeGroupMembers = users => {
    const members = users.map(
      ({ id: userID, username: userName, accountType }) => ({
        userID,
        userName,
        accountType,
      })
    );
    this.props.removeGroupMembers(this.props.selectedItemId, members);
  };

  render() {
    const { selectedItemId } = this.state;
    const { groupMembers, isLoading, groupObjectsCount, ...props } = this.props;
    return (
      <GroupDetailsStateless
        {...props}
        groupMembers={groupMembers}
        selectedItemId={selectedItemId}
        addGroupMember={this.addGroupMember}
        removeGroupMembers={this.removeGroupMembers}
        isLoading={isLoading}
        groupObjectsCount={groupObjectsCount}
      />
    );
  }
}

GroupDetails.propTypes = {
  groupMembers: PropTypes.arrayOf(PropTypes.object),
  addGroupMember: PropTypes.func.isRequired,
  removeGroupMembers: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  groupObjectsCount: PropTypes.number.isRequired,
  getGroupDetails: PropTypes.func.isRequired,
};

GroupDetails.defaultProps = {
  groupMembers: [],
  selectedItemId: null,
};

export { GroupDetails };

export default connect(stateToProps, dispatchToProps, mergeProps)(GroupDetails);
