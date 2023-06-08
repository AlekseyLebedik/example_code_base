import axios from 'dw/core/axios';

export const getTitleInfoStats = baseUrl => axios.get(`${baseUrl}stats/`);

export const getTitleInfoMMP = baseUrl => axios.get(`${baseUrl}mmp/`);

export const getTitleInfoEnv = baseUrl => axios.get(baseUrl);

export const getTitleInfoCluster = baseUrl => axios.get(`${baseUrl}cluster/`);

export const getTitleInfoMarketplace = baseUrl =>
  axios.get(`${baseUrl}marketplace/`);

export const getMatchmaking = baseUrl => axios.get(`${baseUrl}matchmaking/`);

export const getTitleInfoAchievements = baseUrl =>
  axios.get(`${baseUrl}achievements-engine/`);

export const getTitleInfoObjectStore = baseUrl =>
  axios.get(`${baseUrl}storages/`);

export const getSocialService = baseUrl =>
  axios.get(`${baseUrl}social-service/`);
