import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchCalls(params, append = false) {
  return {
    type: AT.CALLS_FETCH,
    params,
    append,
  };
}

export const callsListItemClick = call => ({
  type: AT.CALLS_LIST_ITEM_ONCLICK,
  call,
});

export function fetchCallsSuccess(payload, append) {
  return dispatch => {
    const calls = payload.data;
    dispatch({
      type: AT.CALLS_FETCH_SUCCESS,
      calls,
      nextPageToken: payload.nextPageToken,
      q: payload.q,
      append,
    });
    if (calls.length === 1) {
      dispatch(callsListItemClick(calls[0]));
    }
  };
}

export function fetchCallsFailed(err, params, append) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchCalls(params, append)));
  };
}

export const setFilterParams = q => ({
  type: AT.CALLS_SET_FILTER_PARAMS,
  q,
});
