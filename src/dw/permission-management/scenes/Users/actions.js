import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { createFetch } from '@demonware/devzone-core/helpers/actions';
import {
  USERS_LIST_PREFIX,
  AVAILABLE_GROUPS_LIST_PREFIX,
  ASSIGNED_GROUPS_LIST_PREFIX,
  CONTENT_TYPES_PREFIX,
  CONTENT_TYPES_DETAILS_PREFIX,
  OBJECT_PERMISSIONS_PREFIX,
  USER_MEMBERSHIPS_PREFIX,
} from './constants';

import * as AT from './actionTypes';

import {
  createEditObjectPermissions,
  createFetchObjectPermissions,
} from '../actionCreators';

export const fetchUsers = (params = {}) =>
  createFetch(
    USERS_LIST_PREFIX,
    null,
    { ...params, sort: 'name' },
    params.nextPage
  );

export const fetchAssignedGroups = (params = {}) =>
  createFetch(ASSIGNED_GROUPS_LIST_PREFIX, null, params, params.nextPageToken);

export const fetchAvailableGroups = (params = {}, append) =>
  createFetch(AVAILABLE_GROUPS_LIST_PREFIX, null, params, append);

export const fetchMemberships = (params = {}) =>
  createFetch(USER_MEMBERSHIPS_PREFIX, null, params, params.nextPageToken);

export const saveUserCompaniesAndGroups = (userID, params) => ({
  type: AT.SAVE_USER_COMPANIES_AND_GROUPS,
  userID,
  params,
});

export const saveUserCompaniesAndGroupsSuccess = userID => dispatch => {
  dispatch(fetchMemberships({ userID }));
  dispatch(fetchAssignedGroups({ userID }));
  dispatch(
    GlobalSnackBarActions.show(
      'Changes to User Company Memberships successfully Saved',
      'success'
    )
  );
};

export const saveUserCompaniesAndGroupsFailed = err =>
  GlobalSnackBarActions.show(err.response.data.error.msg, 'error');

export const fetchContentTypes = () => createFetch(CONTENT_TYPES_PREFIX);

export const fetchContentTypesDetails = (contentTypes, companyIds) => ({
  type: CONTENT_TYPES_DETAILS_PREFIX,
  contentTypes,
  companyIds,
});

export const fetchObjectPermissions = createFetchObjectPermissions(
  OBJECT_PERMISSIONS_PREFIX
);

export const editObjectPermissions = createEditObjectPermissions(
  OBJECT_PERMISSIONS_PREFIX
);
