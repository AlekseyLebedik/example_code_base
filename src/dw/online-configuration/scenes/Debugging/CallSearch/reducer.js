import * as AT from './actionTypes';

const INITIAL_STATE = {
  calls: [],
  nextPageToken: undefined,
  q: undefined,
  selectedCall: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CALLS_FETCH_SUCCESS:
      return {
        ...state,
        calls: action.append ? [...state.calls, ...action.calls] : action.calls,
        nextPageToken: action.nextPageToken,
      };
    case AT.CALLS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedCall: action.call,
      };
    case AT.CALLS_SET_FILTER_PARAMS:
      return {
        ...state,
        q: action.q,
      };
    default:
      return state;
  }
};

export default reducer;
