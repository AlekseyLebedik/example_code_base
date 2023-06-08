import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';
import * as AT from './actionTypes';

export function fetchFunctions(params) {
  return {
    type: AT.FUNCTIONS_FETCH,
    params,
  };
}

export function fetchFunctionsSuccess(payload) {
  return {
    type: AT.FUNCTIONS_FETCH_SUCCESS,
    functions: payload.data,
  };
}

export function fetchFunctionsFailed(err, action) {
  return dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function addFunction(values) {
  return dispatch => {
    dispatch({
      type: AT.FUNCTION_ADD,
      values,
    });
    dispatch(ModalHandlers.submit());
  };
}

export function addFunctionSuccess() {
  return dispatch => {
    dispatch(ModalHandlers.close());
    dispatch(
      GlobalSnackBarActions.show('Function was successfully added.', 'success')
    );
    dispatch(fetchFunctions());
  };
}

export function addFunctionFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
    dispatch({
      type: AT.FUNCTION_ADD_FAILED,
    });
    dispatch(ModalHandlers.stopSubmitting());
  };
}

export function deleteFunction(functionIds) {
  return dispatch => {
    dispatch({
      type: AT.FUNCTION_DELETE,
      functionIds,
    });
    dispatch(
      GlobalSnackBarActions.show('Functions deleted properly.', 'success')
    );
  };
}

export const deleteFunctionSuccess = functionIds => dispatch => {
  dispatch({
    type: AT.FUNCTION_DELETE_SUCCESS,
    functionIds,
  });
  dispatch(setSelectedRowKeys([]));
};

export function deleteFunctionFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
