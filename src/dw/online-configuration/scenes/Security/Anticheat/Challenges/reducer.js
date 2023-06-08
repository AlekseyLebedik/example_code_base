import * as AT from './actionTypes';

const INITIAL_STATE = {
  challenges: [],
  currentChallenge: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CHALLENGES_FETCH_SUCCESS:
      return {
        ...state,
        challenges: action.challenges,
      };
    case AT.CHALLENGES_SET_CURRENT:
      return {
        ...state,
        currentChallenge: action.challenge,
      };
    default:
      return state;
  }
};

export default reducer;
