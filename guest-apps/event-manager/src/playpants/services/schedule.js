import axios from 'dw/core/axios';
import { browserFileDownloader, createApiUrl, getSyncScheme } from './helpers';

const RESOURCE = 'playpants';

export const createEvent = ({ data }) =>
  axios.post(`${RESOURCE}/events/`, data);

export const fetchEvents = ({ nextPage, ...params }) =>
  axios.get(nextPage || `${RESOURCE}/events/`, { params }).then(getSyncScheme);

export const fetchRepeatEvents = ({ nextPage, ...params }) =>
  axios
    .get(nextPage || `${RESOURCE}/events-repeat/`, { params })
    .then(getSyncScheme);

export const exportEvents = params =>
  browserFileDownloader(
    `${RESOURCE}/events/`,
    'events_filtered_data.csv',
    params
  );

export const fetchTests = params => {
  const { envType, project, title, url, ...newParams } = params;
  return axios
    .get(url, { params: newParams })
    .then(response => {
      const updatedData = response.data.data.map(result => ({
        ...result,
        environment: envType,
        projectID: project,
        titleID: title,
      }));
      response.data.data = updatedData;
      return response;
    })
    .catch(error => error);
};

// Expy tests

export const fetchExpyTests = params => {
  const { url } = params;
  return axios
    .get(url)
    .then(response => response)
    .catch(error => error);
};

// External Events

export const fetchExternalEvents = params =>
  axios.get(`${RESOURCE}/external-events/`, { params });

// Demonware Events

export const fetchCriticalEvents = params =>
  axios.get('/critical-events/', { params });

export const fetchMaintenanceEvents = params =>
  axios.get('/maintenance/', { params });

export const fetchMaintenanceDetails = id => axios.get(`/maintenance/${id}/`);

export const fetchGeneralComments = (titleId, envType, params) =>
  axios.get(createApiUrl('general-comments', titleId, envType), { params });

export const fetchIncidents = (titleId, envType, params) =>
  axios.get(createApiUrl('incidents', titleId, envType), { params });
