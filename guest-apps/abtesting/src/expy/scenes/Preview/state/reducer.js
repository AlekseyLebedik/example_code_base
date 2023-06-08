import {
  FETCH_ACTIVE_TEST_PENDING,
  FETCH_ACTIVE_TEST_SUCCESS,
  FETCH_ACTIVE_TEST_ERROR,
  SET_ACTIVE_TEST_APPROVERS,
} from './actionTypes';

const initialState = {
  error: false,
  pending: true,
  id: '',
  status: '',
  name: '',
  kpi: '',
  hypothesis: '',
  dateStart: '',
  dateEnd: '',
  summary: '',
  treatments: [],
  title: '',
  approvers: [],
  owner: '',
  responsibilities: '',
  categories: [],
};

export default function activeTestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVE_TEST_PENDING: {
      return {
        ...state,
        pending: true,
      };
    }
    case FETCH_ACTIVE_TEST_SUCCESS: {
      return {
        ...state,
        pending: false,
        error: false,
        ...action.payload,
      };
    }
    case FETCH_ACTIVE_TEST_ERROR: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }

    case SET_ACTIVE_TEST_APPROVERS: {
      const { data } = action.payload;
      return {
        ...state,
        approvers: data,
      };
    }
    default:
      return state;
  }
}
