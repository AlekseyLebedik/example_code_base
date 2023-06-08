import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from './actionTypes';

export const fetchConnectionLogs = (params, append = false) => ({
  type: AT.CONNECTION_LOGS_FETCH,
  params,
  append,
});

export const fetchConnectionLogsSuccess = (payload, append) => ({
  type: AT.CONNECTION_LOGS_FETCH_SUCCESS,
  payload,
  append,
});

export const fetchConnectionLogsFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));
