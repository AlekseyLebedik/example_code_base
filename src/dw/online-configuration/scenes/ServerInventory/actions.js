import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchServersAllocation() {
  return {
    type: AT.SERVERS_ALLOC_FETCH,
  };
}

export function fetchServersAllocationSuccess(data) {
  return {
    type: AT.SERVERS_ALLOC_FETCH_SUCCESS,
    data,
  };
}

export function fetchServersAllocationFailed(err) {
  return dispatch => {
    dispatch({ type: AT.SERVERS_ALLOC_FETCH_FAILED });
    dispatch(CriticalErrorActions.show(err, () => fetchServersAllocation()));
  };
}
