import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import {
  createFetchReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import { parseSchema } from 'playpants/components/App/helpers';
import Responsibilities from './components/Responsibilities/reducer';
import * as AT from './actionTypes';

const availableUsersReducer = createFetchReducer(AT.FETCH_AVAILABLE_USERS);
const userListFiltersReducer = (state = { query: '' }) => state;

const eventsReducer = (state = FETCH_INITIAL_STATE, action) => {
  switch (action.type) {
    case `${AT.FETCH_PROJECT_SCHEMA}_FETCH_SUCCESS`:
      return {
        ...state,
        data: parseSchema(action.data),
        next: action.next,
        nextPageToken: action.nextPageToken,
      };
    case AT.CLEAR_PROJECT_SCHEMA:
      return {
        ...state,
        data: {},
      };
    default:
      return {
        ...state,
      };
  }
};

const usersReducer = combineReducers({
  availableUsers: availableUsersReducer,
  userListFilters: userListFiltersReducer,
});

export default combineReducers({
  Responsibilities,
  Schemas: reduceReducers(
    FETCH_INITIAL_STATE,
    createFetchReducer(AT.FETCH_PROJECT_SCHEMA),
    eventsReducer
  ),
  Users: usersReducer,
});
