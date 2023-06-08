import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import {
  formatDateTimeSelector,
  humanizedElapsedTime,
  timezoneOrDefaultSelector,
} from 'playpants/helpers/dateTime';

/** taskMonitor/tasks */
export const taskMonitorTasksSelector = taskMonitorSelector =>
  createSelector(taskMonitorSelector, taskMonitor => taskMonitor.tasks);

export const taskMonitorTasksDataSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTasksSelector(taskMonitorSelector),
    taskMonitorTasks => taskMonitorTasks.data
  );

export const taskMonitorTasksLoadingSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTasksSelector(taskMonitorSelector),
    taskMonitorTasks => taskMonitorTasks.loading
  );

/** taskMonitor/taskDetail */
export const taskMonitorTaskDetailSelector = taskMonitorSelector =>
  createSelector(taskMonitorSelector, taskMonitor => taskMonitor.taskDetail);

export const taskMonitorTaskDetailDataSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTaskDetailSelector(taskMonitorSelector),
    taskMonitorTaskDetail => taskMonitorTaskDetail.data
  );

export const taskMonitorTaskDetailLoadingSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTaskDetailSelector(taskMonitorSelector),
    taskMonitorTaskDetail => taskMonitorTaskDetail.loading
  );

/** overviewDetails */
export const overviewDetailsSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTaskDetailDataSelector(taskMonitorSelector),
    formatDateTimeSelector,
    timezoneOrDefaultSelector,
    (taskMonitorTaskDetailData, dateTime, timezone) => {
      if (isEmpty(taskMonitorTaskDetailData)) return [];

      return [
        {
          label: 'ID',
          value: taskMonitorTaskDetailData.id,
        },
        {
          label: 'Title',
          value: taskMonitorTaskDetailData.title,
        },
        {
          label: 'State',
          value: taskMonitorTaskDetailData.state,
        },
        {
          label: 'Progress',
          value: `${Math.round(taskMonitorTaskDetailData.progress * 100)}%`,
        },
        {
          label: 'Created',
          value: humanizedElapsedTime(
            taskMonitorTaskDetailData.created_at,
            timezone
          ),
        },
        {
          label: 'Ended',
          value: humanizedElapsedTime(
            taskMonitorTaskDetailData.ended_at,
            timezone
          ),
        },
      ];
    }
  );
/** taskDetails */
export const taskDetailsSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTaskDetailDataSelector(taskMonitorSelector),
    taskMonitorTaskDetailData => {
      if (isEmpty(taskMonitorTaskDetailData)) return [];
      return [
        {
          key: 'task-detail-logs',
          title: 'logs',
          code: taskMonitorTaskDetailData.logs,
          defaultExpanded: true,
        },
        {
          key: 'task-detail-errors',
          title: 'errors',
          code: taskMonitorTaskDetailData.error,
        },
        {
          key: 'task-detail-results',
          title: 'results',
          code: taskMonitorTaskDetailData.result,
        },
      ];
    }
  );
/** subTasks */
export const subTasksSelector = taskMonitorSelector =>
  createSelector(
    taskMonitorTaskDetailDataSelector(taskMonitorSelector),
    taskMonitorTaskDetailData => {
      if (
        isEmpty(taskMonitorTaskDetailData) ||
        !taskMonitorTaskDetailData.children
      )
        return [];
      return taskMonitorTaskDetailData.children;
    }
  );
