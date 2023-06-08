import isEmpty from 'lodash/isEmpty';
import { DEFAULT_SELECTED_TAB } from './constants';

export const getRecentTaskType = tasksData => {
  if (isEmpty(tasksData)) {
    return DEFAULT_SELECTED_TAB;
  }
  const max = tasksData.reduce((prev, current) =>
    Math.max(prev.created_at, current.created_at) === current.created_at
      ? current
      : prev
  );

  return max.type;
};
