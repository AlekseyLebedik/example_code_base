import {
  APP_FETCH_SERVICES_AVAILABILITY_SUCCESS,
  APP_FETCH_TITLE_ENVIRONMENT_SUCCESS,
} from './actionTypes';

export const INITIAL_STATE = {
  servicesAvailability: [],
  currentTitleEnv: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case APP_FETCH_SERVICES_AVAILABILITY_SUCCESS:
      return {
        ...state,
        servicesAvailability: action.services,
      };
    case APP_FETCH_TITLE_ENVIRONMENT_SUCCESS:
      return {
        ...state,
        currentTitleEnv: action.env,
      };
    default:
      return state;
  }
}
