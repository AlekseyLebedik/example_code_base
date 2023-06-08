import {
  FETCH_ACTIVE_TEST_PENDING,
  FETCH_ACTIVE_TEST_SUCCESS,
  FETCH_ACTIVE_TEST_ERROR,
  SET_ACTIVE_TEST_APPROVERS,
} from './actionTypes';

export function fetchActiveTestPending() {
  return { type: FETCH_ACTIVE_TEST_PENDING };
}

export function fetchActiveTestSuccess(activeTest) {
  return {
    type: FETCH_ACTIVE_TEST_SUCCESS,
    payload: activeTest,
  };
}

export function fetchActiveTestError(error) {
  return {
    type: FETCH_ACTIVE_TEST_ERROR,
    payload: { error },
  };
}

export function setActiveTestApprovers({ data }) {
  return {
    type: SET_ACTIVE_TEST_APPROVERS,
    payload: { data },
  };
}
