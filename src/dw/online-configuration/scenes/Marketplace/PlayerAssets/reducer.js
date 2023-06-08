import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import {
  createFetchReducer,
  INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';
import { playerBalancesReducer } from './PlayerBalances/reducer';
import playerInventoryReducer from './PlayerInventory/reducer';
import productsReducer from './StoreProducts/reducer';
import { currenciesReducer } from './StoreBalances/reducer';

import {
  STORE_ITEMS_PREFIX,
  PLAYER_ITEMS_PREFIX,
  STORE_PRODUCTS_PREFIX,
  PLAYER_BALANCES_PREFIX,
} from './constants';

const fetchPlayerItemsReducer = createFetchReducer(PLAYER_ITEMS_PREFIX);
const fetchStoreItemsReducer = createFetchReducer(STORE_ITEMS_PREFIX);
const fetchStoreProductsReducer = createFetchReducer(STORE_PRODUCTS_PREFIX);

export const INITIAL_STATE_ITEMS_INVENTORY = {
  ...INITIAL_STATE,
  selectedItems: [],
};

export const genericInventoryReducer =
  prefix =>
  (state = INITIAL_STATE_ITEMS_INVENTORY, action) => {
    switch (action.type) {
      case `${prefix}_${AT.SELECT_ITEMS}`:
        return {
          ...state,
          selectedItems: action.value,
        };
      case `${prefix}_FETCH_SUCCESS`:
        return {
          ...state,
          selectedItems: [],
        };
      default:
        return state;
    }
  };

export const storeConfigReducer = (state, action) => {
  switch (action.type) {
    case AT.ACTIVE_STORE:
      return {
        ...state,
        store: action.store,
      };
    case AT.ACTIVE_STORE_DETAILS:
      return {
        ...state,
        storeDetails: action.details,
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  PlayerBalances: reduceReducers(
    playerBalancesReducer,
    genericInventoryReducer(PLAYER_BALANCES_PREFIX),
    INITIAL_STATE_ITEMS_INVENTORY
  ),
  StoreBalances: currenciesReducer,
  PlayerInventory: reduceReducers(
    fetchPlayerItemsReducer,
    genericInventoryReducer(PLAYER_ITEMS_PREFIX),
    playerInventoryReducer,
    INITIAL_STATE_ITEMS_INVENTORY
  ),
  StoreInventory: reduceReducers(
    fetchStoreItemsReducer,
    genericInventoryReducer(STORE_ITEMS_PREFIX),
    INITIAL_STATE_ITEMS_INVENTORY
  ),
  StoreProducts: reduceReducers(
    fetchStoreProductsReducer,
    genericInventoryReducer(STORE_PRODUCTS_PREFIX),
    productsReducer,
    INITIAL_STATE_ITEMS_INVENTORY
  ),
});
