import { fetch } from 'dw/core/components/TabWithTable/actions';

import { ACCOUNTS_LIST_ITEM_ONCLICK } from 'dw/online-configuration/scenes/Accounts/actionTypes';

import { ACCOUNT_DETAILS_TABS_CHANGE } from '../../actionTypes';
import { TAB_KEYS } from '../../constants';
import { ACTION_TYPE_PREFIX } from './constants';

export const middleware = store => next => action => {
  const state = store.getState();
  const selectedAccount = () => state.Scenes.Accounts.selectedAccount;

  switch (action.type) {
    case ACCOUNTS_LIST_ITEM_ONCLICK:
      if (
        TAB_KEYS.USER_TEAMS ===
        store.getState().Scenes.Accounts.Tabs.selectedTab
      )
        store.dispatch(fetch(ACTION_TYPE_PREFIX, action.account.userID));
      break;
    case ACCOUNT_DETAILS_TABS_CHANGE:
      if (selectedAccount() !== undefined) {
        const { userID } = selectedAccount();
        const lastFetchedUserID =
          state.Scenes.Accounts.Tabs.TabUserTeams.fetchedUserID;

        const isUserTeamsTab = TAB_KEYS.USER_TEAMS === action.key;
        const isDifferentAccount = userID !== lastFetchedUserID;

        if (isUserTeamsTab && isDifferentAccount) {
          store.dispatch(fetch(ACTION_TYPE_PREFIX, userID));
        }
      }
      break;
    default:
      break;
  }
  next(action);
};
