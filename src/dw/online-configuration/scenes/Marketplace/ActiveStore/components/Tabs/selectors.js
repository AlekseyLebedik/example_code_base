import { createSelector } from 'reselect';

const activeStoreTabsSelector = state =>
  state.Scenes.Marketplace.ActiveStoreTabs;

export const activeStoreDetailsSelector = state =>
  state.Scenes.Marketplace.StoreConfig.storeDetails;

export const selectedTabSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.selectedTab
);

export const TabCurrenciesSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabCurrencies
);
export const TabItemsSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabItems
);
export const TabEntitlementsSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabEntitlements
);
export const TabProductsSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabProducts
);
export const TabSkusSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabSkus
);
export const TabPawnableItemsSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabCurrencies
);
export const TabExchangeSelector = createSelector(
  activeStoreTabsSelector,
  tabs => tabs.TabExchange
);
