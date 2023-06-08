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

export const changeUserID = userID => ({
  type: AT.CONNECTION_LOGS_CHANGE_USER_ID,
  userID,
});

export const changeAscending = ascending => ({
  type: AT.CONNECTION_LOGS_CHANGE_ASCENDING,
  ascending,
});
