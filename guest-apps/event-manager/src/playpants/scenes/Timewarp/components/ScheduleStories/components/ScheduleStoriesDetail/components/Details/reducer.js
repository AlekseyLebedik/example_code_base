import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const contextsFetchReducer = createFetchReducer(AT.FETCH_CONTEXTS);
const categoriesFetchReducer = createFetchReducer(AT.FETCH_CATEGORIES);

const EVENT_COUNT_INITIAL_STATE = {
  loading: false,
  data: 0,
  error: undefined,
};

const eventCountReducer = (state = EVENT_COUNT_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT:
      return {
        ...state,
        loading: true,
        data: 0,
      };
    case AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.count,
      };
    case AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default combineReducers({
  eventCount: eventCountReducer,
  contexts: contextsFetchReducer,
  categories: categoriesFetchReducer,
});
