import * as AT from './actionTypes';

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.LOBBIES_FETCH_THUNDERPANTS_LINK_SUCCESS:
      return {
        ...state,
        [action.serverID]: {
          link: action.link,
        },
      };
    case AT.LOBBIES_FETCH_THUNDERPANTS_LINK:
      return {
        ...state,
        [action.serverID]: {
          link: undefined,
        },
      };
    default:
      return state;
  }
};

export default reducer;
