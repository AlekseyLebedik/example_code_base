import * as actions from '../actions';
import { ACCOUNTS_BANS_PREFIX } from '../constants';

describe('LinkedAccounts', () => {
  describe('Actions', () => {
    describe('fetchAccountsBans', () => {
      it('dispatches ACCOUNTS_BANS_PREFIX_FETCH action', () => {
        const accounts = [
          { provider: 'battle', username: 'blah', accountID: '1234' },
        ];
        expect(actions.fetchAccountsBans(accounts)).toEqual({
          type: `${ACCOUNTS_BANS_PREFIX}_FETCH`,
          urlID: null,
          params: accounts,
          append: false,
        });
      });
    });
  });
});
