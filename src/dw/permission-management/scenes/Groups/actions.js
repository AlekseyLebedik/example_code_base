import get from 'lodash/get';
import set from 'lodash/set';

import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import {
  createEditObjectPermissions,
  createFetchObjectPermissions,
} from '../actionCreators';

import {
  GROUPS_LIST_PREFIX,
  CONTENT_TYPES_PREFIX,
  CONTENT_TYPES_DETAILS_PREFIX,
  DELETE_PERMISSION_GROUP,
  OBJECT_PERMISSIONS_PREFIX,
  GROUP_USERS_LIST_PREFIX,
  GROUP_USERS_PREFIX,
} from './constants';

export const createGroup = group => ({
  type: `${GROUPS_LIST_PREFIX}_CREATE_GROUP`,
  group,
});
export const createGroupSuccess = group => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      `Group "${group.groupName}" successfully created.`
    ),
    'success'
  );
  dispatch({
    type: `${GROUPS_LIST_PREFIX}_CREATE_GROUP_SUCCESS`,
    group,
  });
};

export const createGroupFailed = err => {
  const msg = get(err, 'response.data.error.invalid[0].msg');
  if (msg) set(err, 'response.data.error.msg', msg);
  return nonCriticalHTTPError(err);
};

export const fetchGroups = (params = {}) =>
  createFetch(GROUPS_LIST_PREFIX, null, params, params.nextPage);

export const fetchContentTypes = () => createFetch(CONTENT_TYPES_PREFIX);

export const fetchObjectPermissions = createFetchObjectPermissions(
  OBJECT_PERMISSIONS_PREFIX
);

export const editObjectPermissions = createEditObjectPermissions(
  OBJECT_PERMISSIONS_PREFIX
);

export const fetchGroupUsers = (params = {}) => ({
  type: `${GROUP_USERS_LIST_PREFIX}_FETCH`,
  params,
});

export const fetchGroupUsersSuccess = data => ({
  type: `${GROUP_USERS_LIST_PREFIX}_FETCH_SUCCESS`,
  data,
});

export const fetchGroupUsersFailed = data => ({
  type: `${GROUP_USERS_LIST_PREFIX}_FETCH_FAILED`,
  data,
});

export const deletePermissionGroup = group => ({
  type: `${DELETE_PERMISSION_GROUP}`,
  group,
});

export const editGroupUsers = (groupId, data) => ({
  type: `${GROUP_USERS_PREFIX}_PUT`,
  groupId,
  data,
});

export const editGroupUsersFailed = error => dispatch => {
  dispatch(nonCriticalHTTPError(error));
};

export const fetchContentTypesDetails = (contentTypes, companyIds) => ({
  type: CONTENT_TYPES_DETAILS_PREFIX,
  contentTypes,
  companyIds,
});
