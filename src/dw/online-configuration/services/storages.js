import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'storages';

/* Check Service */
export const checkStoragesService = params =>
  axios.get(
    createApiUrl(RESOURCE, params.title.id, params.environment.shortType)
  );

/* Global */

export const getStorageContexts = () =>
  axios.get(`${createApiUrl(RESOURCE)}contexts/`, {});

/* PUBLISHER STORAGE */

export const getPublisherStorage = params =>
  axios.get(`${createApiUrl(RESOURCE)}publisher/`, { params });

export const deletePublisherStorageFile = fileID =>
  axios.delete(`${createApiUrl(RESOURCE)}publisher/`, {
    params: { fileIds: fileID },
  });

export const downloadPublisherStorageFile = fileId =>
  axios.get(`${createApiUrl(RESOURCE)}publisher/${fileId}/`);

export const uploadPublisherStorageFile = values => {
  const data = {
    ...values,
    fileData: values.fileData.base64,
    fileName: !values.fileName ? values.fileData.file.name : values.fileName,
  };
  return axios.post(`${createApiUrl(RESOURCE)}publisher/`, data);
};

export const bulkDownloadPublisherStorageFiles = fileIds => {
  const params = {
    fileIds,
    download: true,
  };
  return axios.get(`${createApiUrl(RESOURCE)}publisher/`, { params });
};

/* CONTENT SERVER */

/* Pooled Files */

export const fetchPooledFiles = params =>
  axios.get(`${createApiUrl(RESOURCE)}pooled/files/`, { params });

export const uploadPooledFile = values => {
  const data = {
    ...values,
    pooledFile: values.pooledFile.base64,
    summaryFile: values.summaryFile && values.summaryFile.base64,
    fileName: !values.fileName ? values.pooledFile.file.name : values.fileName,
    userId: values.userId.value ? values.userId.value : values.userId,
  };
  return axios.post(`${createApiUrl(RESOURCE)}pooled/files/`, data);
};

export const deletePooledFile = fileId =>
  axios.delete(`${createApiUrl(RESOURCE)}pooled/files/${fileId}/`);

export const downloadPooledFile = fileId =>
  axios.get(`${createApiUrl(RESOURCE)}pooled/files/${fileId}/`);

export const deleteSummaryFile = fileId =>
  axios.delete(`${createApiUrl(RESOURCE)}pooled/files/${fileId}/summary/`);

export const downloadSummaryFile = fileId =>
  axios.get(`${createApiUrl(RESOURCE)}pooled/files/${fileId}/summary/`);

/* User Files */

export const fetchUserFiles = params =>
  axios.get(`${createApiUrl(RESOURCE)}contentserver/files/`, { params });

export const uploadUserFile = values => {
  const data = {
    ...values,
    fileData: values.fileData.base64,
    fileName: !values.fileName ? values.fileData.file.name : values.fileName,
    userId: values.userId.value ? values.userId.value : values.userId,
  };
  return axios.post(`${createApiUrl(RESOURCE)}contentserver/files/`, data);
};

export const deleteUserFile = fileId =>
  axios.delete(`${createApiUrl(RESOURCE)}contentserver/files/${fileId}/`);

export const downloadUserFile = fileId =>
  axios.get(`${createApiUrl(RESOURCE)}contentserver/files/${fileId}/`);

/* Quota Allowance */

export const fetchQuotaAllowance = params =>
  axios.get(`${createApiUrl(RESOURCE)}quota/allowance/`, { params });

export const addQuotaAllowance = values => {
  const data = {
    ...values,
    userId: values.userId.value ? values.userId.value : values.userId,
  };
  return axios.post(`${createApiUrl(RESOURCE)}quota/allowance/`, data);
};

/* Quota Usage */

export const fetchQuotaUsage = params =>
  axios.get(`${createApiUrl(RESOURCE)}quota/usage/`, { params });

export const addQuotaUsage = values => {
  const data = {
    ...values,
    userId: values.userId.value ? values.userId.value : values.userId,
  };
  return axios.post(`${createApiUrl(RESOURCE)}quota/usage/`, data);
};

/* User Context Storage */

export const getUserContextStorage = params =>
  axios.get(`${createApiUrl(RESOURCE)}user/files/`, { params });

export const deleteUserContextStorageFile = params =>
  axios.delete(`${createApiUrl(RESOURCE)}user/files/${params.fileID}/`, {
    params,
  });

export const downloadUserContextStorageFile = params =>
  axios.get(`${createApiUrl(RESOURCE)}user/files/${params.fileID}/`, {
    params,
  });

export const uploadUserContextStorageFile = values => {
  const data = {
    ...values,
    fileData: values.fileData.base64,
    fileName: !values.fileName ? values.fileData.file.name : values.fileName,
    userId: values.userId.value ? values.userId.value : values.userId,
  };
  return axios.post(`${createApiUrl(RESOURCE)}user/files/`, data);
};

/* Publisher Variables */

/* Group Members */

export const fetchMemberGroups = params =>
  axios.get(`${createApiUrl(RESOURCE)}variables/groups/`, { params });

export const addGroupMembers = values => {
  const data = {
    ...values,
    userIds: values.userIds.map(item => (item.value ? item.value : item)),
  };
  return axios.post(`${createApiUrl(RESOURCE)}variables/groups/`, data);
};

export const deleteGroupMembers = (groupId, userIds) =>
  axios({
    method: 'delete',
    url: `${createApiUrl(RESOURCE)}variables/groups/${groupId}/`,
    data: {
      userIds,
    },
  });

export const fetchGroupDetails = groupID =>
  axios.get(`${createApiUrl(RESOURCE)}variables/groups/${groupID}/`);

/* Variables Sets */

export const fetchVariablesSets = params =>
  axios.get(`${createApiUrl(RESOURCE)}variables/sets/`, { params });

export const addVariablesSets = values =>
  axios.post(`${createApiUrl(RESOURCE)}variables/sets/`, values);

export const propagateVariablesSet = ({
  environment: { key: env },
  ...values
}) => {
  const [titleID, envType] = env.split(':');
  return axios.post(
    `${createApiUrl(RESOURCE, titleID, envType)}variables/sets/`,
    values
  );
};

export const deleteVariablesSet = variableSetId =>
  axios.delete(`${createApiUrl(RESOURCE)}variables/sets/${variableSetId}/`);

export const updateVariablesSet = (variableSetId, variableSet) =>
  axios.post(
    `${createApiUrl(RESOURCE)}variables/sets/${variableSetId}/`,
    variableSet
  );

export const fetchVariablesSetDetails = variableSetId =>
  axios.get(`${createApiUrl(RESOURCE)}variables/sets/${variableSetId}/`);
