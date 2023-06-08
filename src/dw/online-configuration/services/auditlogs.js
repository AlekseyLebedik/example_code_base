import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

/* Audit Logs */
export const getAuditLogs = params =>
  axios.get(`${createApiUrl()}auditlog/`, {
    params: {
      ...params.query,
      nextPageToken: params.nextPageToken,
    },
  });
/* Audit Logs Mock */
// export { getAuditLogs } from './mock/auditlogs';
