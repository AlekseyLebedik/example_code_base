import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getGroupDetails as getGroupDetailsAction,
  addGroupMember,
  removeGroupMembers as removeGroupMembersAction,
  replaceUsers,
  fetchTests as fetchTestsAction,
  fetchConfigs as fetchConfigsAction,
  deleteGroup as deleteGroupAction,
} from '../../actions';
import {
  groupMembersSelector,
  groupDetailsLoadingSelector,
  groupsListSelector,
} from '../../selectors';
import GroupDetailsStateless from './presentational';

const stateToProps = state => ({
  groupMembers: groupMembersSelector(state),
  isLoading: groupDetailsLoadingSelector(state),
  groups: groupsListSelector(state),
});

const dispatchToProps = dispatch => ({
  getGroupDetails: (selectedItemId, context) =>
    dispatch(getGroupDetailsAction(selectedItemId, context)),
  fetchTests: context => dispatch(fetchTestsAction(context)),
  fetchConfigs: context => dispatch(fetchConfigsAction(context)),
  addGroupMember: (selectedItemId, users, context) =>
    dispatch(addGroupMember(selectedItemId, users, context)),
  removeGroupMembers: (selectedItemId, members, context) =>
    dispatch(removeGroupMembersAction(selectedItemId, members, context)),
  replaceUsers: (selectedItemId, values, context) =>
    dispatch(replaceUsers(selectedItemId, values, context)),
  deleteGroup: (group, context) => dispatch(deleteGroupAction(group, context)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedItemId, context } = ownProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmitReplaceUsers: values =>
      dispatchProps.replaceUsers(selectedItemId, values, context),
  };
};

class GroupDetails extends Component {
  state = { selectedItemId: null };

  static getDerivedStateFromProps(props, state) {
    const {
      context,
      selectedItemId,
      getGroupDetails,
      fetchTests,
      fetchConfigs,
    } = props;
    if (context && selectedItemId !== state.selectedItemId) {
      getGroupDetails(selectedItemId, context);
      fetchTests(context);
      fetchConfigs(context);
      return { selectedItemId: props.selectedItemId };
    }
    return null;
  }

  onGridReady = params => {
    this.gridApi = params.api;
  };

  onFilterChange = value => this.gridApi.setQuickFilter(value);

  onFirstDataRendered = params => params.api.sizeColumnsToFit();

  getRowHeight = params => {
    const { detail: isDetailRow } = params.node;
    return isDetailRow ? params.data.cohorts.length * 50 + 85 : 50;
  };

  addGroupMember = users =>
    this.props.addGroupMember(
      this.props.selectedItemId,
      users.map(({ id: userID, username: userName }) => ({ userID, userName })),
      this.props.context
    );

  removeGroupMembers = users => {
    const members = users.map(({ id: userID, username: userName }) => ({
      userID,
      userName,
    }));
    const { selectedItemId, removeGroupMembers, context } = this.props;
    removeGroupMembers(selectedItemId, members, context);
  };

  deleteGroup = group => {
    const { context, deleteGroup } = this.props;
    deleteGroup(group, context);
  };

  render() {
    const { selectedItemId } = this.state;
    const { groupMembers, isLoading, ...props } = this.props;
    return (
      <GroupDetailsStateless
        {...props}
        groupMembers={groupMembers}
        selectedItemId={selectedItemId}
        addGroupMember={this.addGroupMember}
        removeGroupMembers={this.removeGroupMembers}
        deleteGroup={this.deleteGroup}
        isLoading={isLoading}
        onGridReady={this.onGridReady}
        onFilterChange={this.onFilterChange}
        getRowHeight={this.getRowHeight}
        onFirstDataRendered={this.onFirstDataRendered}
      />
    );
  }
}

GroupDetails.propTypes = {
  groupMembers: PropTypes.arrayOf(PropTypes.object),
  addGroupMember: PropTypes.func.isRequired,
  removeGroupMembers: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  context: PropTypes.string,
  getGroupDetails: PropTypes.func.isRequired,
  fetchTests: PropTypes.func.isRequired,
  fetchConfigs: PropTypes.func.isRequired,
};

GroupDetails.defaultProps = {
  groupMembers: [],
  selectedItemId: null,
  context: undefined,
};

export { GroupDetails };

export default connect(stateToProps, dispatchToProps, mergeProps)(GroupDetails);
