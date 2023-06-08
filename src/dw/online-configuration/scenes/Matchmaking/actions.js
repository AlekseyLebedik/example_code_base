import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';

export function fetchItems(params = {}, append = false) {
  return {
    type: AT.FETCH,
    params,
    append,
  };
}

export function fetchItemsSuccess(data, append) {
  return {
    type: AT.FETCH_SUCCESS,
    data,
    append,
  };
}

export function fetchItemsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err, true));
    dispatch({ type: AT.FETCH_FAILED });
  };
}

export function fetchDetails(id) {
  return {
    type: AT.FETCH_DETAILS,
    id,
  };
}

export function fetchDetailsSuccess(data) {
  return {
    type: AT.FETCH_DETAILS_SUCCESS,
    data,
  };
}

export function fetchDetailsFailed() {
  return dispatch => {
    dispatch({ type: AT.FETCH_DETAILS_FAILED });
  };
}

export function activateRuleset(id) {
  return {
    type: AT.ACTIVATE,
    id,
  };
}

export function activateSuccess(id) {
  return dispatch => {
    dispatch(
      GlobalSnackBarActions.show(
        `The ruleset "${id}" has been successfully activated`,
        'success'
      )
    );
    dispatch({ type: AT.ACTIVATE_SUCCESS, id });
  };
}

export function activateFailed(id, err) {
  return GlobalSnackBarActions.show(
    `Cannot activate ruleset "${id}": ${err}`,
    'error'
  );
}

export function uploadRuleset(values, callback, reject) {
  return {
    type: AT.UPLOAD_RULESET,
    values,
    callback,
    reject,
  };
}

export function uploadRulesetSuccess(payload, callback) {
  callback(payload.id);
  return {
    type: AT.FETCH_SUCCESS,
    data: { data: [payload] },
    append: true,
    detailsReload: true,
  };
}

export function uploadRulesetFailed(err) {
  return GlobalSnackBarActions.show(`Cannot upload ruleset: ${err}`, 'error');
}

export const listItemClick = item => ({
  type: AT.LIST_ITEM_ONCLICK,
  item,
});
