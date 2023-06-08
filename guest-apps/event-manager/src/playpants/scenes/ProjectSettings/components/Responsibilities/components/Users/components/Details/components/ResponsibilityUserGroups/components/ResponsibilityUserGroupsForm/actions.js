import * as AT from './actionTypes';

export const asyncFetchGroupList = ({ callback, ...params }) => ({
  type: AT.ASYNC_FETCH_GROUP_LIST,
  callback,
  params,
});

export const asyncFetchGroupListSuccess = groups => ({
  type: AT.ASYNC_FETCH_GROUP_LIST_SUCCESS,
  groups,
});

export const asyncFetchGroupListFailed = error => ({
  type: AT.ASYNC_FETCH_GROUP_LIST_FAILED,
  error,
});
