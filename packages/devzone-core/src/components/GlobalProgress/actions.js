import { actionTypes as AT } from './constants';

export const start = () => ({
  type: AT.START,
});

export const done = () => ({
  type: AT.DONE,
});

export const reset = () => ({
  type: AT.RESET,
});
