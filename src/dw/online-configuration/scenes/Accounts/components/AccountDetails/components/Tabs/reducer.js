import { ACCOUNT_DETAILS_TABS_CHANGE } from './actionTypes';
import { TAB_KEYS } from './constants';

import {
  reducer as tabUserDetailsReducer,
  INITIAL_STATE as tabUserDetailsInitialState,
} from './components/TabUserDetails/reducer';

import {
  reducer as tabUserTeamsReducer,
  reducerInitialState as tabUserTeamsInitialState,
} from './components/TabUserTeams';

import {
  reducer as tabUserFriendsReducer,
  INITIAL_STATE as tabUserFriendsInitialState,
} from './components/TabUserFriends/reducer';

import {
  reducer as tabUserKeysReducer,
  INITIAL_STATE as tabUserKeysInitialState,
} from './components/TabUserKeys/reducer';

export const INITIAL_STATE = {
  selectedTab: TAB_KEYS.USER_DETAILS,
  TabUserDetails: tabUserDetailsInitialState,
  TabUserTeams: tabUserTeamsInitialState,
  TabUserFriends: tabUserFriendsInitialState,
  TabUserKeys: tabUserKeysInitialState,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_DETAILS_TABS_CHANGE:
      return {
        ...state,
        selectedTab: action.key,
      };
    default:
      return {
        ...state,
        TabUserDetails: tabUserDetailsReducer(state.TabUserDetails, action),
        TabUserTeams: tabUserTeamsReducer(state.TabUserTeams, action),
        TabUserFriends: tabUserFriendsReducer(state.TabUserFriends, action),
        TabUserKeys: tabUserKeysReducer(state.TabUserKeys, action),
      };
  }
};
