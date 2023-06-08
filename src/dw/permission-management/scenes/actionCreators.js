import { createFetch } from '@demonware/devzone-core/helpers/actions';
import {
  COMPANIES_LIST_PREFIX,
  AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX,
  AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX,
} from './constants';

export const createFetchObjectPermissions =
  prefix =>
  (id, append = false) => ({
    type: `${prefix}_FETCH`,
    id,
    append,
  });

export const createFetchObjectPermissionsSuccess =
  prefix => (id, payload, append) => ({
    type: `${prefix}_FETCH_SUCCESS`,
    data: payload.data,
    nextPageToken: payload.nextPageToken,
    id,
    append,
  });

export const fetchObjectPermissionsFailed = (prefix, id) => ({
  type: `${prefix}_FETCH_FAILED`,
  id,
});

export const createEditObjectPermissions = prefix => (id, data) => ({
  type: `${prefix}_PUT`,
  id,
  data,
});

export const createEditObjectPermissionsSuccess = prefix => id => ({
  type: `${prefix}_PUT_SUCCESS`,
  id,
});

export const editObjectPermissionsFailed = (prefix, id) => ({
  type: `${prefix}_PUT_FAILED`,
  id,
});

export const fetchCompanies = (params = {}) =>
  createFetch(COMPANIES_LIST_PREFIX, null, params);

export const fetchAvailableCompanyGroupUsers = (params = {}) => ({
  type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX}_FETCH`,
  params,
});

export const fetchAvailableCompanyGroupUsersSuccess = data => ({
  type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX}_FETCH_SUCCESS`,
  data,
});

export const fetchAvailableCompanyGroupUsersFailed = data => ({
  type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX}_FETCH_FAILED`,
  data,
});
export const fetchAvailableCompanyGroupUsersModal = (params = {}) => ({
  type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX}_FETCH`,
  params,
  context: 'modal',
});

export const fetchAvailableCompanyGroupUsersModalSuccess = data => ({
  type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX}_FETCH_SUCCESS`,
  data,
});

export const fetchAvailableCompanyGroupUsersModalFailed = data => ({
  type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX}_FETCH_FAILED`,
  data,
});
