import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'matchmaking/rulesets';
const SERVER_ALLOCATION_RESOURCE = 'matchmaking/servers-allocation';
const SERVER_LIST_RESOURCE = 'matchmaking/servers';

export const getRulesets = params =>
  axios.get(createApiUrl(RESOURCE), { params });

export const getRuleset = id => axios.get(`${createApiUrl(RESOURCE)}${id}/`);

export const activateRuleset = id => {
  const params = {
    status: 'active',
  };
  return axios.put(`${createApiUrl(RESOURCE)}${id}/`, params);
};

export const uploadRuleset = source => {
  const params = {
    source,
  };
  return axios.post(createApiUrl(RESOURCE), params);
};

// export { getServersAllocation } from './mock/matchmaking';
export const getServersAllocation = () =>
  axios.get(createApiUrl(SERVER_ALLOCATION_RESOURCE));

// export { getServers } from './mock/matchmaking';
export const getServers = ({
  dataCenters = [],
  buildNames = [],
  context,
  serverStates = [],
}) =>
  axios.get(createApiUrl(SERVER_LIST_RESOURCE), {
    params: {
      dataCenters: dataCenters.join(','),
      buildNames: buildNames.join(','),
      context,
      serverStates: serverStates.join(','),
    },
  });

export const getMatchDetails = ({ matchId, ...params }) =>
  axios.get(`${createApiUrl('matchmaking/match')}${matchId}/`, { params });
