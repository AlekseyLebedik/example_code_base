import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { INITIAL_STATE as FETCH_MULTI_INITIAL_STATE } from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const fetchStoryTasksReducer = (state = FETCH_MULTI_INITIAL_STATE, action) => {
  switch (action.type) {
    case `${AT.FETCH_STORY_TASKS}_FETCH`:
      return {
        ...state,
        params: action.params,
        loading: true,
      };

    case `${AT.FETCH_STORY_TASKS}_FETCH_SUCCESS`:
      return {
        ...state,
        data: action.append ? [...state.data, ...action.data] : action.data,
        nextPageToken: action.nextPageToken,
        next: action.next,
        loading: false,
      };

    case `${AT.FETCH_STORY_TASKS}_FETCH_FAILED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const updateStoryTasksReducer = (state = FETCH_MULTI_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.UPDATE_STORY_TASKS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

const FETCH_SINGLE_INITIAL_STATE = {
  ...FETCH_MULTI_INITIAL_STATE,
  data: {},
};

const fetchTaskDetailsReducer = (
  state = FETCH_SINGLE_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case `${AT.FETCH_TASK_DETAILS}_FETCH`: {
      return {
        ...state,
        params: action.params,
        loading: true,
      };
    }
    case `${AT.FETCH_TASK_DETAILS}_FETCH_SUCCESS`:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case `${AT.FETCH_TASK_DETAILS}_FETCH_FAILED`:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};

const TASK_MONITOR_INITIAL_STATE = {
  tasks: FETCH_MULTI_INITIAL_STATE,
  taskDetail: FETCH_SINGLE_INITIAL_STATE,
};

const resetTaskMonitorReducer = (
  state = TASK_MONITOR_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.RESET_TASK_MONITOR:
      return {
        ...TASK_MONITOR_INITIAL_STATE,
      };
    case AT.STOP_SELECTED_TASK_DETAIL_FETCH:
      return {
        ...state,
        taskDetail: { ...TASK_MONITOR_INITIAL_STATE.taskDetail },
      };
    default:
      return state;
  }
};

export default reduceReducers(
  combineReducers({
    tasks: reduceReducers(fetchStoryTasksReducer, updateStoryTasksReducer),
    taskDetail: fetchTaskDetailsReducer,
  }),
  resetTaskMonitorReducer
);
