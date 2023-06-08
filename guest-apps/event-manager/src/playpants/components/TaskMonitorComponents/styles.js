import { TASK_TYPES } from 'playpants/constants/tasks';

export default theme => ({
  ...Object.assign(
    {},
    ...Object.keys(TASK_TYPES).map(taskState => ({
      [`${taskState}-subtask-list-item-icon`]: {
        color: theme.tasks.palette[taskState],
      },
    }))
  ),
  ...Object.assign(
    {},
    ...Object.keys(TASK_TYPES).map(taskState => ({
      [`${taskState}-task-list-item`]: {
        borderLeft: `7px solid ${theme.tasks.palette[taskState]} !important`,
        borderBottom: 'none !important',
      },
    }))
  ),
});
