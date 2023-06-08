import download from 'downloadjs';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';

export function fetchServerLogs(filters, nextPageToken, params) {
  return dispatch => {
    dispatch({
      type: AT.SERVER_LOGS_FETCH,
      filters,
      nextPageToken,
      params,
    });
  };
}

export function fetchServerLogsFailed(err, params) {
  const serviceUnavailableErr = 'Error:ServerError:ServiceUnavailableError';

  return dispatch => {
    dispatch(GlobalProgressActions.done());
    if (err.response.data.error.name === serviceUnavailableErr) {
      dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'info'));
    } else if (err.response.status === 400) {
      dispatch(
        GlobalSnackBarActions.show(err.response.data.error.msg, 'error')
      );
    } else {
      dispatch(CriticalErrorActions.show(err, () => fetchServerLogs(params)));
    }
  };
}

export function fetchDetails(params, append = false) {
  return {
    type: AT.SERVER_LOGS_FETCH_DETAILS,
    params,
    append,
  };
}

export function fetchDetailsSuccess(payload, append, transId) {
  return {
    type: AT.SERVER_LOGS_FETCH_DETAILS_SUCCESS,
    logs: payload.data,
    nextPageToken: payload.nextPageToken,
    append,
    transId,
  };
}

export function fetchServerLogsExpanded(params, msgId) {
  return {
    type: AT.SERVER_LOGS_EXPANDED_FETCH,
    params,
    msgId,
  };
}

export function fetchServerLogsExpandedSuccess(payload, msgId) {
  return {
    type: AT.SERVER_LOGS_EXPANDED_FETCH_SUCCESS,
    logs: payload,
    msgId,
  };
}

export function exportServerLogs(fileType, query) {
  return {
    type: AT.SERVER_LOGS_EXPORT,
    fileType,
    query,
  };
}

export function exportServerLogsSuccess(data) {
  return dispatch => {
    download(data.fileData, data.fileName);
    dispatch({ type: AT.SERVER_LOGS_EXPORT_SUCCESS });
  };
}

export function exportServerLogsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
    dispatch({ type: AT.SERVER_LOGS_EXPORT_FAILED });
  };
}
