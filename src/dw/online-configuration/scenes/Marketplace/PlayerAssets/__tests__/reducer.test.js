import { INITIAL_STATE } from '@demonware/devzone-core/helpers/reducers';
import { reducer, INITIAL_STATE_ITEMS_INVENTORY } from '../reducer';

describe('Marketplace Player Assets stores reducer', () => {
  const InitialState = {
    PlayerBalances: INITIAL_STATE_ITEMS_INVENTORY,
    StoreBalances: INITIAL_STATE,
    PlayerInventory: INITIAL_STATE_ITEMS_INVENTORY,
    StoreInventory: INITIAL_STATE_ITEMS_INVENTORY,
    StoreProducts: INITIAL_STATE_ITEMS_INVENTORY,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(InitialState);
  });
});
