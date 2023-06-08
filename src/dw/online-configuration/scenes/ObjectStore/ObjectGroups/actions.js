import get from 'lodash/get';
import set from 'lodash/set';

import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { createFetch } from '@demonware/devzone-core/helpers/actions';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import {
  GROUPS_LIST_PREFIX,
  GROUPS_DETAILS_PREFIX,
  CATEGORIES_LIST_PREFIX,
} from './constants';
import * as AT from './actionTypes';

export {
  downloadObject as downloadGroupObject,
  deleteObjects as deleteGroupObjects,
  promoteObject as promoteGroupObject,
  uploadObject as uploadGroupObject,
  fetchObjects as fetchGroupObjects,
} from '../commonActions';

const { Groups: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint, serviceName) =>
  makeContextToUseSelector(getState(), {
    serviceName: serviceName || Services.Groups,
    endpoint,
  });

export const fetchGroups = () => (dispatch, getState) =>
  dispatch(
    createFetch(GROUPS_LIST_PREFIX, null, {
      context: getContext(getState, endpoints.getGroups),
    })
  );

export const fetchCategories = () => (dispatch, getState) => {
  const context = getContext(
    getState,
    ServiceEndpoints.ObjectStore.getPublisherObjectsCategories,
    Services.ObjectStore
  );
  dispatch(createFetch(CATEGORIES_LIST_PREFIX, null, { context }));
};

export const getGroupDetails = (groupID, params) => (dispatch, getState) =>
  dispatch(
    createFetch(GROUPS_DETAILS_PREFIX, null, {
      ...params,
      groupID,
      context: getContext(getState, endpoints.getGroup),
    })
  );

export const createObjectGroup = group => (dispatch, getState) =>
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_CREATE_OBJECT_GROUP`,
    group,
    context: getContext(getState, endpoints.createGroup),
  });

export const createObjectGroupSuccess = group => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      `Group "${group.groupName}" successfully created.`
    ),
    'success'
  );
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_CREATE_OBJECT_GROUP_SUCCESS`,
    group,
  });
};

export const addGroupMember = (groupID, user) => (dispatch, getState) =>
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER`,
    groupID,
    user,
    context: getContext(getState, endpoints.addMembersToGroup),
  });

export const addGroupMemberSuccess = (groupID, user) => dispatch => {
  let users = Array.isArray(user) ? user : [user];
  users = users.map(u => ({
    ...u,
    userName: u.userName.split(' | ')[0],
  }));
  dispatch(
    GlobalSnackBarActions.show(
      `User${users.length > 1 ? 's' : ''} "${users
        .map(u => u.userName)
        .join(', ')}" successfully added to the group.`
    ),
    'success'
  );
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER_SUCCESS`,
    groupID,
    user: users,
  });
};

export const removeGroupMembers = (groupID, users) => (dispatch, getState) =>
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS`,
    groupID,
    users,
    context: getContext(getState, endpoints.removeMembersFromGroup),
  });

export const removeGroupMembersSuccess = (groupID, users) => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      `Successfully removed ${users.length} ${
        users.length === 1 ? 'user' : 'users'
      } from the group.`
    ),
    'success'
  );
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS_SUCCESS`,
    groupID,
    users,
  });
};

export const replaceUsers = (groupId, values) => (dispatch, getState) =>
  dispatch({
    type: AT.REPLACE_USERS,
    groupId,
    values,
    context: getContext(getState, endpoints.replaceMembers),
  });

export function replaceUsersSuccess() {
  return {
    type: AT.REPLACE_USERS_SUCCESS,
  };
}

export const deleteGroup = group => (dispatch, getState) =>
  dispatch({
    type: `${GROUPS_LIST_PREFIX}_DELETE_GROUP`,
    group,
    context: getContext(getState, endpoints.deleteGroup),
  });

export const deleteGroupSuccess = group => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      `Successfully deleted group with name ${group.groupName}.`
    ),
    'success'
  );

  dispatch({
    type: `${GROUPS_LIST_PREFIX}_DELETE_GROUP_SUCCESS`,
    group,
  });
};

export const handleActionFailed = err => {
  const msg = get(err, 'response.data.error.invalid[0].msg');
  if (msg) set(err, 'response.data.error.msg', msg);
  return nonCriticalHTTPError(err);
};
