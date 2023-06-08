import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchQuotaAllowance(params, append = false) {
  return {
    type: AT.STORAGE_QUOTA_ALLOWANCE_FETCH,
    params,
    append,
  };
}

export function fetchQuotaAllowanceSuccess(payload, append) {
  return {
    type: AT.STORAGE_QUOTA_ALLOWANCE_FETCH_SUCCESS,
    entries: payload.data,
    nextPageToken: payload.nextPageToken,
    elementsOrder: payload.columns,
    q: payload.q,
    append,
  };
}

export function fetchQuotaAllowanceFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () => fetchQuotaAllowance(params, append))
    );
  };
}

export const quotaAllowanceListItemClick = listItem => ({
  type: AT.STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK,
  listItem,
});

export function openAddModal() {
  return {
    type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_OPEN,
  };
}

export function closeAddModal() {
  return {
    type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_CLOSE,
  };
}

export function addQuotaAllowance(values) {
  return {
    type: AT.STORAGE_QUOTA_ALLOWANCE_ADD,
    values,
  };
}

export function addQuotaAllowanceSuccess(data) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_SUCCESS,
      listItem: data.item,
    });
    dispatch({
      type: AT.STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK,
      listItem: data.item,
    });
  };
}

export function addQuotaAllowanceFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
