import { ACTIVE_STORE_TABS_CHANGE } from './actionTypes';
import { TAB_KEYS } from './constants';

import {
  reducer as tabCurrenciesReducer,
  reducerInitialState as tabCurrenciesInitialState,
} from './components/TabCurrencies';

import {
  reducer as tabItemsReducer,
  reducerInitialState as tabItemsInitialState,
} from './components/TabItems';

import {
  reducer as tabEntitlementsReducer,
  reducerInitialState as tabEntitlementsInitialState,
} from './components/TabEntitlements';

import {
  reducer as tabProductsReducer,
  reducerInitialState as tabProductsInitialState,
} from './components/TabProducts';

import {
  reducer as tabExchangeReducer,
  reducerInitialState as tabExchangeInitialState,
} from './components/TabExchange';

import {
  reducer as tabSkusReducer,
  reducerInitialState as tabSkusInitialState,
} from './components/TabSkus';

import {
  reducer as tabPawnableItemsReducer,
  reducerInitialState as tabPawnableItemsInitialState,
} from './components/TabPawnableItems';

import {
  reducer as tabConversionRulesReducer,
  INITIAL_STATE as tabConversionRulesInitialState,
} from './components/TabConversionRules/reducer';

export const INITIAL_STATE = {
  selectedTab: TAB_KEYS.CURRENCIES,
  TabConversionRules: tabConversionRulesInitialState,
  TabCurrencies: tabCurrenciesInitialState,
  TabEntitlements: tabEntitlementsInitialState,
  TabExchange: tabExchangeInitialState,
  TabItems: tabItemsInitialState,
  TabPawnableItems: tabPawnableItemsInitialState,
  TabProducts: tabProductsInitialState,
  TabSkus: tabSkusInitialState,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVE_STORE_TABS_CHANGE:
      return {
        ...state,
        selectedTab: action.key,
      };
    default:
      return {
        ...state,
        TabCurrencies: tabCurrenciesReducer(state.TabCurrencies, action),
        TabItems: tabItemsReducer(state.TabItems, action),
        TabEntitlements: tabEntitlementsReducer(state.TabEntitlements, action),
        TabExchange: tabExchangeReducer(state.TabExchange, action),
        TabProducts: tabProductsReducer(state.TabProducts, action),
        TabSkus: tabSkusReducer(state.TabSkus, action),
        TabPawnableItems: tabPawnableItemsReducer(
          state.TabPawnableItems,
          action
        ),
        TabConversionRules: tabConversionRulesReducer(
          state.TabConversionRules,
          action
        ),
      };
  }
};
