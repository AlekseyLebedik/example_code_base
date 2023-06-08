import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import {
  SOURCE_SELECT_FETCH,
  SOURCE_SELECT_FETCH_SUCCESS,
} from './actionTypes';

export const fetch = (apiCall, input) => ({
  type: SOURCE_SELECT_FETCH,
  apiCall,
  input,
});

export const fetchSuccess = payload => ({
  type: SOURCE_SELECT_FETCH_SUCCESS,
  data: payload.data,
});

export function fetchFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
