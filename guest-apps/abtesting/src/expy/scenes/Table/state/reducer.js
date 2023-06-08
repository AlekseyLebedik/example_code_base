import {
  FETCH_TESTS_PENDING,
  FETCH_TESTS_SUCCESS,
  FETCH_TESTS_ERROR,
} from './actionTypes';

const initialState = {
  pending: false,
  data: [],
  error: null,
};

export default function testsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTS_PENDING: {
      return {
        ...state,
        pending: true,
      };
    }

    case FETCH_TESTS_SUCCESS: {
      return {
        ...state,
        pending: false,
        error: false,
        data: action.payload,
      };
    }
    case FETCH_TESTS_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
