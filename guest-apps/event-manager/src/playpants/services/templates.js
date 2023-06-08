import axios from 'dw/core/axios';
import { getSyncScheme } from './helpers';

const TEMPLATES = 'playpants/templates';

export const fetchTemplates = ({ nextPage, ...params }) =>
  axios.get(nextPage || `${TEMPLATES}/`, { params }).then(getSyncScheme);

export const createTemplates = data => axios.post(`${TEMPLATES}/`, { ...data });

export const fetchTemplateById = id => axios.get(`${TEMPLATES}/${id}`);

export const deleteTemplate = id => axios.delete(`${TEMPLATES}/${id}/`);

export const patchTemplate = (id, params) =>
  axios.patch(`${TEMPLATES}/${id}/`, params);
