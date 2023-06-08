import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';
import get from 'lodash/get';

export const productsSelector = state =>
  state?.Scenes?.Marketplace?.Player?.StoreProducts.data || [];

const mapValue = item => {
  if (item.itemID) {
    return `quantity: ${item.itemQuantity}`;
  }
  if (item.entitlementID) {
    return `level: ${item.entitlementLevel}`;
  }
  if (item.currencyID) {
    return `amount: ${item.amount}`;
  }
  return '';
};

const mapProductItem = (product, item, type) => ({
  productID: product.productID,
  productName: product.productName,
  ...item,
  value: mapValue(item),
  id: item.itemID || item.entitlementID || item.currencyID,
  type,
});

export const productsListSelector = createSelector(productsSelector, products =>
  flatten(
    products.map(prod => [
      ...(prod.grantedItems
        ? prod.grantedItems.map(i => mapProductItem(prod, i, 'item'))
        : []),
      ...(prod.grantedEntitlements
        ? prod.grantedEntitlements.map(i =>
            mapProductItem(prod, i, 'entitlement')
          )
        : []),
      ...(prod.grantedMoney
        ? prod.grantedMoney.map(i => mapProductItem(prod, i, 'money'))
        : []),
    ])
  )
);

export const isLoadingSelector = state =>
  get(state, 'Scenes.Marketplace.Player.StoreProducts.loading', true);

export const selectedItemsSelector = state =>
  get(
    state,
    'Scenes.Marketplace.Player.StoreProducts.selectedItems',
    undefined
  );
