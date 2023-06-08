import { nonCriticalHTTPError } from './errors';

export function createFetch(actionPrefix, urlID, params, append = false) {
  return {
    type: `${actionPrefix}_FETCH`,
    urlID,
    params,
    append,
    dispatchNonCriticalError:
      params && params.hasOwnProperty('dispatchNonCriticalError')
        ? params.dispatchNonCriticalError
        : undefined,
  };
}

export function fetchSuccess(
  actionPrefix,
  payload,
  append,
  dataOrigin = 'data'
) {
  return {
    type: `${actionPrefix}_FETCH_SUCCESS`,
    data: dataOrigin === null ? payload : payload[dataOrigin],
    nextPageToken: payload.nextPageToken,
    next: payload.next,
    append,
  };
}

export function fetchFailed(
  actionPrefix,
  err,
  dispatchNonCriticalError = true,
  action
) {
  return dispatch => {
    dispatch({ type: `${actionPrefix}_FETCH_FAILED` });
    if (dispatchNonCriticalError) {
      dispatch(nonCriticalHTTPError(err));
    }
    const failCallback = action?.params?.failCallback;
    if (failCallback) failCallback();
  };
}

export function createUpdate(actionPrefix, urlID, params, append = false) {
  return {
    type: `${actionPrefix}_UPDATE`,
    urlID,
    params,
    append,
  };
}

export function updateSuccess(actionPrefix, data, append) {
  return {
    type: `${actionPrefix}_UPDATE_SUCCESS`,
    data,
    append,
  };
}

export function updateFailed(actionPrefix, error) {
  return dispatch => {
    dispatch({ type: `${actionPrefix}_UPDATE_FAILED`, error });
    dispatch(nonCriticalHTTPError(error));
  };
}
