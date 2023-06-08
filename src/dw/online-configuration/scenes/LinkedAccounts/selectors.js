import { createSelector } from 'reselect';
import { currentTitle } from 'dw/core/helpers/title-env-selectors';

export const linkedAccountsSelector = state => state.Scenes.LinkedAccounts.data;

export const nextPageSelector = state => state.Scenes.LinkedAccounts.next;

export const qSelector = state => state.Scenes.LinkedAccounts.q;

export const providerSelector = state => state.Scenes.LinkedAccounts.provider;

export const loadingSelector = state => state.Scenes.LinkedAccounts.loading;

const detailsSelector = state => state.Scenes.LinkedAccounts.details;

const accountIDPropsSelector = (_, props) => props.accountID;

export const accountDetailsSelector = createSelector(
  accountIDPropsSelector,
  detailsSelector,
  (accountID, details) => details[accountID] || {}
);

const selectedItemIdSelector = (_, props) => props.match.params.id;

export const selectedItemSelector = createSelector(
  selectedItemIdSelector,
  linkedAccountsSelector,
  (id, items) =>
    items && id ? items.find(item => item.umbrellaID === id) : undefined
);

export const userExistsInMarketplaceSelector = createSelector(
  accountDetailsSelector,
  accountDetails => accountDetails.existsInMarketplace
);

const bansSelector = state => state.Scenes.LinkedAccounts.bans;
export const bannedAccountsSelector = createSelector(
  bansSelector,
  currentTitle,
  (bans, title) => (bans[title.id] ? bans[title.id] : {})
);
