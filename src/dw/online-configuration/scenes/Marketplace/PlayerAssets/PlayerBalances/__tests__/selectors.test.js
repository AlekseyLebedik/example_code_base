import { playerBalancesSelector, balancesByCurrencyID } from '../selectors';

describe('Player Balances selectors', () => {
  const balances = [
    {
      lastUpdate: 1552653946,
      context: '5682',
      currencyID: 1,
      userID: 214630613602841120,
      collisionField: 8,
      amount: 100,
      accountType: 'steam',
      signedBalance: 100,
    },
  ];
  const currencies = [
    {
      currencyID: 1,
      currencyCode: 'Test1',
      paymentProviderCode: null,
    },
    {
      currencyID: 2,
      currencyCode: 'Test2',
      paymentProviderCode: null,
    },
  ];
  const state = {
    Scenes: {
      Marketplace: {
        Player: {
          PlayerBalances: {
            data: balances,
            loading: false,
            selectedItems: [],
          },
          StoreBalances: {
            data: currencies,
            loading: false,
          },
        },
      },
    },
  };

  describe('playerBalancesSelector', () => {
    it('returns all the currencies and corresponding player balance', () => {
      const playerBalancesSelectorData = playerBalancesSelector(state);
      const containingBalances = expect.arrayContaining([
        expect.objectContaining({
          currencyCode: 'Test1',
          signedBalance: 100,
        }),
        expect.objectContaining({
          currencyCode: 'Test2',
          signedBalance: 0,
        }),
      ]);
      expect(playerBalancesSelectorData).toEqual(containingBalances);
    });
  });

  describe('balancesByCurrencyID', () => {
    it('returns all balances per currency key', () => {
      const balancesSelectorData = balancesByCurrencyID(state);
      const containingBalances = expect.objectContaining({
        1: 100,
        2: 0,
      });
      expect(balancesSelectorData).toEqual(containingBalances);
    });
  });
});
