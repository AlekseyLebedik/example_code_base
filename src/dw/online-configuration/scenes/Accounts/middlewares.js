import { middleware as tabUserDetailsMiddleware } from './components/AccountDetails/components/Tabs/components/TabUserDetails/middleware';
import { middleware as tabUserTeamsMiddleware } from './components/AccountDetails/components/Tabs/components/TabUserTeams/middleware';
import { middleware as tabUserFriendsMiddleware } from './components/AccountDetails/components/Tabs/components/TabUserFriends/middleware';
import { middleware as tabUserKeysMiddleware } from './components/AccountDetails/components/Tabs/components/TabUserKeys/middleware';

export const middlewares = [
  tabUserDetailsMiddleware,
  tabUserTeamsMiddleware,
  tabUserFriendsMiddleware,
  tabUserKeysMiddleware,
];
