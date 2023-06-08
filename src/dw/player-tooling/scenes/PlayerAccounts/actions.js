import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { ACCOUNTS_PII_PREFIX, ACCOUNTS_2FA_PREFIX } from './constants';

export const fetchPIIDetails = (accountID, params = {}) =>
  createFetch(ACCOUNTS_PII_PREFIX, accountID, params);

export const fetchPIIDetailsSuccess = data => ({
  type: `${ACCOUNTS_PII_PREFIX}_FETCH_SUCCESS`,
  data,
});

export const fetchPIIDetailsFailed = error => dispatch => {
  dispatch({ type: `${ACCOUNTS_PII_PREFIX}_FETCH_FAILED` });
  dispatch(nonCriticalHTTPError(error));
};

export const fetch2FADetails = (accountID, params = {}) =>
  createFetch(ACCOUNTS_2FA_PREFIX, accountID, params);

export const fetch2FADetailsSuccess = data => ({
  type: `${ACCOUNTS_2FA_PREFIX}_FETCH_SUCCESS`,
  data,
});

export const fetch2FADetailsFailed = () => dispatch => {
  dispatch({ type: `${ACCOUNTS_2FA_PREFIX}_FETCH_FAILED` });
};
