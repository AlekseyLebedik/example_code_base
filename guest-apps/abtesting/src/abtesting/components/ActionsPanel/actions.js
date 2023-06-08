import history from 'dw/core/helpers/history';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';

export function changeTestStatus(titleID, envShortType, testID, status) {
  return {
    type: AT.CHANGE_TEST_STATUS,
    titleID,
    envShortType,
    testID,
    status,
  };
}

export function changeTestStatusSuccess(testID, status) {
  return dispatch => {
    dispatch(
      GlobalSnackBarActions.show('Test status changed succesfully.', 'success')
    );
    dispatch({
      type: AT.CHANGE_TEST_STATUS_SUCCESS,
      testID,
      status,
    });
  };
}

export function changeTestStatusFailed(err) {
  return dispatch => {
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function deleteTest(titleID, envShortType, testID) {
  return {
    type: AT.DELETE_TEST,
    titleID,
    envShortType,
    testID,
  };
}

export function deleteTestSuccess(testID) {
  return dispatch => {
    dispatch(
      GlobalSnackBarActions.show('Test was successfully deleted.', 'success')
    );
    history.push('/abtesting/schedule');
    dispatch({
      type: AT.DELETE_TEST_SUCCESS,
      testID,
    });
  };
}

export function deleteTestFailed(err) {
  return dispatch => {
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}
