import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import * as AT from './actionTypes';
import { selectedRuleset } from './selectors';

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.AE,
    endpoint,
  });

export const fetchRulesets =
  (params = {}, append = false) =>
  (dispatch, getState) =>
    dispatch({
      type: AT.RULESETS_FETCH,
      params: {
        ...params,
        context: getContext(getState, ServiceEndpoints.AE.getRulesets),
      },
      append,
    });

export const fetchActiveRuleset =
  (params = {}) =>
  (dispatch, getState) =>
    dispatch({
      type: AT.ACTIVE_RULESETS_FETCH,
      params: {
        ...params,
        context: getContext(getState, ServiceEndpoints.AE.getRulesets),
      },
    });

export const fetchRulesetDetail = label => (dispatch, getState) =>
  dispatch({
    type: AT.RULESET_DETAIL_FETCH,
    label,
    context: getContext(getState, ServiceEndpoints.AE.getRulesetsDetail),
  });

export const rulesetsListItemClick = ruleset => dispatch => {
  dispatch(fetchRulesetDetail(ruleset.label));
  dispatch({
    type: AT.RULESETS_LIST_ITEM_ONCLICK,
    ruleset,
  });
};

export function fetchRulesetsSuccess(payload, extraPayload) {
  return dispatch => {
    const rulesets = !payload.rulesets ? [payload] : payload.rulesets;
    dispatch({
      type: AT.RULESETS_FETCH_SUCCESS,
      rulesets,
      nextPageToken: payload.nextPageToken,
      q: extraPayload.q,
      append: extraPayload.append,
    });
    if (rulesets.length === 1) {
      dispatch(rulesetsListItemClick(rulesets[0]));
    }
  };
}

export function fetchRulesetsFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () => fetchRulesets(params, append))
    );
  };
}

export function fetchRulesetDetailSuccess(payload) {
  return {
    type: AT.RULESET_DETAIL_FETCH_SUCCESS,
    code: payload.code,
  };
}

export function fetchRulesetDetailFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export const uploadRuleset = values => (dispatch, getState) =>
  dispatch({
    type: AT.RULESET_UPLOAD,
    values,
    context: getContext(getState, ServiceEndpoints.AE.putRulesetsDetail),
  });

export function uploadRulesetSuccess(label) {
  return dispatch => {
    dispatch({
      type: AT.RULESET_UPLOAD_SUCCESS,
    });
    dispatch(
      GlobalSnackBarActions.show(
        `Ruleset ${label} uploaded successfully.`,
        'success'
      )
    );
    dispatch(fetchRulesets({ q: label }, false));
  };
}

export function uploadRulesetFailed(err) {
  return dispatch => {
    dispatch({
      type: AT.RULESET_UPLOAD_FAILED,
    });
    dispatch(nonCriticalHTTPError(err));
  };
}

export function openUploadRulesetModal() {
  return {
    type: AT.RULESET_OPEN_UPLOAD_MODAL,
  };
}

export function closeUploadRulesetModal() {
  return {
    type: AT.RULESET_CLOSE_UPLOAD_MODAL,
  };
}

export function propagateRuleset(values) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: AT.RULESET_PROPAGATE,
      ruleset: selectedRuleset(state),
      values,
    });
  };
}

export function propagateRulesetSuccess() {
  return dispatch => {
    dispatch({
      type: AT.RULESET_PROPAGATE_SUCCESS,
    });
    dispatch(
      GlobalSnackBarActions.show('Ruleset propagated successfully.', 'success')
    );
  };
}

export function propagateRulesetFailed(err) {
  return dispatch => {
    dispatch({
      type: AT.RULESET_PROPAGATE_FAILED,
    });
    dispatch(nonCriticalHTTPError(err));
  };
}

export function openPropagateRulesetModal() {
  return {
    type: AT.RULESET_OPEN_PROPAGATE_MODAL,
  };
}

export function closePropagateRulesetModal() {
  return {
    type: AT.RULESET_CLOSE_PROPAGATE_MODAL,
  };
}

export const deleteRuleset = (values, q) => (dispatch, getState) =>
  dispatch({
    type: AT.RULESET_DELETE,
    values,
    q,
    context: getContext(getState, ServiceEndpoints.AE.deleteRuleset),
  });

export function deleteRulesetSuccess(q, total) {
  return dispatch => {
    dispatch({ type: AT.RULESET_DELETE_SUCCESS });
    dispatch(
      GlobalSnackBarActions.show(
        total > 1
          ? `${total} rulesets were deleted successfully.`
          : `Ruleset deleted successfully.`,
        'success'
      )
    );
    dispatch(fetchRulesets(!q ? {} : { q }));
  };
}

export function deleteRulesetFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function resetSelectedRuleset() {
  return {
    type: AT.RULESETS_LIST_RESET_SELECTED_RULESET,
  };
}

export const activateRuleset = ruleset => (dispatch, getState) =>
  dispatch({
    type: AT.RULESETS_ACTIVATE,
    ruleset,
    context: getContext(getState, ServiceEndpoints.AE.putRulesetsDetail),
  });

export function activateRulesetSuccess(label) {
  return dispatch => {
    dispatch(
      GlobalSnackBarActions.show(
        `Ruleset '${label}' is now the default one.`,
        'success'
      )
    );
    dispatch(fetchRulesets());
  };
}

export function activateRulesetFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export const checkRuleset = label => (dispatch, getState) =>
  dispatch({
    type: AT.RULESET_CHECK,
    label,
    context: getContext(getState, ServiceEndpoints.AE.checkRuleset),
  });

export function openCheckRulesetModal(label, activating) {
  return dispatch => {
    dispatch({
      type: AT.RULESET_OPEN_CHECK_MODAL,
      activating,
    });
    dispatch(checkRuleset(label));
  };
}

export function closeCheckRulesetModal() {
  return {
    type: AT.RULESET_CLOSE_CHECK_MODAL,
  };
}

export function checkRulesetSuccess(payload) {
  return {
    type: AT.RULESET_CHECK_SUCCESS,
    invalidCurrencyIDs: payload.invalidCurrencyIDs,
    invalidItemIDs: payload.invalidItemIDs,
    invalidProductIDs: payload.invalidProductIDs,
  };
}

export function checkRulesetFailed() {
  return dispatch => {
    dispatch({
      type: AT.RULESET_CHECK_FAILED,
    });
    dispatch(
      GlobalSnackBarActions.show(
        'Ruleset checking failed or not supported.',
        'error'
      )
    );
  };
}
