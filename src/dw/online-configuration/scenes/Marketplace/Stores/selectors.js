import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const formatStore = (store, formatDateTime) =>
  store
    ? {
        ...store,
        created:
          formatDateTime(store.created) === 'Invalid date'
            ? store.created
            : formatDateTime(store.created),
      }
    : null;

const selectedStoreSelector = state =>
  state.Scenes.Marketplace.Stores.selectedStore;

export const selectedStore = createSelector(
  selectedStoreSelector,
  formatDateTimeSelector,
  formatStore
);

export const selectedStoreLoadingSelector = state =>
  state.Scenes.Marketplace.Stores.selectedStoreLoading;

const marketplaceStoresSelector = state =>
  state.Scenes.Marketplace.Stores.stores;

const marketplaceStoresFormattedSelector = createSelector(
  marketplaceStoresSelector,
  formatDateTimeSelector,
  (marketplaceStores, formatDateTime) =>
    marketplaceStores.map(marketplaceStore =>
      formatStore(marketplaceStore, formatDateTime)
    )
);

export const marketplaceStoresLoadingSelector = state =>
  state.Scenes.Marketplace.Stores.storesLoading;

export default marketplaceStoresFormattedSelector;

export const isPropagateStoreLoadingSelector = state =>
  state.Scenes.Marketplace.Stores.StoreDetail.propagateStoreLoading;
