import download from 'downloadjs';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { tabChange } from './components/AccountDetails/components/Tabs/actions';
import { TAB_KEYS } from './components/AccountDetails/components/Tabs/constants';

import * as AT from './actionTypes';

export const accountsListItemClick = account => ({
  type: AT.ACCOUNTS_LIST_ITEM_ONCLICK,
  account,
});

export function fetchAccounts(params, append = false) {
  return {
    type: AT.ACCOUNTS_FETCH,
    params,
    append,
  };
}

export function fetchAccountsSuccess(payload, append) {
  return dispatch => {
    const accounts = payload.data;
    dispatch({
      type: AT.ACCOUNTS_FETCH_SUCCESS,
      accounts,
      nextPageToken: payload.nextPageToken,
      q: payload.q,
      append,
    });
    if (accounts.length === 1) {
      dispatch(tabChange(TAB_KEYS.USER_DETAILS));
      dispatch(accountsListItemClick(accounts[0]));
    }
  };
}

export function fetchAccountsFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () => fetchAccounts(params, append))
    );
  };
}

export function exportAccounts(fileType) {
  return {
    type: AT.ACCOUNTS_EXPORT,
    fileType,
  };
}

export function exportAccountsSuccess(data) {
  return () => {
    download(data.fileData, data.fileName);
  };
}

export function exportAccountsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
