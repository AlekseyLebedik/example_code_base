import { ACCOUNT_DETAILS_TABS_CHANGE } from './actionTypes';

export const tabChange = key => ({
  type: ACCOUNT_DETAILS_TABS_CHANGE,
  key,
});
