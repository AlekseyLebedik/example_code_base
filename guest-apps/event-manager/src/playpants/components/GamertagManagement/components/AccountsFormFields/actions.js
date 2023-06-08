import * as AT from './actionTypes';

export const asyncFetchLinkedAccountsList = ({ callback, ...params }) => ({
  type: AT.ASYNC_FETCH_LINKED_ACCOUNTS_LIST,
  callback,
  params,
});
export const asyncFetchLinkedAccountsListSuccess = groups => ({
  type: AT.ASYNC_FETCH_LINKED_ACCOUNTS_LIST_SUCCESS,
  groups,
});
export const asyncFetchLinkedAccountsListFailed = error => ({
  type: AT.ASYNC_FETCH_LINKED_ACCOUNTS_LIST_FAILED,
  error,
});

export const asyncFetchAccountsGroup = ({ callback, accountList }) => ({
  type: AT.ASYNC_FETCH_ACCOUNTS_GROUP,
  callback,
  accountList,
});
export const asyncFetchAccountsGroupSuccess = groups => ({
  type: AT.ASYNC_FETCH_ACCOUNTS_GROUP_SUCCESS,
  groups,
});
export const asyncFetchAccountsGroupFailed = error => ({
  type: AT.ASYNC_FETCH_ACCOUNTS_GROUP_FAILED,
  error,
});
