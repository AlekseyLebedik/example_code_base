import axios from 'dw/core/axios';
import qs from 'qs';

export const fetchTitleEnvironment = env => axios.get(`/envs/${env.id}/`);

export const getEnvsAccess = params =>
  axios.get('envs/access/', {
    params,
    paramsSerializer: p => qs.stringify(p, { arrayFormat: 'repeat' }),
  });
