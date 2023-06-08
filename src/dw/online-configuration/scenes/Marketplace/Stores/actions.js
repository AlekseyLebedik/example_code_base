import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import * as AT from './actionTypes';
import { selectedStore } from './selectors';

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const fetchStores =
  (params, append = false) =>
  (dispatch, getState) =>
    dispatch({
      type: AT.STORES_FETCH,
      params: {
        ...params,
        context: getContext(getState, ServiceEndpoints.Marketplace.getStores),
      },
      append,
    });

export function fetchStoresFailed(err, params, append) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchStores(params, append)));
  };
}

export const fetchStoreDetail = label => (dispatch, getState) =>
  dispatch({
    type: AT.STORE_DETAIL_FETCH,
    label,
    context: getContext(getState, ServiceEndpoints.Marketplace.getStore),
  });

export function fetchStoreDetailSuccess(payload) {
  return {
    type: AT.STORE_DETAIL_FETCH_SUCCESS,
    code: payload,
  };
}

export const storesListItemClick =
  (store, fetchDetails = true) =>
  dispatch => {
    dispatch({
      type: AT.STORES_LIST_ITEM_ONCLICK,
      store,
    });
    if (fetchDetails) {
      dispatch(fetchStoreDetail(store.label));
    }
  };

export function fetchStoresSuccess(payload, append) {
  return dispatch => {
    const stores = payload.data;
    dispatch({
      type: AT.STORES_FETCH_SUCCESS,
      stores,
      nextPageToken: payload.nextPageToken,
      q: payload.q,
      append,
    });
    if (stores.length === 1) {
      const [store] = stores;
      const { label } = store;
      dispatch(storesListItemClick({ label, code: store }, false));
    }
  };
}

export function fetchStoreDetailFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export const uploadStore =
  (values, { reject, ...params } = {}) =>
  (dispatch, getState) =>
    dispatch({
      type: AT.STORE_UPLOAD,
      values,
      reject,
      params: {
        ...params,
        context: getContext(getState, ServiceEndpoints.Marketplace.createStore),
      },
    });

export function uploadStoreSuccess(label) {
  return dispatch => {
    dispatch({
      type: AT.STORE_UPLOAD_SUCCESS,
    });
    dispatch(
      GlobalSnackBarActions.show(
        `Store ${label} uploaded successfully.`,
        'success'
      )
    );
    dispatch(fetchStores({ q: label }, false));
  };
}

export function uploadStoreFailed(err) {
  return dispatch => {
    if (err !== undefined) {
      dispatch(nonCriticalHTTPError(err));
    }
    dispatch({
      type: AT.STORE_UPLOAD_FAILED,
    });
  };
}

export function openUploadStoreModal() {
  return {
    type: AT.STORE_OPEN_UPLOAD_MODAL,
  };
}

export function closeUploadStoreModal() {
  return {
    type: AT.STORE_CLOSE_UPLOAD_MODAL,
  };
}

export function propagateStore({ context, ...values }) {
  const {
    environment: { key: tagretEnv },
  } = values;
  return (dispatch, getState) =>
    dispatch({
      type: AT.STORE_PROPAGATE,
      store: selectedStore(getState()),
      values,
      params: {
        context: context[tagretEnv],
      },
    });
}

export function propagateStoreSuccess() {
  return dispatch => {
    dispatch({
      type: AT.STORE_PROPAGATE_SUCCESS,
    });
    dispatch(
      GlobalSnackBarActions.show('Store propagated successfully.', 'success')
    );
  };
}

export function propagateStoreFailed(err) {
  return dispatch => {
    dispatch({ type: AT.STORE_PROPAGATE_FAILED });
    dispatch(nonCriticalHTTPError(err));
  };
}

export function openPropagateStoreModal() {
  return {
    type: AT.STORE_OPEN_PROPAGATE_MODAL,
  };
}

export function closePropagateStoreModal() {
  return {
    type: AT.STORE_CLOSE_PROPAGATE_MODAL,
  };
}

export function closePropagateStoreLoading() {
  return {
    type: AT.STORE_CLOSE_PROPAGATE_LOADING,
  };
}

export const setActiveStore = label => (dispatch, getState) =>
  dispatch({
    type: AT.STORE_SET_ACTIVE,
    label,
    context: getContext(getState, ServiceEndpoints.Marketplace.putDefaultStore),
  });

export function setActiveStoreSuccess(label) {
  return dispatch => {
    dispatch(
      GlobalSnackBarActions.show(
        `Store '${label}' is now the default one.`,
        'success'
      )
    );
    dispatch(fetchStores());
  };
}

export function setActiveStoreFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export const clearStoreCache = label => dispatch =>
  dispatch({
    type: AT.STORE_CLEAR_CACHE,
    label,
  });

export function clearStoreCacheSuccess(label) {
  return dispatch => {
    dispatch(
      GlobalSnackBarActions.show(
        `Cache for store '${label}' has been cleared.`,
        'success'
      )
    );
    dispatch(fetchStoreDetail(label));
  };
}

export function clearStoreCacheFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
