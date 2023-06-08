import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Action for fetching event tasks
 * @param {string|number} id - Event ID
 * @param {string} type      - Type of task to fetch
 */
export const fetchEventTasks = (id, type) =>
  createFetch(AT.FETCH_EVENT_TASKS, id, { type });

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
 * Updates the event tasks
 * @param {Object[]} data - Updated list of event tasks
 */
export const updateEventTasks = data => ({
  type: AT.UPDATE_EVENT_TASKS,
  data,
});
