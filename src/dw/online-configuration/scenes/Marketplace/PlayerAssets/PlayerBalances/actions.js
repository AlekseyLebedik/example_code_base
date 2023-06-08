import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { selectItems } from '../actions';
import { PLAYER_BALANCES_PREFIX } from '../constants';

const { Marketplace: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const getPlayerBalances =
  (playerId, isClan = false) =>
  (dispatch, getState) => {
    const context = isClan
      ? getContext(getState, endpoints.getClanBalances)
      : getContext(getState, endpoints.getPlayerBalances);
    return dispatch(
      createFetch(PLAYER_BALANCES_PREFIX, '', { playerId, context, isClan })
    );
  };

export const selectStoreCurrencies = selectItems(PLAYER_BALANCES_PREFIX);
