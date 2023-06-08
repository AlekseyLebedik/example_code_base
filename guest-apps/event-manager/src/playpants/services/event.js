import axios from 'dw/core/axios';
import { parse } from 'lossless-json';
import { createApiUrl, browserFileDownloader } from './helpers';

function reviver(_, value) {
  if (value && value.isLosslessNumber) return value.value.toString();
  return value;
}

const RESOURCE = 'playpants/events';
const FILESTORAGE_CONTEXTS = 'storages/contexts';
const OBJECT_STORE = 'object-store';
const CATEGORIES = `${OBJECT_STORE}/categories`;
const GROUPS = 'groups-service/groups';
const CONTEXTS = 'contexts';

// ---------- Event API calls ----------- //

export function getEventById(id) {
  return axios.get(`${RESOURCE}/${id}/`);
}

export function getRepeatEventById(id, iteration) {
  return axios.get(`${RESOURCE}/${id}/repeats/${iteration}`);
}

export function editEvent(id, data) {
  return axios.patch(`${RESOURCE}/${id}/`, data);
}

export function deleteEvent(id) {
  return axios.delete(`${RESOURCE}/${id}/`);
}

export function updateAuthorizations(id, data) {
  return axios.post(`${RESOURCE}/${id}/authorizations/`, data);
}

export function createComment(id, data) {
  return axios.post(`${RESOURCE}/${id}/comments/`, data);
}

export function fetchDiscussion(id) {
  return axios.get(`${RESOURCE}/${id}/comments/`);
}

export function fetchEventTasks(id, params) {
  return axios.get(`${RESOURCE}/${id}/tasks/`, { params });
}

export function fetchLogs(id) {
  return axios.get(`${RESOURCE}/${id}/history/`);
}

export const duplicateEvent = (id, data) =>
  axios.post(`${RESOURCE}/${id}/duplicate/`, data);

export const createActivity = params =>
  axios.post(`${RESOURCE}/${params.eventId}/activities/`, params.payload);

export const revertActivity = (eventId, activityId) =>
  axios.post(`${RESOURCE}/${eventId}/activities/${activityId}/revert/`);

export const deleteSingleActivity = params =>
  axios.delete(
    `${RESOURCE}/${params.eventId}/activities/${params.activityId}/`
  );

export const updateSingleActivity = params =>
  axios.put(
    `${RESOURCE}/${params.eventId}/activities/${params.activityId}/`,
    params.payload
  );

export const fetchEventConflicts = id =>
  axios.get(`${RESOURCE}/${id}/conflicts/`);

// ------- Activities API Calls --------- //
export const fetchTitleEnvironment = envId => axios.get(`/envs/${envId}/`);

export const fetchContexts = (titleId, { env, contextType }) =>
  axios.get(createApiUrl(`${CONTEXTS}/${contextType}`, titleId, env));

// Publisher Storage (File Storage)
export const fetchFileStorageContexts = ({ titleId, env }) =>
  axios.get(createApiUrl(FILESTORAGE_CONTEXTS, titleId, env));

export const uploadFile = (data, xProgressID) =>
  axios.post(`playpants/files/?X-Progress-ID=${xProgressID}`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

export const fetchFileDetails = id => axios.get(`playpants/files/${id}/`);

// TO BE ADDED IN NEXT PR
// export const uploadProgressFetch = ({ id }) =>
// axios.get(`playpants/files/?X-Progress-ID=${id}`);
export const uploadProgressFetch = xProgressID =>
  axios.get(`playpants/files/?X-Progress-ID=${xProgressID}`);

export const downloadFile = (id, name) =>
  browserFileDownloader(`playpants/files/${id}/download/`, name);

export const removeFile = id => axios.delete(`playpants/files/${id}/`);

export const updateFile = (id, fileInfo) =>
  axios.patch(`playpants/files/${id}/`, fileInfo);

// Publisher Objects
export const fetchObjectStoreCategories = (titleId, { env, ...params }) =>
  axios.get(createApiUrl(CATEGORIES, titleId, env), { params });

export const fetchObjectStoreGroups = (titleId, { env, ...params }) =>
  axios.get(createApiUrl(GROUPS, titleId, env), {
    params,
    transformResponse: data => parse(data, reviver),
  });

export const uploadPublisherObject = formData =>
  axios.post(`playpants/files/`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

// Publisher Variables
export const getPubVars = (title, env, query) =>
  axios.get(`titles/${title}/envs/${env}/storages/variables/sets/${query}`);

export const getPubVarSetDetails = (title, env, varSetId) =>
  axios
    .get(`titles/${title}/envs/${env}/storages/variables/sets/${varSetId}/`)
    .catch(() => null);

// Achievement Engine
export const fetchRulesetList = params => {
  const { title, env, ...extraParams } = params;
  return axios.get(
    `titles/${title}/envs/${env}/achievements-engine/rulesets/`,
    { params: extraParams }
  );
};

export const fetchRuleset = params => {
  const { title, env, label, ...extraParams } = params;
  return axios.get(
    `titles/${title}/envs/${env}/achievements-engine/rulesets/${label}/`,
    { params: extraParams }
  );
};

// PyScripts
export const fetchPyScriptSchemas = projectID =>
  axios.get(`playpants/pyscripts/${projectID}/`);

// Thunderpants
const generateThunderpantsBaseUrl = ({ projectID, deployerID, view }) =>
  `thunderpants/project/${projectID}/deployer/${deployerID}/view/${view}`;

export const fetchThunderpantsBuildList = params =>
  axios.get(`${generateThunderpantsBaseUrl(params)}/build/list/`);

export const fetchThunderpantsBuildSchema = params =>
  axios.get(`${generateThunderpantsBaseUrl(params)}/build_schema/`);

export const fetchThunderpantsDeployerList = ({ projectID }) =>
  axios.get(`thunderpants/project/${projectID}/deployers/`);

export const fetchThunderpantsDeploymentList = params =>
  axios.get(`${generateThunderpantsBaseUrl(params)}/deployment/list/`);

export const fetchThunderpantsTargetList = params =>
  axios.get(`${generateThunderpantsBaseUrl(params)}/target/list/`);

export const fetchThunderpantsUserParamsSchema = params =>
  axios.get(`${generateThunderpantsBaseUrl(params)}/user_params_schema/`);

export const fetchThunderpantsViewList = ({ projectID, deployerID }) =>
  axios.get(
    `thunderpants/project/${projectID}/deployer/${deployerID}/view/list/`
  );

export const deleteThunderpantsDeployment = ({ params, uid }) =>
  axios.post(
    `${generateThunderpantsBaseUrl(params)}/deployment/${uid}/delete/`,
    {}
  );

export const checkDeploymentPassword = (params, data) => {
  const { deploymentID } = params;
  return axios.post(
    `${generateThunderpantsBaseUrl(
      params
    )}/deployment/${deploymentID}/check_password`,
    data
  );
};

export const modifyLock = (params, data) => {
  const { deploymentID } = params;
  return axios.post(
    `${generateThunderpantsBaseUrl(
      params
    )}/deployment/${deploymentID}/modify_lock`,
    data
  );
};

// Responsibilities
export const fetchUserResponsibilities = params =>
  axios.get(`playpants/user-responsibilities`, { params });
