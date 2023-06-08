import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'imps';

export function getIMPs(params) {
  return axios.get(`${createApiUrl(RESOURCE)}`, { params });
}

export function getIMPContent(id) {
  return axios.get(`${createApiUrl(RESOURCE)}${id}/content/`);
}

export function uploadToIMPHistory(values) {
  const data = {
    xmlFile: values.fileData.base64,
  };
  return axios.post(`${createApiUrl(RESOURCE)}`, data);
}
