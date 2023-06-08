import axios from 'dw/core/axios';
import { getSyncScheme } from './helpers';

const STORIES = 'playpants/stories';
const STORY_SCHEDULE = 'playpants/schedules';

export const fetchStory = id => axios.get(`${STORIES}/${id}/`);

export const fetchStories = ({ nextPage, ...params }) =>
  axios.get(nextPage || `${STORIES}/`, { params }).then(getSyncScheme);

export const patchStory = (id, params) =>
  axios.patch(`${STORIES}/${id}/`, params);

export const deleteStory = id => axios.delete(`${STORIES}/${id}/`);

export const createStory = data => axios.post(`${STORIES}/`, { ...data });

export const uploadSchedule = formData =>
  axios.post(`${STORY_SCHEDULE}/`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

export const fetchSchedules = params =>
  axios.get(`${STORY_SCHEDULE}/`, { params });

export function fetchStoryTasks(id, params) {
  return axios.get(`${STORIES}/${id}/tasks/`, { params });
}
