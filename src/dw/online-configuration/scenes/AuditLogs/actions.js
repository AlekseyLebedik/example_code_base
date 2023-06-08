import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { AUDIT_LOGS_PREFIX } from './constants';

export const fetchAuditLogs = (params, append) =>
  createFetch(AUDIT_LOGS_PREFIX, null, params, append);
