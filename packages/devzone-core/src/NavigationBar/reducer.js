const SET_TITLE_ENV = 'NAVIGATION-BAR:SET_TITLE_ENV';
const SET_PROJECT = 'NAVIGATION-BAR:SET_PROJECT';

export const actionTypes = { SET_TITLE_ENV };

export const INITIAL_STATE = {
  currentTitleEnv: {},
  currentProject: {},
};

export const actions = {
  setTitleEnv: env => ({
    type: SET_TITLE_ENV,
    env,
  }),
  setProject: project => ({
    type: SET_PROJECT,
    project,
  }),
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TITLE_ENV:
      return {
        ...state,
        currentTitleEnv: action.env,
        currentProject: {},
      };
    case SET_PROJECT:
      return {
        ...state,
        currentTitleEnv: {},
        currentProject: action.project,
      };
    default:
      return state;
  }
}
