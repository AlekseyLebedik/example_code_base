import axios from 'dw/core/axios';

export const getContentTypes = () => axios.get('ctypes/');

// export { getContentTypes } from './mock/permissions';

export const getContentTypeDetail = (url, params) =>
  axios.get(url, { params: { ...params, enabled: true } });

// export { getContentTypeDetail } from './mock/permissions';

export const getPermissionsByContentType = contentTypeId =>
  axios.get(`ctypes/${contentTypeId}/permissions/`);

// export { getPermissionsByContentType } from './mock/permissions';

export const getObjectPermissionsById = (id, resourceType, params) =>
  axios.get(`${resourceType}/${id}/object-permissions/`, { params });

// export { getObjectPermissionsById } from './mock/permissions';

export const editObjectPermissions = (id, data, resourceType) =>
  axios.put(`${resourceType}/${id}/object-permissions/`, data);

export const getGroupUsers = ({ groupId, ...params }) =>
  axios.get(`company-groups/${groupId}/users/`, { params });

export const getAvailableGroupUsers = params => axios.get(`users/`, { params });

export const getAvailableNextGroupUsers = url => axios.get(url);

export const editGroupUsers = (groupId, data) =>
  axios.put(`company-groups/${groupId}/users/`, data);

export const fetchGroups = ({ nextPage, ...params }) =>
  axios.get(nextPage || 'company-groups/', { params });

// export { fetchGroups } from './mock/permissions';

export const createCompanyGroup = (companyId, name) =>
  axios.post('company-groups/', { company: companyId, name });

export const getCompaniesList = params =>
  axios.get('companies/', { params: { ...params, enabled: true } });

export const cloneCompanyGroup = groupId =>
  axios.post(`company-groups/${groupId}/`);

export const renameCompanyGroup = (groupId, newName) =>
  axios.put(`company-groups/${groupId}/`, { newName });

export const deleteCompanyGroup = groupId =>
  axios.delete(`company-groups/${groupId}/`);

export const editCompanyUsers = (companyId, data) =>
  axios.put(`companies/${companyId}/users/`, data);
