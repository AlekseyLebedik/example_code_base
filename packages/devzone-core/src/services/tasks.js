import axios from '../axios';

const BASE_URL = 'playpants/tasks';

export function fetchTasksList(params) {
  return axios.get(`${BASE_URL}/`, { params });
}
