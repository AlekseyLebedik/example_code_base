import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';
import { getActiveRuleset } from './selectors';

export const fetchActiveRuleset = () => (dispatch, getState) => {
  const context = makeContextToUseSelector(getState(), {
    serviceName: Services.AE,
    endpoint: ServiceEndpoints.AE.getRulesets,
  });
  return dispatch({
    type: AT.ACTIVE_RULESET_FETCH,
    params: { context },
  });
};

export function fetchActiveRulesetFailed(err) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchActiveRuleset()));
  };
}

export const fetchActiveRulesetAchievements =
  (params, append = false) =>
  (dispatch, getState) => {
    const context = makeContextToUseSelector(getState(), {
      serviceName: Services.AE,
      endpoint: ServiceEndpoints.AE.getActiveRulesets,
    });
    return dispatch({
      type: AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH,
      params: { ...params, context },
      append,
    });
  };

export const fetchActiveRulesetSuccess = payload => {
  const activeRuleset = getActiveRuleset()(payload.rulesets);
  return dispatch => {
    dispatch({
      type: AT.ACTIVE_RULESET_FETCH_SUCCESS,
      activeRuleset: activeRuleset || null,
    });
    if (!activeRuleset) {
      dispatch(GlobalSnackBarActions.show('There is no Active Store.', 'info'));
    }
  };
};

export function fetchActiveRulesetAchievementsSuccess(payload, append) {
  return {
    type: AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH_SUCCESS,
    achievements: payload.achievements,
    nextPageToken: payload.nextPageToken,
    append,
  };
}

export function fetchActiveRulesetAchievementsFailed(err) {
  return dispatch => {
    dispatch({ type: AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH_FAILED });
    dispatch(nonCriticalHTTPError(err));
  };
}
