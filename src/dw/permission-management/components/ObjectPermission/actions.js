import * as actionTypes from './actionTypes';

export const fetchContentType = id => ({
  type: actionTypes.CONTENT_TYPE_FETCH,
  id,
});

export const fetchRelatedPermissions = (contentTypeId, id) => ({
  type: actionTypes.FETCH_RELATED_PERMISSONS,
  id,
  contentTypeId,
});
export const fetchRelatedPermissionsSuccess = data => ({
  type: actionTypes.FETCH_RELATED_PERMISSONS_SUCCESS,
  data,
});
export const fetchContentTypeSuccess = (id, data) => ({
  type: actionTypes.CONTENT_TYPE_FETCH_SUCCESS,
  id,
  data,
});

export const fetchContentTypeFail = (id, error) => ({
  type: actionTypes.CONTENT_TYPE_FETCH_FAIL,
  id,
  error,
});

export const fetchObjectPermissions = (entityType, ctypeId, objectId) => ({
  type: actionTypes.OBJECT_PERMISSIONS_FETCH,
  entityType,
  ctypeId,
  objectId,
});

export const fetchObjectPermissionsSuccess = (
  entityType,
  ctypeId,
  objectId,
  data
) => ({
  type: actionTypes.OBJECT_PERMISSIONS_FETCH_SUCCESS,
  entityType,
  ctypeId,
  objectId,
  data,
});

export const fetchObjectPermissionsFail = (
  entityType,
  ctypeId,
  objectId,
  error
) => ({
  type: actionTypes.OBJECT_PERMISSIONS_FETCH_FAIL,
  entityType,
  ctypeId,
  objectId,
  error,
});

export const fetchCompanies = () => ({
  type: actionTypes.COMPANIES_FETCH,
});

export const fetchCompaniesSuccess = (data, append = false) => ({
  type: actionTypes.COMPANIES_FETCH_SUCCESS,
  data,
  append,
});

export const fetchCompaniesFail = error => ({
  type: actionTypes.COMPANIES_FETCH_FAIL,
  error,
});

export const fetchCompanyGroups = () => ({
  type: actionTypes.COMPANY_GROUPS_FETCH,
});

export const fetchCompanyGroupsSuccess = data => ({
  type: actionTypes.COMPANY_GROUPS_FETCH_SUCCESS,
  data,
});

export const fetchCompanyGroupsFail = error => ({
  type: actionTypes.COMPANY_GROUPS_FETCH_FAIL,
  error,
});

export const grantPermissions = (
  entityType,
  ctypeId,
  objectId,
  permissions
) => ({
  type: actionTypes.GRANT_PERMISSIONS,
  entityType,
  ctypeId,
  objectId,
  permissions,
});

export const grantPermissionsSuccess = (
  entityType,
  ctypeId,
  objectId,
  permissions
) => ({
  type: actionTypes.GRANT_PERMISSIONS_SUCCESS,
  entityType,
  ctypeId,
  objectId,
  permissions,
});

export const grantPermissionsFail = (
  entityType,
  ctypeId,
  objectId,
  permissions,
  error
) => ({
  type: actionTypes.GRANT_PERMISSIONS_FAIL,
  entityType,
  ctypeId,
  objectId,
  permissions,
  error,
});

export const revokePermissions = (
  entityType,
  ctypeId,
  objectId,
  permissions
) => ({
  type: actionTypes.REVOKE_PERMISSIONS,
  entityType,
  ctypeId,
  objectId,
  permissions,
});

export const revokePermissionsSuccess = (
  entityType,
  ctypeId,
  objectId,
  permissions
) => ({
  type: actionTypes.REVOKE_PERMISSIONS_SUCCESS,
  entityType,
  ctypeId,
  objectId,
  permissions,
});

export const revokePermissionsFail = (
  entityType,
  ctypeId,
  objectId,
  permissions,
  error
) => ({
  type: actionTypes.REVOKE_PERMISSIONS_FAIL,
  entityType,
  ctypeId,
  objectId,
  permissions,
  error,
});
