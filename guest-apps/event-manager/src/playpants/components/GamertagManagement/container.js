import React, { useState, useEffect } from 'react';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import {
  groupListSelector,
  groupLoadingSelector,
  nextGroupsSelector,
} from './selectors';
import * as actions from './actions';
import { GROUP_TYPE } from './constants';

import GroupsStateless from './presentational';

const GamertagGroups = ({
  groupList,
  onCreateGroup,
  onDeleteGroup,
  onFetchGroups,
  project,
  history,
  baseUrl,
  selectedGroup,
  ...props
}) => {
  const [filteredGroups, setFilteredGroups] = useState([]);

  const handleCreateGroup = params => {
    onCreateGroup({ ...params, type: GROUP_TYPE });
  };

  const handleFetchGroups = params => {
    onFetchGroups({ project, type: GROUP_TYPE, ...params });
  };

  const handleDeleteGroup = groupId => {
    onDeleteGroup(groupId, { type: GROUP_TYPE }, handleFetchGroups);
  };

  const handleSearch = ({ q: query }) => {
    const groups = groupList.filter(
      g =>
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.id.toString() === query ||
        (g.player_accounts &&
          g.player_accounts.some(a => a.username.startsWith(query)))
    );
    setFilteredGroups(groups);
  };

  /** Fetch groups on mount */
  useEffect(() => {
    handleFetchGroups();
    if (selectedGroup) {
      history.replace(joinPath(baseUrl, selectedGroup));
    }
  }, []);
  useEffect(() => {
    setFilteredGroups(groupList);
  }, [groupList]);

  return (
    <GroupsStateless
      {...props}
      groupList={filteredGroups}
      handleCreateGroup={handleCreateGroup}
      handleDeleteGroup={handleDeleteGroup}
      handleFetchGroups={handleFetchGroups}
      handleSearch={handleSearch}
      selectedGroup={selectedGroup}
    />
  );
};

const stateToProps = state => ({
  nextGroupsPage: nextGroupsSelector(state),
  groupList: groupListSelector(state),
  groupLoading: groupLoadingSelector(state),
  project: currentProjectIdSelector(state),
});

const dispatchToProps = dispatch => ({
  onCreateGroup: bindActionCreators(actions.createGroup, dispatch),
  onDeleteGroup: bindActionCreators(actions.deleteGroup, dispatch),
  onFetchGroups: bindActionCreators(actions.fetchGroups, dispatch),
});

GamertagGroups.propTypes = {
  groupList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
  onFetchGroups: PropTypes.func.isRequired,
  project: PropTypes.number.isRequired,
  selectedGroup: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
  onSelectGroup: PropTypes.func,
};
GamertagGroups.defaultProps = {
  selectedGroup: null,
  onSelectGroup: null,
};

const GroupsConnected = connect(stateToProps, dispatchToProps, GamertagGroups);

export default GroupsConnected;
