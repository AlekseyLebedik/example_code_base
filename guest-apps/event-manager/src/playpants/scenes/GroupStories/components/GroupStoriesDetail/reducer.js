import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import findAndRemoveEvent from 'playpants/helpers/findAndRemoveEvent';
import { createScheduleEventsReducerFor } from 'playpants/components/ScheduleComponent/reducerCreators';
import { REMOVE_GROUP_STORY_FROM_EVENT_SUCCESS } from '../GroupStoriesSidebar/actionTypes';

import * as AT from './actionTypes';

export const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
};

export const cleanStoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMOVE_GROUP_STORY_FROM_EVENT_SUCCESS:
      return {
        ...state,
        data: findAndRemoveEvent(state.data, action),
      };
    case AT.RESET_GROUP_STORIES_DETAIL:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const reducer = reduceReducers(
  createScheduleEventsReducerFor(AT.SCOPE),
  combineReducers({
    abTests: cleanStoriesReducer,
    demonwareEvents: cleanStoriesReducer,
    eventManagerEvents: cleanStoriesReducer,
    expyTests: cleanStoriesReducer,
    externalEvents: cleanStoriesReducer,
    informationalEvents: cleanStoriesReducer,
  })
);

export default reducer;
