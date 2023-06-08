import * as AT from './actionTypes';

const INITIAL_STATE = {
  challengeGenerators: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CHALLENGE_GENERATORS_FETCH_SUCCESS:
      return {
        ...state,
        challengeGenerators: action.challengeGenerators,
      };
    default:
      return state;
  }
};

export default reducer;
