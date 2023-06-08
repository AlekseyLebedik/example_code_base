import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'games';

export const getOnlineGames = (context, params) => {
  const resourceURL = context ? `${RESOURCE}/${context}` : `${RESOURCE}`;
  return axios.get(createApiUrl(resourceURL), { params });
};
