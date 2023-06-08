import axios from 'dw/core/axios';
import { API_BASE_URL } from 'dw/config';

/* Accounts Audit Logs */
export const startQuery = params =>
  axios.post(`${API_BASE_URL}/account-audit-log/start-query/`, {
    params,
  });

export const getQuery = queryId =>
  axios.get(`${API_BASE_URL}/account-audit-log/query-state/${queryId}/`);
