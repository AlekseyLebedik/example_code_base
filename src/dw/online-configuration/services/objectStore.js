import axios from 'dw/core/axios';
import { parse } from 'lossless-json';
import { createApiUrl } from './helpers';
// import { API_BASE_URL } from 'dw/config';
const RESOURCE = 'object-store';
const OBJECT_GROUPS_RESOURCE = 'groups-service';

function reviver(_, value) {
  if (value && value.isLosslessNumber) return value.value.toString();
  return value;
}

/* PUBLISHER OBJECTS */

export const getPublisherObjects = params =>
  axios.get(`${createApiUrl(RESOURCE)}publisher/objects/`, {
    params,
    transformResponse: data => parse(data, reviver),
  });

export const putPublisherObject = (data, params) =>
  axios.put(`${createApiUrl(RESOURCE)}publisher/objects/`, data, { params });

export const getPublisherObject = (name, groupID, params, aclValue) =>
  axios.get(`${createApiUrl(RESOURCE)}publisher/objects/${name}/`, {
    params: {
      ...params,
      groupID,
      aclValue,
    },
  });

export const deletePublisherObjectIW = (name, groupID, params) =>
  axios.delete(`${createApiUrl(RESOURCE)}publisher/objects/${name}/`, {
    params: {
      ...params,
      groupID,
    },
  });

export const deletePublisherObject = (name, params) =>
  axios.delete(`${createApiUrl(RESOURCE)}publisher/objects/${name}/`, {
    params,
  });

export const getPublisherCategories = params =>
  axios.get(`${createApiUrl(RESOURCE)}categories/`, { params });

export const getPublisherGroups = params =>
  axios.get(`${createApiUrl('groups-service')}groups/`, {
    params,
    transformResponse: data => parse(data, reviver),
  });

export const promotePublisherGroups = (name, groupID, params) =>
  axios.post(
    `${createApiUrl(RESOURCE)}publisher/object-overrides/${name}/promote/`,
    null,
    {
      params: {
        ...params,
        groupID,
      },
    }
  );

export const propagatePublisherObjects = (env, data, params) => {
  const [titleID, envType] = env.split(':');
  return axios.post(
    `${createApiUrl(RESOURCE, titleID, envType)}publisher/objects/propagate/`,
    data,
    { params }
  );
};

// mock for the groups
// export { getPublisherGroups } from './mock/objectStore';

export const postPublisherCategory = (data, params) =>
  axios.post(`${createApiUrl(RESOURCE)}categories/`, data, { params });

/* USER OBJECTS */

export const getUserObjects = (userId, params) =>
  axios.get(`${createApiUrl(RESOURCE)}users/${userId}/objects/`, { params });

export const putUserObject = (userId, data, context) =>
  axios.put(`${createApiUrl(RESOURCE)}users/${userId}/objects/`, data, {
    params: { context },
  });

export const getUserObject = ({ userId, name, context }) =>
  axios.get(`${createApiUrl(RESOURCE)}users/${userId}/objects/${name}/`, {
    params: { context },
  });

export const getUserObjectBackup = ({ userId, name, objectVersion, context }) =>
  axios.get(
    `${createApiUrl(
      RESOURCE
    )}backups/users/${userId}/objects/${name}/${objectVersion}/`,
    {
      params: { context },
    }
  );

export const userObjectRestoreBackup = ({
  userId,
  name,
  objectVersion,
  context,
}) =>
  axios.post(
    `${createApiUrl(RESOURCE)}backups/users/${userId}/objects/${name}/restore/`,
    { objectVersion },
    {
      params: { context },
    }
  );

// DDL Translation

export const ddlToJson = ({ userId, name, objectVersion, context }) =>
  axios.get(
    `${createApiUrl(RESOURCE)}users/${userId}/objects/${name}/ddltojson/`,
    {
      params: { object_version: objectVersion, context },
      transformResponse: data => parse(data, reviver),
    }
  );

// mock object stats
// export { getObjectStats } from './mock/objectStore';

export const getObjectStats = ({ category, statistic, minRank, maxRank }) =>
  axios.get(`${createApiUrl(RESOURCE)}users/statistics-range/`, {
    params: { category, statistic, min_rank: minRank, max_rank: maxRank },
  });

export const updateObjectStats = ({
  category,
  statistic,
  owner,
  name,
  number,
}) => {
  axios.post(`${createApiUrl(RESOURCE)}users/statistic-update/`, {
    category,
    statistic,
    owner,
    name,
    number,
  });
};

export const deleteUserObject = (userId, name, context) =>
  axios.delete(`${createApiUrl(RESOURCE)}users/${userId}/objects/${name}/`, {
    params: { context },
  });

export const cloneUserObject = (userId, data, params) =>
  axios.post(
    `${createApiUrl(RESOURCE)}users/${userId}/storage-objects/clone/`,
    data,
    { params }
  );

/* POOLED OBJECTS */

export const getPooledObjects = (userId, params) =>
  axios.get(`${createApiUrl(RESOURCE)}users/${userId}/pooled-objects/`, {
    params,
  });

export const downloadPooledObject = ({ userId, name, context }) =>
  axios.get(
    `${createApiUrl(RESOURCE)}users/${userId}/pooled-objects/${name}/`,
    {
      params: { context },
    }
  );

export const deletePooledObject = (userId, name, context) =>
  axios.delete(
    `${createApiUrl(RESOURCE)}users/${userId}/pooled-objects/${name}/`,
    {
      params: { context },
    }
  );

export const searchPooledObjects = (data, params) =>
  axios.post(`${createApiUrl(RESOURCE)}users/pooled-objects/search/`, data, {
    params,
  });

export const getPooledObjectsTags = params =>
  axios.get(`${createApiUrl(RESOURCE)}users/pooled-objects/tags/`, {
    params,
  });

/* OBJECT GROUPS */

// export { getObjectGroups } from './mock/objectStore';

export const getObjectGroups = ({ titleId, envType, ...params }) =>
  axios.get(
    `${createApiUrl(OBJECT_GROUPS_RESOURCE, titleId, envType)}groups/`,
    { params }
  );

export const createObjectGroup = (data, context) =>
  axios.post(`${createApiUrl(OBJECT_GROUPS_RESOURCE)}groups/`, data, {
    params: { context },
  });

export const getGroupDetails = ({ groupID, context }) =>
  axios.get(`${createApiUrl(OBJECT_GROUPS_RESOURCE)}groups/${groupID}/`, {
    params: { expand: 'members', context },
  });

export const addGroupMember = (id, data, context) =>
  axios.post(
    `${createApiUrl(OBJECT_GROUPS_RESOURCE)}groups/${id}/members/`,
    data,
    { params: { context } }
  );

export const removeGroupMembers = (id, data, context) =>
  axios.delete(`${createApiUrl(OBJECT_GROUPS_RESOURCE)}groups/${id}/members/`, {
    data,
    params: { context },
  });

export const replaceUsersGroup = (id, fromCsv, context) =>
  axios.put(
    `${createApiUrl(OBJECT_GROUPS_RESOURCE)}groups/${id}/members/`,
    {
      fromCsv,
    },
    { params: { context } }
  );

export const deleteGroup = (groupId, context) =>
  axios.delete(`${createApiUrl(OBJECT_GROUPS_RESOURCE)}groups/`, {
    data: { groupId },
    params: { context },
  });
