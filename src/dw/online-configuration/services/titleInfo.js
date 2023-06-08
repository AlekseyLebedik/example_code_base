import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

export const getTitleInfoStats = () => axios.get(`${createApiUrl()}stats/`);

export const getTitleInfoMMP = () => axios.get(`${createApiUrl()}mmp/`);

export const getTitleInfoEnv = () => axios.get(createApiUrl());

export const getTitleInfoCluster = () => axios.get(`${createApiUrl()}cluster/`);

export const getTitleInfoMarketplace = () =>
  axios.get(`${createApiUrl()}marketplace/`);

export const getMatchmaking = () => axios.get(`${createApiUrl()}matchmaking/`);

export const getTitleInfoAchievements = () =>
  axios.get(`${createApiUrl()}achievements-engine/`);

export const getTitleInfoObjectStore = () =>
  axios.get(`${createApiUrl()}storages/`);
