import {
  HEALTH_CHECK_BEAT,
  HEALTH_CHECK_ALL_GOOD,
  HEALTH_CHECK_SOMETHING_WRONG,
} from './actionTypes';

export const beat = () => ({
  type: HEALTH_CHECK_BEAT,
});

export const allGood = () => ({
  type: HEALTH_CHECK_ALL_GOOD,
});

export const somethingWrong = () => ({
  type: HEALTH_CHECK_SOMETHING_WRONG,
});
