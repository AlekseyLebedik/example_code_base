import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Action for fetching story tasks
 * @param {string|number} id - Story ID
 * @param {string} type      - Type of task to fetch
 */
export const fetchStoryTasks = (id, type) =>
  createFetch(AT.FETCH_STORY_TASKS, id, { type });

/**
 * Action for fetching task details
 * @param {string|number} id - Task ID
 */
export const fetchTaskDetails = id => createFetch(AT.FETCH_TASK_DETAILS, id);

/**
 * Action for setting the task monitor reducer to its initial state
 */
export const resetTaskMonitor = () => ({
  type: AT.RESET_TASK_MONITOR,
});

export const startSelectedTaskDetailFetch = id => ({
  type: AT.START_SELECTED_TASK_DETAIL_FETCH,
  id,
});

export const stopSelectedTaskDetailFetch = () => ({
  type: AT.STOP_SELECTED_TASK_DETAIL_FETCH,
});

/**
 * Updates the story tasks
 * @param {Object[]} data - Updated list of story tasks
 */
export const updateStoryTasks = data => ({
  type: AT.UPDATE_STORY_TASKS,
  data,
});
