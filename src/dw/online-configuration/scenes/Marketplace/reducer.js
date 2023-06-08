import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { reducer as activeStoreReducer } from './ActiveStore/reducer';
import { reducer as TabsReducer } from './ActiveStore/components/Tabs/reducer';
import { reducer as storesReducer } from './Stores/reducer';
import {
  reducer as playerAssetsReducer,
  storeConfigReducer,
} from './PlayerAssets/reducer';

export const reducer = combineReducers({
  ActiveStoreTabs: TabsReducer,
  Player: playerAssetsReducer,
  StoreConfig: reduceReducers(activeStoreReducer, storeConfigReducer),
  Stores: storesReducer,
});
