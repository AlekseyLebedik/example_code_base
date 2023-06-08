import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';

export function fetchTest(titleID, environment, id) {
  return {
    type: AT.FETCH_TEST,
    titleID,
    environment,
    id,
  };
}

export function fetchTestSuccess(data) {
  return {
    type: AT.FETCH_TEST_SUCCESS,
    test: data,
  };
}

export function fetchTestFailed(err) {
  return dispatch => {
    dispatch({ type: AT.FETCH_TEST_FAILED });
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function resetTest() {
  return {
    type: AT.RESET_TEST,
  };
}

export function changeShowDetails(showDetails) {
  return {
    type: AT.PROPAGATE_SHOW_DETAILS,
    propagateShowDetails: showDetails,
  };
}
