import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'security';

/* ACL */

/* LEADERBOARD RANGES */

export const getLeaderboardRanges = params =>
  axios.get(`${createApiUrl(RESOURCE)}acl/leaderboard-ranges/`, { params });

export const addLeaderboardRange = values =>
  axios.post(`${createApiUrl(RESOURCE)}acl/leaderboard-ranges/`, values);

export const deleteLeaderboardRange = rangeId =>
  axios.delete(`${createApiUrl(RESOURCE)}acl/leaderboard-ranges/${rangeId}/`);

/* TASK RULES */

export const getTaskRules = params =>
  axios.get(`${createApiUrl(RESOURCE)}acl/task-rules/`, { params });

export const getServiceAndTaskInfo = params =>
  axios.get(`${createApiUrl(RESOURCE)}acl/service-info/`, { params });

export const addTaskRule = params =>
  axios.post(`${createApiUrl(RESOURCE)}acl/task-rules/`, params);

export const deleteTaskRule = taskId =>
  axios.delete(`${createApiUrl(RESOURCE)}acl/task-rules/${taskId}/`);

/* STORAGE FILENAMES */

export const getStorageFilenames = params =>
  axios.get(`${createApiUrl(RESOURCE)}acl/storage-filenames/`, { params });

export const addStorageFilename = values =>
  axios.post(`${createApiUrl(RESOURCE)}acl/storage-filenames/`, values);

export const deleteStorageFilename = filenameId =>
  axios.delete(`${createApiUrl(RESOURCE)}acl/storage-filenames/${filenameId}/`);

/* REVISION HISTORY */

export const getRevisions = () =>
  axios.get(`${createApiUrl(RESOURCE)}acl/revisions/`);

export const revertRevision = revisionId =>
  axios.post(`${createApiUrl(RESOURCE)}acl/revisions/${revisionId}/`);

/* ANTICHEAT */

export const getMonitoringGroups = () =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/monitoring-groups/`);

/* Challenges */

export const getChallenges = params =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/challenges/`, { params });

export const addChallenge = values =>
  axios.post(`${createApiUrl(RESOURCE)}anticheat/challenges/`, values);

export const editChallenge = ({ id, ...values }) => {
  const data = {
    ...values,
    recipientGroups: values.recipientGroups.join(','),
    gameModes: values.gameModes
      .split(',')
      .filter(v => v.trim())
      .join(','),
  };
  return axios.put(
    `${createApiUrl(RESOURCE)}anticheat/challenges/${id}/`,
    data
  );
};

/* ChallengeGenerators */

export const getChallengeGenerators = () =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/challenge-generators/`);

export const addChallengeGenerator = values =>
  axios.post(
    `${createApiUrl(RESOURCE)}anticheat/challenge-generators/`,
    values
  );

export const updateChallengeGenerator = ({ generatorId, state }) =>
  axios.put(
    `${createApiUrl(RESOURCE)}anticheat/challenge-generators/${generatorId}/`,
    { state }
  );

export const deleteChallengeGenerator = id =>
  axios.delete(
    `${createApiUrl(RESOURCE)}anticheat/challenge-generators/${id}/`
  );

/* Functions */

export const getFunctions = params =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/functions/`, { params });

export const addFunction = values =>
  axios.post(`${createApiUrl(RESOURCE)}anticheat/functions/`, values);

export const deleteFunction = functionId =>
  axios.delete(`${createApiUrl(RESOURCE)}anticheat/functions/${functionId}/`);

/* Challenge Generation Logs */

const searchParamsSelector = q => {
  if (!q) return {};
  const searchParams = {};
  if (q.default) {
    if (q.q) {
      searchParams.eventId = q.q;
    }
  } else {
    Object.assign(searchParams, q.values);
  }
  return searchParams;
};

export const getChallengeGenerationLogs = ({ q, ...params }) => {
  const newParams = {
    ...params,
    ...searchParamsSelector(q),
  };
  return axios.get(
    `${createApiUrl(RESOURCE)}anticheat/challenge-generators-logs/`,
    {
      params: newParams,
    }
  );
};

/* Monitored Users */

export const getMonitoredUsers = () =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/monitored-users/`);

export const addMonitoredUser = values => {
  const data = {
    ...values,
    userId: values.userId.value ? values.userId.value : values.userId,
  };
  return axios.post(
    `${createApiUrl(RESOURCE)}anticheat/monitored-users/`,
    data
  );
};

export const deleteMonitoredUser = userId =>
  axios.delete(`${createApiUrl(RESOURCE)}anticheat/monitored-users/${userId}/`);

/* Anticheat Statistics */

export const getAnticheatStatisticsByDate = params =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/statistics-date/`, { params });

export const getAnticheatStatisticsByChallenge = params =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/statistics-challenge/`, {
    params,
  });

export const getAnticheatStatisticsByUser = params =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/statistics-user/`, { params });

/* IP Control */

export const getIPControl = params =>
  axios.get(`${createApiUrl(RESOURCE)}whitelist/ips/`, { params });

export const addIPControl = params =>
  axios.post(`${createApiUrl(RESOURCE)}whitelist/ips/`, params);

export const propagateIPControl = params =>
  axios.post(`${createApiUrl(RESOURCE)}whitelist/ips/propagate/`, params);

export const deleteIPControl = ips =>
  axios.delete(`${createApiUrl(RESOURCE)}whitelist/ips/?ips=${ips}`);

export const getIPNotes = params =>
  axios.get(`${createApiUrl(RESOURCE)}whitelist/ip-notes/`, { params });

export const addIPNote = params =>
  axios.post(`${createApiUrl(RESOURCE)}whitelist/ip-notes/`, params);

export const updateIPNote = params =>
  axios.put(`${createApiUrl(RESOURCE)}whitelist/ip-notes/`, params);

export const deleteIPNote = params =>
  axios.delete(`${createApiUrl(RESOURCE)}whitelist/ip-notes/`, { params });

export const getIPGroups = params =>
  axios.get(`${createApiUrl(RESOURCE)}whitelist/ip-groups/`, { params });

export const addIPGroup = params =>
  axios.post(`${createApiUrl(RESOURCE)}whitelist/ip-groups/`, params);

export const updateIPGroup = ({ id, data }) =>
  axios.put(`${createApiUrl(RESOURCE)}whitelist/ip-groups/${id}`, data);

export const deleteIPGroup = params =>
  axios.delete(`${createApiUrl(RESOURCE)}whitelist/ip-groups/`, { params });

/* Whitelist Control - by User ID */
export const getWhitelistedUsers = params =>
  axios.get(`${createApiUrl(RESOURCE)}whitelist/users/`, { params });

export const addWhitelistedUsers = data =>
  axios.post(`${createApiUrl(RESOURCE)}whitelist/users/`, data);

export const updateWhitelistedUsers = ({ id, data }) =>
  axios.put(`${createApiUrl(RESOURCE)}whitelist/users/${id}`, data);

export const deleteWhitelistedUsers = ids =>
  axios.delete(`${createApiUrl(RESOURCE)}whitelist/users/?ids=${ids}`);

/* Client Connection Logs */

export const getConnectionLogsByTime = params =>
  axios.get(`${createApiUrl(RESOURCE)}whitelist/connection-logs/`, { params });

// export { getConnectionLogsByUser } from './mock/security';
export const getConnectionLogsByUser = ({ userID, ...params }) =>
  axios.get(`${createApiUrl('accounts')}${userID}/connection-logs/`, {
    params,
  });

/* Challange Logs */

export const getChallengeLogs = params =>
  axios.get(`${createApiUrl(RESOURCE)}anticheat/challenge-logs/`, { params });
