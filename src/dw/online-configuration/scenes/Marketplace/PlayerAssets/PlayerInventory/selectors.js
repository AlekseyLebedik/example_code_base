import { createSelector } from 'reselect';

import { configOptionsSelector } from 'dw/core/helpers/selectors';
import {
  filterItemsMappingSelector,
  storeItemsSelector,
  itemsSelector,
  filteredInvalidItemsSelector,
} from '../selectors';

export const playerInventorySelector = state =>
  itemsSelector(state.Scenes.Marketplace.Player.PlayerInventory);

export const playerItemsSelector = createSelector(
  playerInventorySelector,
  storeItemsSelector,
  configOptionsSelector('MARKETPLACE_ITEM_TYPE'),
  filterItemsMappingSelector
);

export const invalidItemsSelector = createSelector(
  playerInventorySelector,
  storeItemsSelector,
  filteredInvalidItemsSelector
);
export const errorSelector = state =>
  state.Scenes.Marketplace.Player.PlayerInventory.error;

export const isLoadingSelector = state =>
  state.Scenes.Marketplace.Player.PlayerInventory.loading ||
  state.Scenes.Marketplace.Player.StoreInventory.loading;

export const selectedItemsSelector = state =>
  state.Scenes.Marketplace.Player.PlayerInventory.selectedItems;

export const maxQuantitySelector = createSelector(
  selectedItemsSelector,
  selectedItems => (selectedItems.length === 1 ? selectedItems[0].quantity : 1)
);
