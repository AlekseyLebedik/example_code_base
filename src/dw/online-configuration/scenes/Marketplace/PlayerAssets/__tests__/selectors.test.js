import { RARITY_TYPES, CATEGORIES } from '../constants';

import {
  itemSubTypeSelector,
  itemTypeSelector,
  filterItemsMappingSelector,
} from '../selectors';

describe('Player Assets selectors', () => {
  describe('itemSubTypeSelector', () => {
    it('returns the corresponding sub type name', () => {
      expect(itemSubTypeSelector(0)).toEqual(RARITY_TYPES[0]);
    });
  });

  describe('itemTypeSelector', () => {
    it('returns the corresponding type name', () => {
      expect(itemTypeSelector(0)).toEqual(CATEGORIES[0]);
    });
  });

  describe('filterItemsMappingSelector', () => {
    it('returns all items if no filters provided', () => {
      const items = [{ itemID: '1' }, { itemID: '2' }, { itemID: '3' }];
      const localStoreItems = [
        { itemID: '1', itemType: '1', itemSubType: '1' },
        { itemID: '2', itemType: '1', itemSubType: '2' },
        { itemID: '3', itemType: '3', itemSubType: '3' },
      ];

      const returnedItems = filterItemsMappingSelector(items, localStoreItems);

      expect(returnedItems).toHaveLength(3);
      expect(
        returnedItems.map(x => ({
          rarity: RARITY_TYPES[x.itemSubType],
          nameType: CATEGORIES[x.itemType],
        }))
      ).toEqual(
        localStoreItems.map(x => ({
          rarity: RARITY_TYPES[x.itemSubType],
          nameType: CATEGORIES[x.itemType],
        }))
      );
    });
  });
});
