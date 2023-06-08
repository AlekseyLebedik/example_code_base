import {
  CHANGE_PROJECT,
  CONFIGURED_PROJECTS_FETCH_SUCCESS,
} from './actionTypes';

const initialState = {
  contentTypeId: null,
  companies: [],
  id: null,
  name: null,
  titles: [],
  configuredProjects: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PROJECT:
      return {
        ...state,
        ...action.project,
      };
    case CONFIGURED_PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        configuredProjects: [...state.configuredProjects, ...action.projects],
      };
    default:
      return state;
  }
}
