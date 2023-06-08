import { API_BASE_URL } from 'dw/config';
import axios from 'dw/core/axios';

const RESOURCE = 'franchises';

export const fetchFranchises = params =>
  axios.get(`${API_BASE_URL}/${RESOURCE}/`, {
    params: { ...params, embed: 'projects' },
  });
