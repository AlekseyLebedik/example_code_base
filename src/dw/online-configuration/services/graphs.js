import { LEGACY_HOST } from 'dw/config';
import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = {
  STATISTICS: 'statistics',
  generalComments: 'general-comments',
};

export const getStatistics = () => axios.get(createApiUrl(RESOURCE.STATISTICS));
export const getEvents = (eventType, params) =>
  axios.get(createApiUrl(RESOURCE[eventType] || eventType), { params });

const getGraphURL = urlParamsString => {
  const hackedParams = '&by_name=1&format=js&grouping=hour';
  return `${LEGACY_HOST}/statisticsgetdata?statistics=${urlParamsString}${hackedParams}`;
};

export const getGraph = urlParamsString =>
  axios.get(getGraphURL(urlParamsString));
