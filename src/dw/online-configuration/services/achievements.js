import { parse } from 'lossless-json';
import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const BASE_RESOURCE = 'achievements-engine';
const RESOURCE = {
  ACHIEVEMENTS: `${BASE_RESOURCE}/achievements`,
  RULESETS: `${BASE_RESOURCE}/rulesets`,
  USERDATA: 'accounts',
  CLANDATA: 'clans',
};

function reviver(_, value) {
  if (value && value.isLosslessNumber) return value.value.toString();
  return value;
}

/* Check Service */
export const checkAchievementsService = params =>
  axios.get(
    createApiUrl(BASE_RESOURCE, params.title.id, params.environment.shortType)
  );

/* Active Ruleset */
export const getAchievements = params =>
  axios.get(`${createApiUrl(RESOURCE.ACHIEVEMENTS)}`, {
    params,
    transformResponse: data => parse(data, reviver),
  });

/* Rulesets */

export const getRulesets = params =>
  axios.get(createApiUrl(RESOURCE.RULESETS), { params });

export const uploadRuleset = (values, context) => {
  const data = {
    code: values.fileData.base64,
    codeSignature: null,
    isActive: false,
  };
  return axios.put(
    `${createApiUrl(RESOURCE.RULESETS, undefined, values.environment)}${
      values.label
    }/`,
    data,
    { params: { context } }
  );
};

export const getRulesetDetail = (label, params) =>
  axios.get(`${createApiUrl(RESOURCE.RULESETS)}${label}/`, { params });

export const propagateRuleset = (ruleset, values, context) => {
  let [titleId, env] = values.environment.split(':');
  if (!env) {
    env = titleId;
    titleId = undefined;
  }
  const data = {
    code: window.btoa(ruleset.code),
    codeSignature: ruleset.codeSignature,
    isActive: values.isActive === undefined ? false : values.isActive,
  };

  return axios.put(
    `${createApiUrl(RESOURCE.RULESETS, titleId, env)}${values.label}/`,
    data,
    { params: { context } }
  );
};

export const deleteRuleset = (label, context) =>
  axios.delete(`${createApiUrl(RESOURCE.RULESETS)}${label}/`, {
    params: { context },
  });

export const activateRuleset = (ruleset, context) => {
  const data = {
    code: window.btoa(ruleset.code),
    codeSignature: ruleset.codeSignature,
    isActive: true,
  };

  return axios.put(
    `${createApiUrl(RESOURCE.RULESETS)}${ruleset.label}/`,
    data,
    { params: { context } }
  );
};

export const checkRuleset = (label, params) =>
  axios.post(`${createApiUrl(RESOURCE.RULESETS)}${label}/checks/`, null, {
    params,
  });

/* User Achievements */

export const getUserAchievements = params => {
  const finalParams = {
    nextPageToken: params.nextPageToken,
    context: params.context,
    alt: params.format,
  };
  const { isClan } = params;
  return axios.get(
    isClan
      ? `${createApiUrl(RESOURCE.CLANDATA)}${params.player_id}/achievements/`
      : `${createApiUrl(RESOURCE.USERDATA)}${params.player_id}/achievements/`,
    {
      params: finalParams,
      transformResponse: data => parse(data, reviver),
    }
  );
};

export const deleteAchievements = (playerId, values, params) => {
  const { isClan, ...rest } = params;
  return axios.delete(
    isClan
      ? `${createApiUrl(RESOURCE.CLANDATA)}${playerId}/achievements/`
      : `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/`,
    {
      params: { ...rest, name: values.join(',') },
    }
  );
};

export const getUserState = ({ playerId, isClan, ...params }) =>
  axios.get(
    isClan
      ? `${createApiUrl(RESOURCE.CLANDATA)}${playerId}/achievements/state/`
      : `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/state/`,
    { params }
  );

export const putUserState = ({ playerId, data, isClan, ...params }) =>
  axios.put(
    isClan
      ? `${createApiUrl(RESOURCE.CLANDATA)}${playerId}/achievements/state/`
      : `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/state/`,
    data,
    { params }
  );

export const sendUserEvent = ({ playerId, data, isClan, ...params }) =>
  axios.post(
    isClan
      ? `${createApiUrl(RESOURCE.CLANDATA)}${playerId}/achievements/events/`
      : `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/events/`,
    data,
    {
      params,
    }
  );

export const clonePlayerAchievements = (playerId, data, params) =>
  axios.post(
    `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/clone/`,
    data,
    { params }
  );

export const getBackupPlayerAchievements = (playerId, params) =>
  axios.get(
    `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/restore/`,
    { params }
  );

export const restorePlayerAchievements = (playerId, params) =>
  axios.post(
    `${createApiUrl(RESOURCE.USERDATA)}${playerId}/achievements/restore/`,
    {},
    { params }
  );
