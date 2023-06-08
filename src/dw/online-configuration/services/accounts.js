import { API_BASE_URL } from 'dw/config';

import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'accounts';

// export { getAccounts } from './mock/accounts';

export const getAccounts = (params, cancelToken) => {
  const { context, ...newParams } = params;
  let url;
  if (context !== undefined) {
    const [titleID, environment] = context.split(':');
    url = createApiUrl(RESOURCE, titleID, environment);
  } else {
    url = createApiUrl(RESOURCE);
  }
  return axios.get(url, { params: newParams, cancelToken });
};

export const getUserDetails = userID =>
  axios.get(`${createApiUrl(RESOURCE)}${userID}/`);

export const getUserTeams = userID =>
  axios.get(`${createApiUrl(RESOURCE)}${userID}/teams/`);

export const getUserFriends = (userID, params) =>
  axios.get(`${createApiUrl(RESOURCE)}${userID}/friends/`, { params });

export const getUserKeys = userID =>
  axios.get(`${createApiUrl(RESOURCE)}${userID}/keys/`);

export const addUserKey = (userID, values) => {
  const data = { ...values, isDedicated: !!values.isDedicated };
  return axios.post(`${createApiUrl(RESOURCE)}${userID}/keys/`, data);
};

export const getUserFiles = (userID, params) =>
  axios.get(`${createApiUrl(RESOURCE)}${userID}/files/`, {
    params,
  });

export const uploadUserFile = (userID, values) => {
  const data = {
    ...values,
    isPrivate: !!values.isPrivate,
    fileData: values.fileData.base64,
    fileName: !values.fileName ? values.fileData.file.name : values.fileName,
  };
  return axios.post(`${createApiUrl(RESOURCE)}${userID}/files/`, data);
};

export const deleteUserFile = (userID, fileID) =>
  axios.delete(`${createApiUrl(RESOURCE)}${userID}/files/${fileID}/`);

export const downloadUserFileURL = (userID, fileID) =>
  `${API_BASE_URL}${createApiUrl(RESOURCE)}${userID}/files/${fileID}/`;

export const getExportAccountsURL = type =>
  `${API_BASE_URL}${createApiUrl(RESOURCE)}?alt=${type}`;

export const downloadUserFile = (userID, fileID) =>
  axios.get(downloadUserFileURL(userID, fileID));

export const exportAccounts = type => axios.get(getExportAccountsURL(type));

export const changeUserProfile = (userID, profileType, values) =>
  axios.put(`${createApiUrl(RESOURCE)}${userID}/`, {
    [profileType]: JSON.stringify(values),
  });

export const deleteUserProfile = userID =>
  axios.delete(`${createApiUrl(RESOURCE)}${userID}/`);

export const changeReputation = (userID, score) =>
  axios.put(`${createApiUrl(RESOURCE)}${userID}/reputation/`, { score });
