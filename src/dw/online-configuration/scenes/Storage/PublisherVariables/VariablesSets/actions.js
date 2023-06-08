import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { currentEnvSelector } from 'dw/core/helpers/title-env-selectors';
import * as AT from './actionTypes';

const normalizeForListView = item => ({
  ...item,
  groupId: item.groupId.toString(),
  variableSetId: [item.namespace, item.groupId, item.context].join(','),
});

export function fetchVariablesSets(params, append = false) {
  return {
    type: AT.STORAGE_VARIABLES_SETS_FETCH,
    params,
    append,
  };
}

export function fetchVariablesSetsSuccess(payload, append) {
  return {
    type: AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS,
    entries: payload.data.map(normalizeForListView),
    nextPageToken: payload.nextPageToken,
    q: payload.q,
    append,
  };
}

export function fetchVariablesSetsFailed(err, params, append) {
  return dispatch => {
    if (err.response && err.response.status === 404) {
      dispatch(nonCriticalHTTPError(err, true));
    } else {
      dispatch(
        CriticalErrorActions.show(err, () => fetchVariablesSets(params, append))
      );
    }
    dispatch({ type: AT.STORAGE_VARIABLES_SETS_FETCH_FAILED, err });
  };
}

export const variablesSetsListItemClick = item => dispatch => {
  dispatch({
    type: AT.STORAGE_VARIABLES_SETS_LIST_ITEM_ONCLICK,
    listItem: item,
  });
  dispatch({
    type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS,
    variableSetId: item.variableSetId,
  });
};

export function openAddModal() {
  return {
    type: AT.STORAGE_VARIABLES_SETS_OPEN_ADD_MODAL,
  };
}

export function closeAddModal() {
  return {
    type: AT.STORAGE_VARIABLES_SETS_CLOSE_ADD_MODAL,
  };
}

const normalizeVariables = ({ variables, ...values }) => ({
  ...values,
  variables: variables
    .filter(({ key, value }) => key || value)
    .map(({ key = '', value = '' }) => ({ key, value })),
});

export function addVariablesSets(values, resolve, reject) {
  return {
    type: AT.STORAGE_VARIABLES_SETS_ADD,
    values: normalizeVariables(values),
    resolve,
    reject,
  };
}

export function addVariablesSetSuccess(data) {
  const { namespace, context, groupId, confirmed } = data;
  const listItem = normalizeForListView({
    namespace,
    context,
    groupId,
  });
  return dispatch => {
    dispatch({
      type: AT.STORAGE_VARIABLES_SETS_ADD_SUCCESS,
      listItem,
    });
    dispatch(closeAddModal());
    dispatch(variablesSetsListItemClick(listItem));
    dispatch(
      GlobalSnackBarActions.show(
        confirmed
          ? `The Variables Set with identifier ${listItem.variableSetId} successfully overrided with a new one.`
          : `The new Variables Set with identifier ${listItem.variableSetId} successfully added.`,
        'success'
      )
    );
  };
}

export function addVariablesSetFailed(err) {
  return dispatch => dispatch(nonCriticalHTTPError(err, true));
}

export function deleteVariablesSet(variableSetId) {
  return {
    type: AT.STORAGE_VARIABLES_SET_DELETE,
    variableSetId,
  };
}

export function deleteVariablesSetSuccess(variableSetId) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_VARIABLES_SET_DELETE_SUCCESS,
      variableSetId,
    });
    dispatch(
      GlobalSnackBarActions.show(
        `The Variables Set with identifier ${variableSetId} was successfully deleted.`,
        'success'
      )
    );
  };
}

export function deleteVariablesSetFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function fetchVariablesSetDetailsSuccess(variableSetId, payload) {
  return {
    type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS,
    data: payload.data,
    variableMapping: payload.variableMapping,
    variableSetId,
  };
}

export function fetchVariablesSetDetailsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function updateVariablesSet(variableSetId, variableSet) {
  return {
    type: AT.STORAGE_VARIABLES_SET_UPDATE,
    variableSetId,
    variableSet: normalizeVariables(variableSet),
  };
}

export function updateVariablesSetSuccess(variableSetId) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS,
      variableSetId,
    });
    dispatch(
      GlobalSnackBarActions.show(
        `Changes to the Variables Set with identifier ${variableSetId} was successfully saved.`,
        'success'
      )
    );
  };
}

export function updateVariablesSetFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function propagateVariablesSet(values, resolve, reject) {
  const { variables, ...restValues } = values;
  const newVariables = Object.entries(variables).map(variable => ({
    key: variable[0],
    value: variable[1],
  }));
  return {
    type: AT.STORAGE_VARIABLES_SET_PROPAGATE,
    values: {
      ...restValues,
      variables: newVariables,
    },
    resolve,
    reject,
  };
}

export function propagateVariablesSetSuccess(data) {
  const { namespace, context, groupId, confirmed, environment } = data;
  const listItem = normalizeForListView({
    namespace,
    context,
    groupId,
  });
  return (dispatch, getState) => {
    const { title, shortType } = currentEnvSelector(getState());
    if (`${title}:${shortType}` === environment.key && !confirmed) {
      dispatch({
        type: AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS,
        entries: [listItem],
        append: true,
      });
    }
    dispatch(ModalHandlers.close());
    dispatch(
      GlobalSnackBarActions.show(
        confirmed
          ? `The Variables Set with identifier ${listItem.variableSetId} successfully overrided with a new one.`
          : `The new Variables Set with identifier ${listItem.variableSetId} successfully propagated to ${environment.label}.`,
        'success'
      )
    );
  };
}
