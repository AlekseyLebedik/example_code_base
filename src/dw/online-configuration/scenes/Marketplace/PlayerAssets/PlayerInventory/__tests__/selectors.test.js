import uniq from 'lodash/uniq';
import {
  playerItemsList,
  storeItems,
} from 'dw/online-configuration/__mocks__/marketplace';

import { playerItemsSelector } from '../selectors';

describe('Player Inventory selectors', () => {
  const rarityFilters = [];
  const searchText = '';
  const state = {
    Scenes: {
      Marketplace: {
        Player: {
          PlayerInventory: {
            data: playerItemsList,
            rarityFilters,
            searchText,
          },
          StoreInventory: { data: storeItems },
        },
      },
    },
  };

  describe('playerItemsSelector', () => {
    it('returns distinct items', () => {
      const items = playerItemsSelector(state);
      const ids = items.map(x => x.itemID);
      const uniqIds = uniq(playerItemsList.map(x => x.itemID));
      expect(ids).toHaveLength(uniqIds.length);
    });
  });
});
