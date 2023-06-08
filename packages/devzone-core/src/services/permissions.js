import { API_BASE_URL } from '../config';
import axios from '../axios';

export const getContentTypePermissions = id =>
  axios.get(`${API_BASE_URL}/ctypes/${id}/permissions/`);

export const getCompanies = next =>
  axios.get(!next ? `${API_BASE_URL}/companies/?enabled=true` : next);

export const getCompanyGroups = () =>
  axios.get(`${API_BASE_URL}/company-groups/`);

export const getCompanyObjectPermission = (ctypeId, objectId) =>
  axios.get(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/company-permissions/`
  );

export const getCompanyGroupObjectPermissions = (ctypeId, objectId) =>
  axios.get(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/group-permissions/`
  );

export const getUserObjectPermissions = (ctypeId, objectId) =>
  axios.get(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/user-permissions/`
  );

export const addCompanyObjectPermissions = (ctypeId, objectId, permissions) =>
  axios.post(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/company-permissions/`,
    { permissions }
  );

export const addCompanyGroupObjectPermissions = (
  ctypeId,
  objectId,
  permissions
) =>
  axios.post(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/group-permissions/`,
    { permissions }
  );

export const addUserObjectPermissions = (ctypeId, objectId, permissions) =>
  axios.post(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/user-permissions/`,
    { permissions }
  );

export const deleteCompanyGroupObjectPermissions = (
  ctypeId,
  objectId,
  permissions
) =>
  axios.delete(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/group-permissions/`,
    { data: { permissions } }
  );

export const deleteUserObjectPermissions = (ctypeId, objectId, permissions) =>
  axios.delete(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/user-permissions/`,
    { data: { permissions } }
  );

export const deleteCompanyObjectPermissions = (
  ctypeId,
  objectId,
  permissions
) =>
  axios.delete(
    `${API_BASE_URL}/ctypes/${ctypeId}/objects/${objectId}/company-permissions/`,
    { data: { permissions } }
  );

// export { getRelatedPermissions } from './mock/relatedPermissions';
export const getRelatedPermissions = (id, contentTypeId) =>
  axios.get(
    `${API_BASE_URL}/ctypes/${contentTypeId}/objects/${id}/related-objects-permissions/`
  );
