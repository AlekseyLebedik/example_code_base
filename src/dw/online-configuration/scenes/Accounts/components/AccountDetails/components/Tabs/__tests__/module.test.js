import * as actions from '../actions';
import * as AT from '../actionTypes';
import { reducer, INITIAL_STATE } from '../reducer';
import { TAB_KEYS } from '../constants';

const tabChange = actions.tabChange(TAB_KEYS.USER_FRIENDS);

describe('Accounts - Tabs', () => {
  describe('Action Creators', () => {
    it('ACCOUNT_DETAILS_TABS_CHANGE', () => {
      expect(tabChange).toHaveProperty('type', AT.ACCOUNT_DETAILS_TABS_CHANGE);
      expect(tabChange).toHaveProperty('key', TAB_KEYS.USER_FRIENDS);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handle ACCOUNT_DETAILS_TABS_CHANGE', () => {
      expect(reducer(undefined, tabChange)).toEqual({
        ...INITIAL_STATE,
        selectedTab: TAB_KEYS.USER_FRIENDS,
      });
    });
  });
});
