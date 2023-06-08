import { reducer } from '../reducer';
import { ACCOUNTS_BANS_PREFIX } from '../constants';

describe('LinkedAccounts', () => {
  it('ACCOUNTS_BANS_FETCH_SUCCESS', () => {
    const data = [
      {
        accountID: '393905162',
        linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
        provider: 'battle',
        titleID: '3',
      },
      {
        accountID: '393905162',
        linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
        provider: 'battle',
        titleID: '1',
      },
    ];
    const action = {
      type: `${ACCOUNTS_BANS_PREFIX}_FETCH_SUCCESS`,
      data: { data },
    };
    const state = reducer({}, action);
    expect(state).toEqual({
      bans: {
        1: {
          accountID: '393905162',
          provider: 'battle',
          linkedBansID: ['16798579331608858738', '393905162'],
          linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
        },
        3: {
          accountID: '393905162',
          provider: 'battle',
          linkedBansID: ['16798579331608858738', '393905162'],
          linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
        },
      },
    });
  });
});
