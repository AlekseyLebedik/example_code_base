import axios from 'dw/core/axios';
import qs from 'qs';

export const getEnvsAccess = params =>
  axios.get('envs/access/', {
    params,
    paramsSerializer: p => qs.stringify(p, { arrayFormat: 'repeat' }),
  });
