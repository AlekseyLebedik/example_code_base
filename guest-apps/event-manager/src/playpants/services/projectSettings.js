import axios from 'dw/core/axios';
import { createApiUrl, getSyncScheme } from './helpers';

const RESOURCE = 'playpants';
const GAMERTAG_GROUPS = `${RESOURCE}/gamertag-groups`;
const LINKED_ACCOUNTS = 'linked-accounts';
const PROJECT_SETTINGS = `${RESOURCE}/project-setting-group`;
const RESPONSIBILITY_GROUPS = `${RESOURCE}/responsibility-group`;
const RESPONSIBILITY_OPTIONS = `${RESOURCE}/responsibility-options`;
const SCHEMAS = `${RESOURCE}/schemas`;
const USER_GROUPS = `${RESOURCE}/user-groups`;
const USER_RESPONSIBILITIES = `${RESOURCE}/user-responsibilities`;

const getGroupResource = type =>
  type === 'responsibilities' ? USER_GROUPS : GAMERTAG_GROUPS;

export const fetchUsers = ({ nextPage, ...params }) =>
  axios.get(nextPage || 'users/', { params });

export const fetchLinkedAccounts = ({ titleId, env, ...params }) =>
  axios
    .get(createApiUrl(LINKED_ACCOUNTS, titleId, env), { params })
    .catch(error => error);

/**
 * GET groups
 * @param {number} project
 * @param {string} name
 */
export const fetchGroups = ({ nextPage, type, ...params }) =>
  axios
    .get(nextPage || `${getGroupResource(type)}/`, { params })
    .then(getSyncScheme);

/**
 * POST new group
 * @param {object} id
 *  {
 *    @param {number} project
 *    @param {string} name
 *    @param {string} description
 *  }
 */
export const createGroup = ({ type, ...payload }) =>
  axios.post(`${getGroupResource(type)}/`, payload);

/**
 * DELETE group
 * @param {object} params
 *  {
 *    @param {number} groupId
 *    @param {string} type
 *  }
 */
export const deleteGroup = (groupId, { type }) =>
  axios.delete(`${getGroupResource(type)}/${groupId}/`);

/**
 * GET group members by group id
 * @param {number} id
 */
export const fetchGroupMembers = id =>
  axios.get(`${USER_GROUPS}/${id}/members/`);

/**
 * PUT and update group members
 * @param {number} groupId
 * @param {object} data
 */
export const updateGroupMembers = (groupId, data) =>
  axios.put(`${USER_GROUPS}/${groupId}/members/`, data);

/**
 * GET gamertag group accounts by group id
 * @param {number} id
 */
export const fetchGroupAccounts = id =>
  axios.get(`${GAMERTAG_GROUPS}/${id}/player-accounts/`);

/**
 * PUT and update gamertag group accounts
 * @param {number} groupId
 * @param {object} data
 */
export const updateGroupAccounts = (groupId, data) =>
  axios.put(`${GAMERTAG_GROUPS}/${groupId}/player-accounts/`, data);

/**
 * GET gamertag groups for each accountID provided
 * @param {string} accountIds - list of accountIds 865671,4227373,2436583
 * @param {{}} params - { project: <project_id> }
 */
export const fetchAccountsGroup = (accountIds, params) =>
  axios.get(`${GAMERTAG_GROUPS}/memberships/${accountIds}`, { params });

/**
 * GET gamertag group timewarp settings by group id
 * @param {number} id
 */
export const fetchGroupTimewarpSettings = id =>
  axios.get(`${GAMERTAG_GROUPS}/${id}/timewarp-settings/`);

/**
 * PUT and update gamertag group timewarp settings
 * @param {number} groupId
 * @param {object} data
 */
export const updateGroupTimewarpSettings = (groupId, data) =>
  axios.patch(`${GAMERTAG_GROUPS}/${groupId}/timewarp-settings/`, data);

/**
 * GET responsibility options
 */
export const fetchResponsibilityOptions = params =>
  axios.get(`${RESPONSIBILITY_OPTIONS}/`, { params });

/**
 * GET responsibility groups
 */
export const fetchResponsibilityGroups = params =>
  axios.get(`${RESPONSIBILITY_GROUPS}/`, { params });

/**
 * POST responsibility groups
 */
export const createResponsibilityGroups = ({
  env_type: envType,
  group,
  option_type: optionType,
  project,
  user,
}) =>
  axios.post(`${RESPONSIBILITY_GROUPS}/`, {
    env_type: envType,
    group: parseInt(group, 10),
    option_type: optionType,
    project,
    user,
  });

/**
 * GET responsibilities by group id
 * @param {number} id
 * @param {object} params
 */
export const fetchResponsibilities = id =>
  axios.get(`${RESPONSIBILITY_GROUPS}/${id}/responsibilities/`);

/**
 * GET responsibilities for an individual user
 * Required params: project, env_type
 * @param {*} params
 */
export const fetchUserResponsibilities = params =>
  axios.get(`${USER_RESPONSIBILITIES}/`, { params });

/**
 * PUT and update responsibilities
 * @param {number} id
 * @param {object} data
 */
export const updateResponsibilities = (id, data) =>
  axios.put(`${RESPONSIBILITY_GROUPS}/${id}/responsibilities/`, data);

/**
 * GET groups by user id
 * @param {number} userID
 * @param {object} params
 */
export const fetchAssignedGroups = ({ userID, ...params }) =>
  axios.get(`${USER_GROUPS}/memberships/${userID}/`, { params });

/**
 * PUT user id into group
 * @param {number} userID
 * @param {object} groups
 */
export const addUserToGroup = (userID, groups, project) =>
  axios.put(
    `${USER_GROUPS}/memberships/${userID}/`,
    { memberships: groups.map(group => ({ id: group })) },
    { params: { project } }
  );

export const fetchProjectSettings = params =>
  axios.get(`${PROJECT_SETTINGS}/`, { params });

export const updateProjectSetting = (projectID, data) =>
  axios.patch(`${PROJECT_SETTINGS}/${projectID}/`, data);

export const fetchProjectSchema = ({ schemaID }) =>
  axios.get(`${SCHEMAS}/${schemaID}/`);
