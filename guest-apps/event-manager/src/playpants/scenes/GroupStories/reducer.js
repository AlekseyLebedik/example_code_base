import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  createFetchReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import groupStoriesDetailReducer from './components/GroupStoriesDetail/reducer';
import groupStoriesSidebarReducer from './components/GroupStoriesSidebar/reducer';
import * as AT from './actionTypes';

const searchedGroupStoriesReducer = createFetchReducer(AT.SEARCH_GROUP_STORIES);

const SELECTED_GROUP_STORY_INITIAL_STATE = {};
const selectedGroupStoryReducer = (
  state = SELECTED_GROUP_STORY_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.SET_SELECTED_GROUP_STORY:
      return action.story;
    default:
      return state;
  }
};

export const resetGroupStoriesReducer =
  INITIAL_STATE =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AT.RESET_GROUP_STORIES:
        return {
          ...INITIAL_STATE,
        };
      default:
        return state;
    }
  };

const reducer = combineReducers({
  selectedGroupStory: reduceReducers(
    selectedGroupStoryReducer,
    resetGroupStoriesReducer(SELECTED_GROUP_STORY_INITIAL_STATE)
  ),
  searchedGroupStories: reduceReducers(
    searchedGroupStoriesReducer,
    resetGroupStoriesReducer(FETCH_INITIAL_STATE)
  ),
  GroupStoriesDetail: groupStoriesDetailReducer,
  GroupStoriesSidebar: groupStoriesSidebarReducer,
});

export default reducer;
