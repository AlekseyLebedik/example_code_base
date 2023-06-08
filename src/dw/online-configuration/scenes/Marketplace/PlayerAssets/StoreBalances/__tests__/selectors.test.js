import { storeValuesBalancesSelector } from '../selectors';

describe('Player Balances selectors', () => {
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
          StoreBalances: {
            data: currencies,
            loading: false,
          },
        },
      },
    },
  };

  describe('storeValuesBalancesSelector', () => {
    it('returns all balances parsed', () => {
      const storeValuesBalances = storeValuesBalancesSelector(state);
      const containingBalances = expect.objectContaining([
        {
          amount: 0,
          currencyID: 1,
          currencyCode: 'Test1',
          signedBalance: 0,
        },
        {
          amount: 0,
          currencyID: 2,
          currencyCode: 'Test2',
          signedBalance: 0,
        },
      ]);
      expect(storeValuesBalances).toEqual(containingBalances);
    });
  });
});
