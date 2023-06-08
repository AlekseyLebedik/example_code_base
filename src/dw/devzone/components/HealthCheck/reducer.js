import {
  HEALTH_CHECK_ALL_GOOD,
  HEALTH_CHECK_SOMETHING_WRONG,
} from './actionTypes';

const INITIAL_STATE = {
  visible: false,
  attempts: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HEALTH_CHECK_SOMETHING_WRONG:
      return {
        ...state,
        visible: state.attempts > 2,
        attempts: state.attempts + 1,
      };
    case HEALTH_CHECK_ALL_GOOD:
      return {
        ...state,
        visible: false,
        attempts: 0,
      };
    default:
      return state;
  }
}
