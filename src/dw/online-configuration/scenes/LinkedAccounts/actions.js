import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import {
  ACCOUNTS_LOOKUP_PREFIX,
  ACCOUNT_DETAILS_PREFIX,
  ACCOUNTS_BANS_PREFIX,
} from './constants';

export const accountsLookup = (params = {}) =>
  createFetch(ACCOUNTS_LOOKUP_PREFIX, null, params, params.nextPage);

export const accountsLookupSuccess = (payload, append) => ({
  type: `${ACCOUNTS_LOOKUP_PREFIX}_FETCH_SUCCESS`,
  data: payload.data,
  next: payload.next,
  q: payload.q,
  provider: payload.provider,
  append,
});

export const fetchAccountDetails = ({ account, params = {} }) =>
  createFetch(ACCOUNT_DETAILS_PREFIX, account.accountID, params);

export const fetchAccountDetailsSuccess = (accountID, data) => ({
  type: `${ACCOUNT_DETAILS_PREFIX}_FETCH_SUCCESS`,
  data: { data, accountID },
});

export const fetchAccountDetailsFailed = (accountID, error) => dispatch => {
  dispatch({
    type: `${ACCOUNT_DETAILS_PREFIX}_FETCH_FAILED`,
    data: { accountID },
  });
  dispatch(nonCriticalHTTPError(error));
};

export const accountDetailsUpdate = action =>
  createUpdate(ACCOUNT_DETAILS_PREFIX, action.urlID, action.params);

export const fetchAccountsBans = accounts =>
  createFetch(ACCOUNTS_BANS_PREFIX, null, accounts);
