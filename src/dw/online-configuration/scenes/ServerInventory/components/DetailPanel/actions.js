import * as actionTypes from './actionTypes';

export const fetchMMServerList = ({
  context,
  buildname,
  datacenter,
  state,
}) => ({
  type: actionTypes.MM_SERVER_LIST_FETCH,
  context,
  buildname,
  datacenter,
  state,
});

export const fetchMMServerListSuccess = data => ({
  type: actionTypes.MM_SERVER_LIST_FETCH_SUCCESS,
  data,
});

export const fetchMMServerListFailed = error => ({
  type: actionTypes.MM_SERVER_LIST_FETCH_FAILED,
  error,
});
