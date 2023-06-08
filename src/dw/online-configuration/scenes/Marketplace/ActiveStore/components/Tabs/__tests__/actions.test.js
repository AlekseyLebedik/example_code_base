import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('ActiveStoreTabs', () => {
  describe('tabChange', () => {
    it('returns ACTIVE_STORE_TABS_CHANGE action', () => {
      expect(actions.tabChange('key1')).toMatchObject({
        type: AT.ACTIVE_STORE_TABS_CHANGE,
        key: 'key1',
      });
    });
  });
});
