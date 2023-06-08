import axios from 'axios';

import {
  API_BASE_URL,
  REQUEST_TIMEOUT,
  AUTH_CLIENT,
  DEFAULT_AUTH_CLIENT,
} from './config';
import { redirectToAuthProvider, getOAuthToken } from './auth/utils';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
});

function addAuthorizationHeader(config) {
  const newConfig = { ...config };

  const tokenObject = getOAuthToken();
  if (tokenObject) {
    newConfig.headers.Authorization = tokenObject.accessToken;
  }

  // We don't need to add the client params if it's the default one
  if (AUTH_CLIENT !== DEFAULT_AUTH_CLIENT) {
    // If the request doesn't contain params, it is set to undefined
    if (!newConfig.params) {
      newConfig.params = {};
    }
    newConfig.params.client = AUTH_CLIENT;
  }

  return newConfig;
}

instance.interceptors.request.use(
  config => addAuthorizationHeader(config),
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log('Request canceled:', error.message);
      return null;
    }
    if (error?.response?.status === 401) {
      return redirectToAuthProvider();
    }
    return Promise.reject(error);
  }
);

export default instance;
