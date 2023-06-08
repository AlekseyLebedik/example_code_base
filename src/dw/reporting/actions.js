import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import * as AT from './actionTypes';

export const fetchFranchises = params => ({
  type: AT.REPORTING_FETCH_FRANCHISES,
  params,
});

export const fetchFranchisesSucceed = data => ({
  type: AT.REPORTING_FETCH_FRANCHISES_SUCCESS,
  data,
});

export const fetchFranchisesFail = err => dispatch => {
  dispatch({ type: AT.REPORTING_FETCH_FRANCHISES_FAILED });
  dispatch(nonCriticalHTTPError(err));
};
