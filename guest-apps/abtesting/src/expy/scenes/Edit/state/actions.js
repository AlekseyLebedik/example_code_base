import {
  FETCH_EDIT_TEST_PENDING,
  FETCH_EDIT_TEST_SUCCESS,
  FETCH_EDIT_TEST_ERROR,
} from './actionTypes';

export function fetchEditTestPending() {
  return { type: FETCH_EDIT_TEST_PENDING };
}

export function fetchEditTestSuccess({ data }) {
  return {
    type: FETCH_EDIT_TEST_SUCCESS,
    payload: { data },
  };
}

export function fetchEditTestError({ error }) {
  return {
    type: FETCH_EDIT_TEST_ERROR,
    payload: { error },
  };
}
