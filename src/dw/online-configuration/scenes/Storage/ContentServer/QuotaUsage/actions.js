import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchQuotaUsage(params, append = false) {
  return {
    type: AT.STORAGE_QUOTA_USAGE_FETCH,
    params,
    append,
  };
}

export function fetchQuotaUsageSuccess(payload, append) {
  return {
    type: AT.STORAGE_QUOTA_USAGE_FETCH_SUCCESS,
    entries: payload.data,
    nextPageToken: payload.nextPageToken,
    elementsOrder: payload.columns,
    q: payload.q,
    append,
  };
}

export function fetchQuotaUsageFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () => fetchQuotaUsage(params, append))
    );
  };
}

export const quotaUsageListItemClick = listItem => ({
  type: AT.STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK,
  listItem,
});

export function openAddModal() {
  return {
    type: AT.STORAGE_QUOTA_USAGE_ADD_MODAL_OPEN,
  };
}

export function closeAddModal() {
  return {
    type: AT.STORAGE_QUOTA_USAGE_ADD_MODAL_CLOSE,
  };
}

export function addQuotaUsage(values) {
  return {
    type: AT.STORAGE_QUOTA_USAGE_ADD,
    values,
  };
}

export function addQuotaUsageSuccess(data) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_QUOTA_USAGE_ADD_SUCCESS,
      listItem: data.item,
    });
    dispatch({
      type: AT.STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK,
      listItem: data.item,
    });
  };
}

export function addQuotaUsageFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
