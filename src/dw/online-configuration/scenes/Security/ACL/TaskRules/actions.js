import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export const onSearch = q => ({
  type: AT.TASK_RULES_SEARCH,
  q,
});

export function fetchTaskRules(params, append = false) {
  return {
    type: AT.TASK_RULES_FETCH,
    params,
    append,
  };
}

export function fetchTaskRulesSuccess(payload, append) {
  return {
    type: AT.TASK_RULES_FETCH_SUCCESS,
    taskRules: payload.data,
    append,
  };
}

export function fetchTaskRulesFailed(err, action) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function fetchServiceAndTaskInfo() {
  return {
    type: AT.TASK_RULES_SERVICE_AND_TASK_INFO_FETCH,
  };
}

export function fetchServiceAndTaskInfoSuccess(payload) {
  return {
    type: AT.TASK_RULES_SERVICE_AND_TASK_INFO_FETCH_SUCCESS,
    serviceInfo: payload.data,
  };
}

export function fetchServiceAndTaskInfoFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export const openAddModal = () => ({
  type: AT.TASK_RULES_ADD_MODAL_OPEN,
});

export const closeAddModal = () => ({
  type: AT.TASK_RULES_ADD_MODAL_CLOSE,
});

export const addTaskRule = values => ({
  type: AT.TASK_RULES_ADD,
  values,
});

export const addTaskRuleSuccess =
  ({ taskId }, values) =>
  dispatch => {
    dispatch({
      type: AT.TASK_RULES_ADD_SUCCESS,
      taskRule: {
        id: taskId,
        ...values,
        source: 'devzone',
      },
    });
    dispatch(GlobalSnackBarActions.show('Task Rule set properly.', 'success'));
  };

export const addTaskRuleFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.TASK_RULES_ADD_FAILED,
  });
};

export const deleteTaskRule = taskId => dispatch => {
  dispatch({
    type: AT.TASK_RULES_DELETE,
    taskId,
  });
  dispatch(
    GlobalSnackBarActions.show('Task Rule deleted properly.', 'success')
  );
};

export const deleteTaskRuleSuccess = taskId => ({
  type: AT.TASK_RULES_DELETE_SUCCESS,
  taskId,
});

export const deleteTaskRuleFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
};
