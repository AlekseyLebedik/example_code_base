import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const activeStoreSelector = state => state.Scenes.Marketplace.StoreConfig.store;

const activeStoreFormattedSelector = createSelector(
  activeStoreSelector,
  formatDateTimeSelector,
  (activeStore, formatDateTime) =>
    activeStore
      ? {
          ...activeStore,
          created: formatDateTime(activeStore.created),
        }
      : activeStore
);

export default activeStoreFormattedSelector;
