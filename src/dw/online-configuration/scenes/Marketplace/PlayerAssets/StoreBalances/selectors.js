import { createSelector } from 'reselect';

export const storeBalancesSelector = state =>
  state.Scenes.Marketplace.Player.StoreBalances.data;

export const storeValuesBalancesSelector = createSelector(
  storeBalancesSelector,
  currencies =>
    currencies.map(item => ({
      amount: 0,
      currencyID: item.currencyID,
      currencyCode: item.currencyCode,
      signedBalance: 0,
    }))
);

export const isLoadingSelector = state =>
  state.Scenes.Marketplace.Player.StoreBalances.loading;
