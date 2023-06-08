import { ACCOUNTS_LIST_ITEM_ONCLICK } from 'dw/online-configuration/scenes/Accounts/actionTypes';
import { ACCOUNT_DETAILS_TABS_CHANGE } from '../../actionTypes';
import { TAB_KEYS } from '../../constants';
import { fetchUserFriends } from './actions';

export const middleware = store => next => action => {
  const state = store.getState();
  const selectedAccount = () => state.Scenes.Accounts.selectedAccount;

  switch (action.type) {
    case ACCOUNTS_LIST_ITEM_ONCLICK:
      if (
        TAB_KEYS.USER_FRIENDS ===
        store.getState().Scenes.Accounts.Tabs.selectedTab
      )
        store.dispatch(fetchUserFriends(action.account.userID));
      break;
    case ACCOUNT_DETAILS_TABS_CHANGE:
      if (selectedAccount() !== undefined) {
        const { userID } = selectedAccount();
        const lastFetchedUserID =
          state.Scenes.Accounts.Tabs.TabUserFriends.fetchedUserID;

        const isUserFriendsTab = TAB_KEYS.USER_FRIENDS === action.key;
        const isDifferentAccount = userID !== lastFetchedUserID;

        if (isUserFriendsTab && isDifferentAccount) {
          store.dispatch(fetchUserFriends(userID));
        }
      }
      break;
    default:
      break;
  }
  next(action);
};
