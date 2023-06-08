import { SOURCE_SELECT_FETCH_SUCCESS } from './actionTypes';

const INITIAL_STATE = {
  data: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SOURCE_SELECT_FETCH_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
