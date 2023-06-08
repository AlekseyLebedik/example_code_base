import {
  productsSelector,
  productsListSelector,
  isLoadingSelector,
  selectedItemsSelector,
} from '../selectors';

describe('Products selectors', () => {
  const storeProductsData = [
    {
      grantedItems: [{ itemID: 'test1' }],
      grantedEntitlements: [{ entitlementID: 'ent1' }],
    },
  ];
  const state = {
    Scenes: {
      Marketplace: {
        Player: {
          StoreInventory: {},
          StoreProducts: {
            data: storeProductsData,
            selectedItems: [{ itemID: 'test1' }],
            loading: false,
          },
        },
      },
    },
  };
  it('productsSelector', () => {
    const result = productsSelector(state);
    expect(result).toEqual(storeProductsData);
  });

  it('productsListSelector', () => {
    const result = productsListSelector(state);
    const containingExpect = expect.arrayContaining([
      expect.objectContaining({ id: 'test1' }),
      expect.objectContaining({ id: 'ent1' }),
    ]);
    expect(result).toEqual(containingExpect);
  });

  it('isLoadingSelector', () => {
    const result = isLoadingSelector(state);
    expect(result).toEqual(false);
  });

  it('selectedItems', () => {
    const result = selectedItemsSelector(state);
    expect(result).toEqual([{ itemID: 'test1' }]);
  });
});
