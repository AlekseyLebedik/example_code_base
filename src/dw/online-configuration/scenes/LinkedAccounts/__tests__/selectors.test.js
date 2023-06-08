import * as selectors from '../selectors';

describe('LinkedAccounts/selectors', () => {
  const bans = {
    1: {
      provider: 'battle',
      accountID: '393905162',
      linkedBansID: ['393905162', '16798579331608858738'],
      linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
    },
    10: {
      provider: 'battle',
      accountID: '393905162',
      linkedBansID: ['393905162', '16798579331608858738'],
      linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
    },
  };
  const expected = {
    provider: 'battle',
    accountID: '393905162',
    linkedBansID: ['393905162', '16798579331608858738'],
    linkedBans: ['uno-16798579331608858738', 'battle-393905162'],
  };
  it('validates bannedAccountsSelector', () => {
    expect(
      selectors.bannedAccountsSelector({
        Scenes: {
          LinkedAccounts: { bans },
        },
        Components: {
          TitleSelector: { currentTitle: { id: 1, name: 'GTR-PS3' } },
        },
      })
    ).toEqual(expected);
  });
});
