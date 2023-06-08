import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import findAndRemoveEvent from 'playpants/helpers/findAndRemoveEvent';
import * as AT from './actionTypes';

// SELECTED EVENT REDUCER
export const SELECTED_EVENT_INITIAL_STATE = {};

export const selectedEventReducer = (
  state = SELECTED_EVENT_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.SET_SELECTED_EVENT: {
      return action.eventData;
    }
    case AT.RESET:
      return SELECTED_EVENT_INITIAL_STATE;
    default:
      return state;
  }
};

export const GROUP_STORY_EVENTS_INITIAL_STATE = {
  data: [],
  loading: false,
};

export const groupStoryEventsReducer = (
  state = GROUP_STORY_EVENTS_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.FETCH_ALL_GROUP_STORY_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case AT.FETCH_ALL_GROUP_STORY_EVENTS_SUCCESS:
      return {
        ...state,
        data: action.storyEvents,
        loading: false,
      };
    case AT.FETCH_ALL_GROUP_STORY_EVENTS_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
      };
    case AT.REMOVE_GROUP_STORY_FROM_EVENT_SUCCESS:
      return {
        ...state,
        data: findAndRemoveEvent(state.data, action),
      };
    default:
      return state;
  }
};

export const resetGroupStoriesSidebarReducer =
  INITIAL_STATE =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AT.RESET_GROUP_STORIES_SIDEBAR:
        return {
          ...INITIAL_STATE,
        };
      default:
        return state;
    }
  };

const reducer = combineReducers({
  selectedEvent: reduceReducers(
    selectedEventReducer,
    resetGroupStoriesSidebarReducer(SELECTED_EVENT_INITIAL_STATE)
  ),
  allGroupStoryEvents: reduceReducers(
    groupStoryEventsReducer,
    resetGroupStoriesSidebarReducer(GROUP_STORY_EVENTS_INITIAL_STATE)
  ),
});

export default reducer;
