import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import * as AT from './actionTypes';
import {
  STORE_ITEMS_PREFIX,
  PLAYER_ITEMS_PREFIX,
  STORE_PRODUCTS_PREFIX,
  STORE_BALANCES_PREFIX,
} from './constants';

const { Marketplace: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const getCurrencies = () => (dispatch, getState) => {
  const context = getContext(getState, endpoints.getLabelledStore);
  return dispatch(createFetch(STORE_BALANCES_PREFIX, null, { context }));
};

export const getStoreItems = () => (dispatch, getState) => {
  const context = getContext(getState, endpoints.getLabelledStore);
  return dispatch(createFetch(STORE_ITEMS_PREFIX, null, { context }));
};

export const getPlayerItems =
  (playerId, isClan = false) =>
  (dispatch, getState) => {
    const context = isClan
      ? getContext(getState, endpoints.getClanItems)
      : getContext(getState, endpoints.getPlayerItems);
    return dispatch(
      createFetch(PLAYER_ITEMS_PREFIX, null, { playerId, context, isClan })
    );
  };

export const getStoreProducts = () => (dispatch, getState) => {
  const context = getContext(getState, endpoints.getLabelledStore);
  return dispatch(createFetch(STORE_PRODUCTS_PREFIX, null, { context }));
};

export const selectItems = prefix => value => ({
  type: `${prefix}_${AT.SELECT_ITEMS}`,
  value,
});

export const postAssetChanges =
  (form, playerId, data, sideEffect = null, isClan = false) =>
  (dispatch, getState) => {
    const context = isClan
      ? getContext(getState, endpoints.postClanAssetChanges)
      : getContext(getState, endpoints.postPlayerAssetChanges);
    return dispatch({
      type: AT.ASSET_CHANGE_POST,
      form,
      playerId,
      data,
      params: { context, isClan },
      sideEffect,
    });
  };

export function postAssetChangesSuccess(
  form,
  playerId,
  data,
  request,
  isClan = false
) {
  return {
    type: AT.ASSET_CHANGE_POST_SUCCESS,
    form,
    playerId,
    data,
    request,
    isClan,
  };
}

export function postAssetChangesFailed(form, playerId, error) {
  return { type: AT.ASSET_CHANGE_POST_FAILED, form, playerId, error };
}

export function setActiveStore(store) {
  return { type: AT.ACTIVE_STORE, store };
}

export function setActiveStoreDetails(details) {
  return { type: AT.ACTIVE_STORE_DETAILS, details };
}
