import { AUDIT_LOGS_FETCH } from './constants';

export const fetchAuditLogs = params => ({
  type: AUDIT_LOGS_FETCH,
  params,
});
