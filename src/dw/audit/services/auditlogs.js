import axios from 'dw/core/axios';
import { API_BASE_URL } from 'dw/config';

/* Audit Logs */
export const getAuditLogs = params =>
  axios.get(`${API_BASE_URL}/auditlog/`, {
    params,
  });
