export const TYPE_SUFFIXES = ['_FETCH', '_FETCH_SUCCESS', '_FETCH_FAILED'];

export const UPDATE_TIME = 200;
export const MAX_PROGRESS = 90;
export const PROGRESS_INCREASE = 10;
export const ANIMATION_DURATION = UPDATE_TIME * 4;
export const TERMINATING_ANIMATION_DURATION = UPDATE_TIME;

export const STATUS_ENUM = {
  STARTING: 'starting',
  RUNNING: 'running',
  STOPPING: 'stopping',
  HIDDEN: 'hidden',
};

const START = 'GLOBAL_PROGRESS_START';
const DONE = 'GLOBAL_PROGRESS_DONE';
const RESET = 'GLOBAL_PROGRESS_RESET';

export const actionTypes = {
  START,
  DONE,
  RESET,
};
