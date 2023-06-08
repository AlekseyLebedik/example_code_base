import { CRITICAL_ERROR_SHOW, CRITICAL_ERROR_HIDE } from './actionTypes';

export const show = (error, retry) => ({
  type: CRITICAL_ERROR_SHOW,
  error,
  retry,
});

export const hide = () => ({
  type: CRITICAL_ERROR_HIDE,
});
