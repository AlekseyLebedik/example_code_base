import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

export const getTasksList = params =>
  axios.get(createApiUrl(`tasks`), {
    params: { ...params, sort: '-created_at' },
  });

export const getTaskDetails = (taskId, params) =>
  axios.get(createApiUrl(`tasks/${taskId}/`), { params });
