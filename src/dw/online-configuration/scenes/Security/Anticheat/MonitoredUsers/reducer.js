import * as AT from './actionTypes';

const INITIAL_STATE = {
  users: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.MONITORED_USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: action.users,
      };
    case AT.MONITORED_USERS_DELETE_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => !action.userIds.includes(user.userId)
        ),
      };
    default:
      return state;
  }
};
