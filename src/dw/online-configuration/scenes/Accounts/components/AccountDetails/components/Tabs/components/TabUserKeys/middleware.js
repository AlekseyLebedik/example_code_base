import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import { ACCOUNTS_LIST_ITEM_ONCLICK } from 'dw/online-configuration/scenes/Accounts/actionTypes';
import { ACCOUNT_DETAILS_TABS_CHANGE } from '../../actionTypes';
import { ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS } from './actionTypes';
import { fetchUserKeys } from './actions';
import { TAB_KEYS } from '../../constants';

export const middleware = store => next => action => {
  const state = store.getState();
  const selectedAccount = () => state.Scenes.Accounts.selectedAccount;

  switch (action.type) {
    case ACCOUNTS_LIST_ITEM_ONCLICK:
      if (
        TAB_KEYS.USER_KEYS === store.getState().Scenes.Accounts.Tabs.selectedTab
      )
        store.dispatch(fetchUserKeys(action.account.userID));
      break;
    case ACCOUNT_DETAILS_TABS_CHANGE:
      if (selectedAccount() !== undefined) {
        const { userID } = selectedAccount();
        const lastFetchedUserID =
          state.Scenes.Accounts.Tabs.TabUserKeys.fetchedUserID;
        const isUserKeysTab = TAB_KEYS.USER_KEYS === action.key;
        const isDifferentAccount = userID !== lastFetchedUserID;

        if (isUserKeysTab && isDifferentAccount) {
          store.dispatch(fetchUserKeys(userID));
        }
      }
      break;
    case ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS:
      store.dispatch(fetchUserKeys(selectedAccount().userID));
      store.dispatch(
        GlobalSnackBarActions.show('User key added properly.', 'success')
      );
      break;
    default:
      break;
  }
  next(action);
};
