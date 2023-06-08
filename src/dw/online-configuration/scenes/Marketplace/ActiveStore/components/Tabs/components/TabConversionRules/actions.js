import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import * as AT from './actionTypes';

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const fetchConversionRules = () => (dispatch, getState) =>
  dispatch({
    type: AT.ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH,
    context: getContext(
      getState,
      ServiceEndpoints.Marketplace.getLabelledStore
    ),
  });

export function fetchConversionRulesSuccess(payload) {
  return dispatch => {
    dispatch({
      type: AT.ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH_SUCCESS,
      conversionRules: payload.data,
    });
  };
}

export function fetchConversionRulesFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
