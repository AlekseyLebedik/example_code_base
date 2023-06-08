import * as AT from './actionTypes';
import { ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION_SUCCESS } from './components/AccountDetails/components/Tabs/components/TabUserDetails/actionTypes';
import {
  reducer as TabsReducer,
  INITIAL_STATE as TabsInitialState,
} from './components/AccountDetails/components/Tabs/reducer';

const INITIAL_STATE = {
  accounts: [],
  nextPageToken: undefined,
  q: undefined,
  selectedAccount: undefined,
  Tabs: TabsInitialState,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: action.append
          ? [...state.accounts, ...action.accounts]
          : action.accounts,
        nextPageToken: action.nextPageToken,
        q: action.q,
      };
    case AT.ACCOUNTS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedAccount: action.account,
      };
    case AT.ACCOUNTS_UPDATE_SELECTED_ACCOUNT:
      return {
        ...state,
        selectedAccount: {
          userName: action.data.name,
          userID: action.data.id,
        },
      };
    case ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION_SUCCESS:
      return {
        ...state,
        accounts: state.accounts.map(item => ({
          ...item,
          reputation:
            item.userID === action.userID ? action.score : item.reputation,
        })),
        Tabs: TabsReducer(state.Tabs, action),
      };
    default:
      return {
        ...state,
        Tabs: TabsReducer(state.Tabs, action),
      };
  }
};
