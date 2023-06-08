import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';

export const fetchLoginQueueStatus = titleId =>
  createFetch(AT.LOGIN_QUEUE_STATUS, titleId);

export const fetchLoginQueueFailed = (_, err) => dispatch => {
  dispatch(CriticalErrorActions.show(err, () => fetchLoginQueueStatus()));
};

export const fetchLoginQueueVIPList = titleId =>
  createFetch(AT.LOGIN_QUEUE_VIP_LIST, titleId);

export const editQueueSettings = (queueId, queue) => ({
  type: AT.LOGIN_QUEUE_SPECIFIC_SETTINGS,
  queueId,
  queue: {
    queueState: queue.open,
    loginRate: queue.login_rate,
    queueErrorCode: queue.error_code,
  },
});

export const editQueueSettingsSuccess = () => dispatch => {
  dispatch({ type: AT.LOGIN_QUEUE_SPECIFIC_SETTINGS_SUCCESS });
  dispatch(GlobalSnackBarActions.show('Login Queue Settings Saved'));
  dispatch(fetchLoginQueueStatus());
};

export const editQueueSettingsFailed = err => dispatch => {
  const error = err?.response?.data?.error;
  dispatch({
    type: AT.LOGIN_QUEUE_SPECIFIC_SETTINGS_FAILED,
    error,
  });
  if (!error?.invalid) {
    dispatch(nonCriticalHTTPError(err));
  }
};

export const editTitleSettings = maxCCU => dispatch =>
  dispatch({
    type: AT.LOGIN_QUEUE_TITLE_SETTINGS,
    maxCCU,
  });

export const editTitleSettingsSuccess = () => dispatch => {
  dispatch({ type: AT.LOGIN_QUEUE_TITLE_SETTINGS_SUCCESS });
  dispatch(GlobalSnackBarActions.show('Login Queue Title Settings Saved'));
  dispatch(fetchLoginQueueStatus());
};

export const editTitleSettingsFailed = err => dispatch => {
  const error = err?.response?.data?.error;
  dispatch({
    type: AT.LOGIN_QUEUE_TITLE_SETTINGS_FAILED,
    error,
  });
  if (!error?.invalid) {
    dispatch(nonCriticalHTTPError(err));
  }
};

export const editLoginQueueVIPList = (queueId, vipList) => dispatch =>
  dispatch({
    type: AT.LOGIN_QUEUE_VIP_LIST,
    queueId,
    vipList,
  });

export const editLoginQueueVIPListSuccess = queueId => dispatch => {
  dispatch({ type: AT.LOGIN_QUEUE_VIP_LIST_SUCCESS });
  dispatch(GlobalSnackBarActions.show('Login Queue VIP List updated'));
  dispatch(fetchLoginQueueVIPList({ queueId }));
};

export const editLoginQueueVIPListFailed = err => dispatch => {
  dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  dispatch(nonCriticalHTTPError(err));
};
