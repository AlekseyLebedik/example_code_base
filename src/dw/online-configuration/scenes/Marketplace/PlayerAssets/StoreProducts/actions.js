import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { selectItems } from '../actions';
import { STORE_PRODUCTS_PREFIX } from '../constants';

import * as AT from './actionTypes';

export const selectStoreProducts = selectItems(STORE_PRODUCTS_PREFIX);

const { Marketplace: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const postGrantProducts =
  (playerId, data, isClan = false) =>
  (dispatch, getState) => {
    const context = isClan
      ? getContext(getState, endpoints.postClanProduct)
      : getContext(getState, endpoints.postPlayerProduct);
    return dispatch({
      type: AT.GRANT_PRODUCTS_POST,
      playerId,
      data,
      params: { context, isClan },
    });
  };

export function postGrantProductsSuccess(playerId, data, isClan = false) {
  return { type: AT.GRANT_PRODUCTS_POST_SUCCESS, playerId, data, isClan };
}

export function postGrantProductsFailed(playerId, error) {
  return { type: AT.GRANT_PRODUCTS_POST_FAILED, playerId, error };
}
