import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';

const balancesSelector = state =>
  state.Scenes.Marketplace.Player.PlayerBalances.data;

const currenciesSelector = state => {
  const rawData = state.Scenes.Marketplace.Player.StoreBalances.data;
  const currencies = {};
  rawData.forEach(item => {
    currencies[item.currencyID] = item.currencyCode;
  });
  return currencies;
};

export const playerBalancesSelector = createSelector(
  balancesSelector,
  currenciesSelector,
  (balances, currencies) =>
    Object.entries(currencies).map(([key, value]) => {
      const balance = balances.find(bal => bal.currencyID.toString() === key);
      if (!balance) {
        return {
          amount: 0,
          currencyID: key,
          currencyCode: value,
          signedBalance: 0,
        };
      }
      return {
        ...balance,
        currencyCode: value,
      };
    })
);

export const balancesByCurrencyID = createSelector(
  playerBalancesSelector,
  balances => mapValues(keyBy(balances, 'currencyID'), i => i.signedBalance)
);

export const isLoadingSelector = state =>
  state.Scenes.Marketplace.Player.PlayerBalances.loading ||
  state.Scenes.Marketplace.Player.StoreBalances.loading;

export const selectedBalancesSelector = state =>
  state.Scenes.Marketplace.Player.PlayerBalances.selectedItems;
