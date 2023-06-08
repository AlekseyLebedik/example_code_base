import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  createFetchReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import scheduleStoriesDetailReducer from './components/ScheduleStoriesDetail/reducer';
import scheduleStoriesSidebarReducer from './components/ScheduleStoriesSidebar/reducer';
import * as AT from './actionTypes';

const searchedScheduleStoriesReducer = createFetchReducer(
  AT.SEARCH_SCHEDULE_STORIES
);

const SELECTED_SCHEDULE_STORY_INITIAL_STATE = {};
const selectedScheduleStoryReducer = (
  state = SELECTED_SCHEDULE_STORY_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.SET_SELECTED_SCHEDULE_STORY:
      return action.story;
    case AT.RESET_SELECTED_SCHEDULE_STORY:
      return SELECTED_SCHEDULE_STORY_INITIAL_STATE;
    default:
      return state;
  }
};

export const resetScheduleStoriesReducer =
  INITIAL_STATE =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AT.RESET_SCHEDULE_STORIES:
        return {
          ...INITIAL_STATE,
        };
      default:
        return state;
    }
  };

const reducer = combineReducers({
  selectedScheduleStory: reduceReducers(
    selectedScheduleStoryReducer,
    resetScheduleStoriesReducer(SELECTED_SCHEDULE_STORY_INITIAL_STATE)
  ),
  searchedScheduleStories: reduceReducers(
    searchedScheduleStoriesReducer,
    resetScheduleStoriesReducer(FETCH_INITIAL_STATE)
  ),
  ScheduleStoriesDetail: scheduleStoriesDetailReducer,
  ScheduleStoriesSidebar: scheduleStoriesSidebarReducer,
});

export default reducer;
