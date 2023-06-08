import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';

import * as AT from './actionTypes';

export const fetchMemberGroups = (params, append = false) => ({
  type: AT.STORAGE_GROUP_MEMBERS_FETCH,
  params,
  append,
});

export const fetchMemberGroupsSuccess = (payload, append) => ({
  type: AT.STORAGE_GROUP_MEMBERS_FETCH_SUCCESS,
  entries: payload.data,
  nextPageToken: payload.nextPageToken,
  elementsOrder: payload.columns,
  q: payload.q,
  append,
});

export const fetchMemberGroupsFailed = (err, params, append) => dispatch =>
  dispatch(
    CriticalErrorActions.show(err, () => fetchMemberGroups(params, append))
  );

export const groupMembersListItemClick = groupID => dispatch => {
  dispatch({
    type: AT.STORAGE_GROUP_MEMBERS_LIST_ITEM_ONCLICK,
    listItem: groupID,
  });
  dispatch({
    type: AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS,
    groupID,
  });
};

export const openAddModal = () => ({
  type: AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MODAL,
});

export const closeAddModal = () => ({
  type: AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MODAL,
});

export const openAddMembersModal = () => ({
  type: AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MEMBERS_MODAL,
});

export const closeAddMembersModal = () => ({
  type: AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MEMBERS_MODAL,
});

export const addGroupMembers = values => ({
  type: AT.STORAGE_GROUP_MEMBERS_ADD,
  values,
});

export const addGroupMemberSuccess = data => dispatch => {
  dispatch({
    type: AT.STORAGE_GROUP_MEMBERS_ADD_SUCCESS,
    listItem: data.groupId,
  });
  dispatch(closeAddModal());
  dispatch(closeAddMembersModal());
  dispatch(groupMembersListItemClick(data.groupId));
};

export const addGroupMemberFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const deleteGroupMembers = (groupId, userIds) => ({
  type: AT.STORAGE_GROUP_MEMBERS_DELETE,
  groupId,
  userIds,
});

export const deleteGroupMembersSuccess = (groupId, userIds) => dispatch => {
  dispatch({
    type: AT.STORAGE_GROUP_MEMBERS_DELETE_SUCCESS,
    groupId,
    userIds,
  });
  dispatch(setSelectedRowKeys([]));
};

export const deleteGroupMembersFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const fetchGroupDetailsSuccess = (groupID, payload) => ({
  type: AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS,
  data: payload.data,
  groupID,
});

export const fetchGroupDetailsFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));
