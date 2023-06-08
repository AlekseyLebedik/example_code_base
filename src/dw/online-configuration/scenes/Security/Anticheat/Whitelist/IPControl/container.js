import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { makeHasFeaturesEnabledSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { connect } from 'dw/core/helpers/component';
import { useSnackbar } from 'dw/core/hooks';
import {
  addWhitelistedUsers,
  deleteIPControl,
  deleteIPGroup,
  deleteWhitelistedUsers,
  updateWhitelistedUsers,
} from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import IPControlStatelessComponent from './presentational';
import {
  filteredSelector,
  ipNotesSelector,
  ipGroupsSelector,
  searchParams,
  usersGroupAndDateSelector,
} from './selectors';

const makeStateToProps = () => {
  const hasFeatureFlagSelector = makeHasFeaturesEnabledSelector();
  return state => ({
    addModalVisible:
      state.Scenes.Security.Anticheat.Whitelist.IPControl.addModalVisible,
    agGridEnabled: hasFeatureFlagSelector(state, {
      featureSwitches: [fs.IP_CONTROL_NOTES_ENABLED],
      isStaffAllowed: false,
    }),
    q: searchParams(state),
    nextPageToken:
      state.Scenes.Security.Anticheat.Whitelist.IPControl.nextPageToken,
    ipNotes: ipNotesSelector(state),
    ipGroups: ipGroupsSelector(state),
  });
};

const dispatchToProps = dispatch => ({
  onShowAll: (nextPageToken, append) =>
    dispatch(Actions.fetchAllIPControl({ nextPageToken }, append)),
  onSearch: payload => dispatch(Actions.onSearch(payload)),
  openAddModal: () => dispatch(Actions.openAddModal()),
  closeAddModal: () => dispatch(Actions.closeAddModal()),
  addIPNote: ipNote => dispatch(Actions.addIPNote(ipNote)),
  addIPGroup: ipGroup => dispatch(Actions.addIPGroup(ipGroup)),
  updateIPNote: ipNote => dispatch(Actions.updateIPNote(ipNote)),
  deleteIPNote: ipNote => dispatch(Actions.deleteIPNote(ipNote)),
});

const mergeProps = (stateProps, dispatchProps) => {
  const { addModalVisible, agGridEnabled, ...restStateProps } = stateProps;
  const { openAddModal, closeAddModal, addIPGroup, ...restDispatchProps } =
    dispatchProps;

  return {
    ...restStateProps,
    ...restDispatchProps,
    agGridEnabled,
    addModalProps: {
      addModalVisible,
      openAddModal,
      closeAddModal,
      addIPGroup,
    },
  };
};

const WhitelistControl = props => {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const [whitelistItems, setWhitelistItems] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [gridApi, setGridApi] = useState();

  const formatDateTime = useSelector(formatDateTimeSelector);
  const ipControl = useSelector(filteredSelector, isEqual);
  const whitelistedUsers = useSelector(usersGroupAndDateSelector, isEqual);

  useEffect(() => {
    const fetchAllData = async () => {
      Promise.all([
        dispatch(Actions.fetchIPControl()),
        dispatch(Actions.fetchIPNotes()),
        dispatch(Actions.fetchIPGroups()),
        dispatch(Actions.fetchWhitelistedUsers()),
      ]).catch(error => {
        if (error.message !== 'Cancelled Promise') {
          snackbar.error('Failed to load whitelist data.');
        }
      });
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (props.nextPageToken) {
      dispatch(
        Actions.fetchIPControl({ nextPageToken: props.nextPageToken }, true)
      );
    }
  }, [props.nextPageToken, dispatch]);

  useEffect(() => {
    if (ipControl && whitelistedUsers) {
      setWhitelistItems([...ipControl, ...whitelistedUsers]);
    }
  }, [ipControl, whitelistedUsers]);

  const handleUpdateWhitelistedUserId = useCallback(
    async (userId, updateData) => {
      try {
        const { data } = await updateWhitelistedUsers({
          id: userId,
          data: updateData,
        });
        snackbar.success('Whitelist by user ID updated successfully.');
        setWhitelistItems(
          whitelistItems.map(item =>
            item.userId === data.userId
              ? {
                  ...item,
                  note: data.note,
                  updatedAt: formatDateTime(data.updatedAt),
                  groupID: data.groupID,
                  group: data.group,
                }
              : item
          )
        );
      } catch (err) {
        // eslint-disable-next-line
        console.log(err.message);
        snackbar.error(
          'Whitelist by user ID update failed, see logs for details.'
        );
      }
    },
    [snackbar, updateWhitelistedUsers]
  );

  const onUpdateNote = (rowData, newNote) => {
    if (rowData.userId) {
      handleUpdateWhitelistedUserId(rowData.userId, {
        note: newNote,
      });
    }
  };

  const onDrag = event => {
    const { node } = event;
    const { overNode } = event;
    if (!overNode) {
      return;
    }
    const newGroup =
      overNode.group === true
        ? overNode.allLeafChildren[0].data.group
        : overNode.data.group;
    const newGroupID =
      overNode.group === true
        ? overNode.allLeafChildren[0].data.groupID
        : overNode.data.groupID;
    if (newGroupID === node.data.groupID) {
      return;
    }
    if (node.data.noteID) {
      // just move an existing note (to unassigned will also work with groupID=0)
      dispatch(
        Actions.updateIPNote({
          id: node.data.noteID,
          note: node.data.note,
          ipAddr: node.data.ipAddr,
          ipRange: node.data.ipRange,
          groupID: newGroupID,
        })
      );
    } else {
      // create a new note while moving
      if (node.data.ipAddr) {
        dispatch(
          Actions.addIPNote({
            // Try to set a unique note so no conflicts (can always be changed after)
            note: [
              node.data.ipAddr,
              '+',
              node.data.ipRange,
              ': ',
              newGroup,
            ].join(''),
            ipAddr: node.data.ipAddr,
            ipRange: node.data.ipRange,
            groupID: newGroupID,
          })
        );
      }
      if (node.data.userId) {
        handleUpdateWhitelistedUserId(node.data.userId, {
          groupID: newGroupID,
          note: node.data.note,
        });
      }
    }
  };

  const handleDeleteIpControl = useCallback(
    async ips => {
      try {
        await deleteIPControl(ips);
        snackbar.success('Whitelisted IP/Ranges deleted successfully.');
        dispatch(Actions.fetchIPControl());
      } catch (err) {
        // eslint-disable-next-line
        console.log(err.message);
        snackbar.error(
          'Whitelisted IP/Ranges delete failed, see logs for details.'
        );
      }
    },
    [snackbar, deleteIPControl]
  );

  const handleDeleteWhitelistedUserIds = useCallback(
    async userIds => {
      try {
        await deleteWhitelistedUsers(userIds);
        snackbar.success('Whitelisted User ID deleted successfully.');
        dispatch(Actions.fetchWhitelistedUsers());
      } catch (err) {
        // eslint-disable-next-line
        console.log(err.message);
        snackbar.error(
          'Whitelisted User ID delete failed, see logs for details.'
        );
      }
    },
    [snackbar, deleteWhitelistedUsers]
  );

  const handleDeleteGroups = useCallback(
    async (groupId, deleteContents) => {
      try {
        await deleteIPGroup({
          id: groupId,
          deleteContents,
        });
        snackbar.success('Group deleted successfully.');
        dispatch(Actions.fetchIPGroups());
      } catch (err) {
        // eslint-disable-next-line
        console.log(err.message);
        snackbar.error('Group delete failed, see logs for details.');
      }
    },
    [snackbar, deleteIPGroup]
  );

  // TODO - verify mixed type delete request(s) work correctly
  // eslint-disable-next-line no-unused-vars
  const onDelete = () => {
    const selectedIps = [];
    const selectedUserIds = [];

    selectedItems.forEach(item => {
      if (item.ipInt) {
        selectedIps.push(item.ipInt);
      } else if (item.userId) {
        selectedUserIds.push(item.userId);
      }
    });
    // console.log(selectedIps, selectedUserIds);

    if (selectedIps.length > 0) {
      handleDeleteIpControl(selectedIps);
    }
    if (selectedUserIds.length > 0) {
      handleDeleteWhitelistedUserIds(selectedUserIds);
    }
    if (selectedGroups.length > 0) {
      selectedGroups.forEach(g => {
        handleDeleteGroups(g, false);
      });
    }
  };

  const handleAddWhitelistedUserId = useCallback(
    async values => {
      try {
        await addWhitelistedUsers(values);
        snackbar.success('Whitelisted User ID added successfully.');
        // eslint-disable-next-line react/prop-types
        props.addModalProps.closeAddModal();
        dispatch(Actions.fetchWhitelistedUsers());
      } catch (err) {
        // eslint-disable-next-line
        console.log(err.message);
        snackbar.error('Whitelisted User ID add failed, see logs for details.');
      }
    },
    [snackbar, deleteIPControl]
  );

  const onAddWhitelist = newItems => {
    if (!newItems || newItems.length === 0) {
      return;
    }
    if (newItems[0].ipAddr) {
      dispatch(Actions.addIPControl(newItems));
    } else if (newItems[0].userId) {
      handleAddWhitelistedUserId(newItems);
    }
  };

  const onChange = (item, group) => {
    if (item && item.ipInt && typeof item.ipInt === 'number') {
      const otherSelected = selectedItems.filter(i => i.ipInt !== item.ipInt);
      if (otherSelected.length === selectedItems.length) {
        setSelectedItems([...selectedItems, item]);
      } else {
        // de-select the item
        setSelectedItems(otherSelected);
      }
    } else if (item && item.userId) {
      const otherSelected = selectedItems.filter(i => i.userId !== item.userId);
      if (otherSelected.length === selectedItems.length) {
        setSelectedItems([...selectedItems, item]);
      } else {
        // de-select the item
        setSelectedItems(otherSelected);
      }
    }
    // Ignore 'group 0' if it's set, this is the fake 'Unassigned Group'
    if (typeof group === 'number' && group > 0) {
      setSelectedGroups(
        selectedGroups.includes(group)
          ? selectedGroups.filter(i => i !== group)
          : [...selectedGroups, group]
      );
    }
  };

  const onSelectItemOrGroup = row => {
    if (row.node.group && row.node.allLeafChildren.length > 0) {
      const [
        {
          data: { groupID },
        },
      ] = row.node.allLeafChildren;
      // If the group IS selected in ag-Grid and NOT in state, we need to select it in state (so fire the handler)
      // If the group is NOT selected in ag-Grid IS in state, we need to deselect it in state (so fire the handler)
      if (
        (row.node.selected === true && !selectedGroups.includes(groupID)) ||
        (row.node.selected !== true && selectedGroups.includes(groupID))
      ) {
        onChange(null, groupID);
      }
    } else if (row?.data) {
      // It's an item row so simply select/deselect it
      onChange(row.data, null);
    }
  };

  const onSelectAll = () => {
    setSelectedItems(
      selectedItems.length === whitelistItems.length ? [] : whitelistItems
    );
  };

  const onGridSearch = useCallback(
    value => {
      gridApi.setQuickFilter(value);
    },
    [gridApi]
  );

  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  return (
    <IPControlStatelessComponent
      {...props}
      whitelistItems={whitelistItems}
      selectedItems={selectedItems}
      selectedGroups={selectedGroups}
      onChange={onChange}
      onSelectItemOrGroup={onSelectItemOrGroup}
      onSelectAll={onSelectAll}
      onGridReady={onGridReady}
      onGridSearch={onGridSearch}
      onUpdateNote={onUpdateNote}
      onDelete={onDelete}
      onAddWhitelist={onAddWhitelist}
      onDrag={onDrag}
      handleUpdateWhitelistedUserId={handleUpdateWhitelistedUserId}
    />
  );
};

WhitelistControl.propTypes = {
  nextPageToken: PropTypes.string,
};
WhitelistControl.defaultProps = {
  nextPageToken: undefined,
};

export default connect(
  makeStateToProps,
  dispatchToProps,
  WhitelistControl,
  mergeProps
);
