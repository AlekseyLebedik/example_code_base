import isEqual from 'lodash/isEqual';
import { createFetch } from '../../helpers/actions';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_FETCH_SUCCESS = 'FETCH_TASKS_FETCH_SUCCESS';
export const FETCH_TASKS_FETCH_FAILED = 'FETCH_TASKS_FETCH_FAILED';

export const actionTypes = {
  FETCH_TASKS,
  FETCH_TASKS_FETCH_SUCCESS,
  FETCH_TASKS_FETCH_FAILED,
};

/**
 * Core factory action creator for fetching tasks
 */
export const fetchTasks = params => createFetch(FETCH_TASKS, null, params);

export const actions = { fetchTasks };

export const INITIAL_STATE = {
  data: [],
  params: undefined,
};

export const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TASKS_FETCH_SUCCESS:
      return isEqual(state.data, action.data)
        ? state
        : {
            ...state,
            data: action.data,
          };
    default:
      return state;
  }
};
