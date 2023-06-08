import accountsSaga from './saga';
import tabUserDetailsSaga from './components/AccountDetails/components/Tabs/components/TabUserDetails/saga';
import { saga as tabUserTeamsSaga } from './components/AccountDetails/components/Tabs/components/TabUserTeams';
import tabUserFriendsSaga from './components/AccountDetails/components/Tabs/components/TabUserFriends/saga';
import tabUserKeysSaga from './components/AccountDetails/components/Tabs/components/TabUserKeys/saga';

export const sagas = [
  accountsSaga,
  tabUserDetailsSaga,
  tabUserTeamsSaga,
  tabUserFriendsSaga,
  tabUserKeysSaga,
];
