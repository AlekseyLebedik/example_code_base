import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'leaderboards';

export const getLeaderboards = params =>
  axios.get(createApiUrl(RESOURCE), { params });

export const getLeaderboardData = (leaderboardID, params) =>
  axios.get(`${createApiUrl(RESOURCE)}${leaderboardID}/entities/`, {
    params,
  });

export const resetLeaderboards = (leaderboardIds, leaderboardNames) =>
  axios.delete(createApiUrl(RESOURCE), {
    data: {
      leaderboardIds,
      leaderboardNames,
    },
  });

export const getLeaderboardsStatus = leaderboardIds =>
  axios.get(`${createApiUrl(RESOURCE)}status/`, {
    params: { ids: leaderboardIds.join() },
  });

export const deleteLeaderboardEntities = (leaderboardId, entityIds) =>
  axios.delete(`${createApiUrl(RESOURCE)}${leaderboardId}/entities/`, {
    data: {
      leaderboardId,
      entityIds,
    },
  });

export const resetLeaderboard = leaderboardId =>
  axios.delete(`${createApiUrl(RESOURCE)}${leaderboardId}/`);
