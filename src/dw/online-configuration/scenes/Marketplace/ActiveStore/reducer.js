import * as AT from './actionTypes';

const INITIAL_STATE = {
  store: {
    context: null,
    created: null,
    label: null,
  },
  storeDetails: {},
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACTIVE_STORE_FETCH_SUCCESS:
      return {
        ...state,
        store: action.activeStore,
        storeDetails: action.storeDetails,
      };
    default:
      return { ...state };
  }
};
