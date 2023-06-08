import {
  FETCH_TESTS_PENDING,
  FETCH_TESTS_SUCCESS,
  FETCH_TESTS_ERROR,
} from './actionTypes';

export function fetchTestsPending() {
  return { type: FETCH_TESTS_PENDING };
}

export function fetchTestsSuccess(tests) {
  return {
    type: FETCH_TESTS_SUCCESS,
    payload: tests,
  };
}

export function fetchTestsError(error) {
  return {
    type: FETCH_TESTS_ERROR,
    payload: error,
  };
}
