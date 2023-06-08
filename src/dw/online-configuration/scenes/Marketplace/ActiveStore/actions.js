import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import * as AT from './actionTypes';

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const fetchActiveStore = () => (dispatch, getState) =>
  dispatch({
    type: AT.ACTIVE_STORE_FETCH,
    context: getContext(getState, ServiceEndpoints.Marketplace.getDefaultStore),
  });

export function fetchActiveStoreSuccess(activeStore, storeDetails) {
  return {
    type: AT.ACTIVE_STORE_FETCH_SUCCESS,
    activeStore,
    storeDetails,
  };
}

export function fetchActiveStoreFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
