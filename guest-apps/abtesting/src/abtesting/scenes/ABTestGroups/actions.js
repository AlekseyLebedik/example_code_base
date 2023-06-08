import get from 'lodash/get';
import set from 'lodash/set';

import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { createFetch } from '@demonware/devzone-core/helpers/actions';

import {
  GROUPS_LIST_PREFIX,
  GROUPS_DETAILS_PREFIX,
  GROUPS_DETAILS_TESTS_PREFIX,
  GROUPS_DETAILS_CONFIGS_PREFIX,
  GROUPS_SERVICE,
} from './constants';

export const fetchGroups = params =>
  createFetch(GROUPS_LIST_PREFIX, null, {
    ...params,
    service: GROUPS_SERVICE,
    bypassContextValidation: 1,
  });

export const getGroupDetails = (groupID, context) =>
  createFetch(GROUPS_DETAILS_PREFIX, null, {
    groupID,
    context,
    service: GROUPS_SERVICE,
    bypassContextValidation: 1,
  });

export const fetchTests = context =>
  createFetch(GROUPS_DETAILS_TESTS_PREFIX, null, { context });

export const fetchConfigs = context =>
  createFetch(GROUPS_DETAILS_CONFIGS_PREFIX, null, { context });

export const createGroup = (group, context) => ({
  type: `${GROUPS_DETAILS_PREFIX}_CREATE_GROUP`,
  group,
  context,
  service: GROUPS_SERVICE,
  bypassContextValidation: 1,
});

export const createGroupSuccess = group => ({
  type: `${GROUPS_DETAILS_PREFIX}_CREATE_OBJECT_GROUP_SUCCESS`,
  group,
});

export const addGroupMember = (groupID, user, context) => ({
  type: `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER`,
  groupID,
  user,
  context,
  service: GROUPS_SERVICE,
  bypassContextValidation: 1,
});

export const addGroupMemberSuccess = (groupID, user) => ({
  type: `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER_SUCCESS`,
  groupID,
  user: Array.isArray(user) ? user : [user],
});

export const removeGroupMembers = (groupID, users, context) => ({
  type: `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS`,
  groupID,
  users,
  context,
  service: GROUPS_SERVICE,
  bypassContextValidation: 1,
});

export const removeGroupMembersSuccess = (groupID, users) => ({
  type: `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS_SUCCESS`,
  groupID,
  users,
});

export const replaceUsers = (groupId, values, context) => ({
  type: `${GROUPS_DETAILS_PREFIX}_REPLACE_USERS`,
  groupId,
  values,
  context,
  service: GROUPS_SERVICE,
  bypassContextValidation: 1,
});

export const replaceUsersSuccess = () => dispatch => {
  dispatch(GlobalSnackBarActions.show(`Users were replaced.`, 'success'));
  dispatch({
    type: `${GROUPS_DETAILS_PREFIX}_REPLACE_USERS_SUCCESS`,
  });
};

export const deleteGroup = (group, context) => ({
  type: `${GROUPS_LIST_PREFIX}_DELETE_GROUP`,
  group,
  context,
  service: GROUPS_SERVICE,
  bypassContextValidation: 1,
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
