import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

export function fetch(actionPrefix, urlID, params, append = false) {
  return typeof actionPrefix === 'string'
    ? {
        type: `${actionPrefix}_FETCH`,
        urlID,
        params,
        append,
      }
    : actionPrefix.fetchAction(urlID, params, append);
}

export function fetchSuccess(actionPrefix, payload, append, dataOrigin) {
  return {
    type: `${actionPrefix}_FETCH_SUCCESS`,
    collection: payload[dataOrigin],
    nextPageToken: payload.nextPageToken,
    next: payload.next, // just to work with the old API calls
    append,
  };
}

export function fetchFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
