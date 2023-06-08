import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import {
  CONTENT_TYPES_PREFIX,
  OBJECT_PERMISSIONS_PREFIX,
  CONTENT_TYPES_DETAILS_PREFIX,
  COMPANY_USERS_PREFIX,
} from './constants';

import {
  createEditObjectPermissions,
  createFetchObjectPermissions,
} from '../actionCreators';

export const fetchContentTypes = () => createFetch(CONTENT_TYPES_PREFIX);

export const fetchObjectPermissions = createFetchObjectPermissions(
  OBJECT_PERMISSIONS_PREFIX
);

export const editObjectPermissions = createEditObjectPermissions(
  OBJECT_PERMISSIONS_PREFIX
);

export const fetchContentTypesDetails = (contentTypes, companyIds) => ({
  type: CONTENT_TYPES_DETAILS_PREFIX,
  contentTypes,
  companyIds,
});

export const editCompanyUsers = (companyId, data) => ({
  type: `${COMPANY_USERS_PREFIX}_PUT`,
  companyId,
  data,
});

export const editCompanyUsersFailed = error => dispatch => {
  dispatch(nonCriticalHTTPError(error));
};
