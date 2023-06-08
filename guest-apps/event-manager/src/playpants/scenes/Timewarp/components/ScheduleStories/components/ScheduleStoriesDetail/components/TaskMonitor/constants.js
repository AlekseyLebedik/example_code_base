import head from 'lodash/head';

export const TASK_MONITOR_TAB_OPTIONS = [
  {
    label: 'Publishing',
    value: 'publish',
  },
];

export const DEFAULT_SELECTED_TAB = head(TASK_MONITOR_TAB_OPTIONS).value;
