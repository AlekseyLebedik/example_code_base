import { createSelector } from 'reselect';
import { getRecentTaskType } from './helpers';
/** General selectors */
export const taskMonitorSelector = state => state.Scenes.Event.taskMonitor;
export const taskMonitorTasksSelector = createSelector(
  taskMonitorSelector,
  taskMonitor => taskMonitor.tasks
);
export const taskMonitorTasksDataSelector = createSelector(
  taskMonitorTasksSelector,
  taskMonitorTasks => taskMonitorTasks.data
);
export const taskMonitorInitialTabSelector = createSelector(
  taskMonitorTasksDataSelector,
  tasksData => getRecentTaskType(tasksData)
);
