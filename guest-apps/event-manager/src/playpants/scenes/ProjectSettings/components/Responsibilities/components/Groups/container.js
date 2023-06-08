import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { fetchAvailableUsers } from 'playpants/scenes/ProjectSettings/actions';

import {
  groupListSelector,
  groupLoadingSelector,
  nextGroupsSelector,
} from '../../selectors';
import { availableUsersSelector, makeSelectedItemSelector } from './selectors';
import * as actions from './actions';
import { GROUP_TYPE } from './constants';

import GroupsStateless from './presentational';

const Groups = ({
  onCreateGroup,
  onDeleteGroup,
  onFetchAvailableUsers,
  ...props
}) => {
  const handleCreateGroup = params => {
    onCreateGroup({ ...params, type: GROUP_TYPE });
  };

  const handleDeleteGroup = groupId => {
    onDeleteGroup(groupId, { type: GROUP_TYPE }, props.onFetchGroups);
  };

  return (
    <GroupsStateless
      {...props}
      handleCreateGroup={handleCreateGroup}
      handleDeleteGroup={handleDeleteGroup}
    />
  );
};

Groups.propTypes = {
  onCreateGroup: PropTypes.func.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
  onFetchAvailableUsers: PropTypes.func.isRequired,
  onFetchGroups: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const selectedItemSelector = makeSelectedItemSelector();

  const mapStateToProps = (state, props) => ({
    availableUsers: availableUsersSelector(state),
    groupList: groupListSelector(state),
    groupLoading: groupLoadingSelector(state),
    nextGroupsPage: nextGroupsSelector(state),
    selectedItem: selectedItemSelector(state, props),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  onCreateGroup: bindActionCreators(actions.createGroup, dispatch),
  onDeleteGroup: bindActionCreators(actions.deleteGroup, dispatch),
  onSearchUsers: payload => dispatch(fetchAvailableUsers({ q: payload.q })),
});

export default connect(makeMapStateToProps, dispatchToProps)(Groups);
