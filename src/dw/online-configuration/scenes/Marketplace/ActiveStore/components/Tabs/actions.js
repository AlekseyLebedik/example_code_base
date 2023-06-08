import { ACTIVE_STORE_TABS_CHANGE } from './actionTypes';

export const tabChange = key => ({
  type: ACTIVE_STORE_TABS_CHANGE,
  key,
});
