import {
  FETCH_EDIT_TEST_PENDING,
  FETCH_EDIT_TEST_SUCCESS,
  FETCH_EDIT_TEST_ERROR,
} from './actionTypes';

const initialState = {
  pending: false,
  data: {
    name: '',
    type: '',
    title: '',
    status: '',
    summary: '',
    hypothesis: '',
    moreUrl: '',
    kpi: '',
    dateStart: null,
    dateEnd: null,
    treatments: [],
    approvers: [],
    categories: [],
    owner: '',
    responsibilities: '',
  },
  error: null,
};

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EDIT_TEST_PENDING: {
      return {
        ...state,
        pending: true,
      };
    }

    case FETCH_EDIT_TEST_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        pending: false,
        error: false,
        data,
      };
    }
    case FETCH_EDIT_TEST_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        pending: false,
        error,
      };
    }

    default:
      return state;
  }
}
