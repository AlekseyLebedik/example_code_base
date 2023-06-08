import * as AT from '../PlayerAchievements/components/AE/actionTypes';

const INITIAL_STATE = {
  userAchievements: [],
  nextPageToken: undefined,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.USER_ACHIEVEMENTS_FETCH_SUCCESS:
      return {
        ...state,
        userAchievements: !action.append
          ? action.userAchievements
          : [...state.userAchievements, ...action.userAchievements],
        nextPageToken: action.nextPageToken,
      };
    default:
      return state;
  }
};
