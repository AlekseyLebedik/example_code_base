import { createSelector } from 'reselect';
import differenceBy from 'lodash/differenceBy';

import { configOptionsSelector } from 'dw/core/helpers/selectors';
import {
  storeItemsSelector as storeInventorySelector,
  formatItem,
} from '../selectors';

import { playerItemsSelector } from '../PlayerInventory/selectors';

export const storeItemsSelector = createSelector(
  storeInventorySelector,
  configOptionsSelector('MARKETPLACE_ITEM_TYPE'),
  (items, options) =>
    items ? items.map(item => formatItem(item, item, options)) : []
);

export const isLoadingSelector = state =>
  state.Scenes.Marketplace.Player.StoreInventory.loading;

export const missingItemsSelector = createSelector(
  storeItemsSelector,
  playerItemsSelector,
  (storeItems, playerItems) => differenceBy(storeItems, playerItems, 'itemID')
);

export const selectedItemsSelector = state =>
  state.Scenes.Marketplace.Player.StoreInventory.selectedItems;
