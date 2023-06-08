import * as AT from './actionTypes';
import { reducer as componentsReducer } from './components/DetailPanel/reducer';

const INITIAL_STATE = {
  serversAllocation: {
    isLoading: false,
    data: [],
  },
  serverList: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.SERVERS_ALLOC_FETCH:
      return {
        ...state,
        serversAllocation: {
          ...state.serversAllocation,
          isLoading: true,
        },
      };
    case AT.SERVERS_ALLOC_FETCH_FAILED:
      return {
        ...state,
        serversAllocation: {
          ...state.serversAllocation,
          isLoading: false,
        },
      };
    case AT.SERVERS_ALLOC_FETCH_SUCCESS:
      return {
        ...state,
        serversAllocation: {
          isLoading: false,
          data: action.data,
        },
      };
    default:
      return componentsReducer(state, action);
  }
};
