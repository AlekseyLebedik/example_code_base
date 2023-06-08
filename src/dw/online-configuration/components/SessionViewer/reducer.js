import { ACTION_TYPE_PREFIX } from './constants';

const INITIAL_STATE = {
  accounts: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACTION_TYPE_PREFIX}_FETCH`:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.params.id]: null,
        },
      };
    case `${ACTION_TYPE_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          ...action.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
