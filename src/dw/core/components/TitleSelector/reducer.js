import { CHANGE_TITLE } from './actionTypes';

const initialState = {
  previousTitle: {},
  currentProject: {},
  currentTitle: {},
  currentEnv: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        previousTitle: { ...state },
        currentTitle: action.title,
        currentEnv: action.environment,
        currentProject: action.project,
      };
    default:
      return state;
  }
}
