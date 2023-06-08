import { createSelector } from 'reselect';

const stateSelector = state =>
  state.Scenes.Accounts.Tabs.TabUserFriends.userFriends;

// WE CAN EXTRACT THIS SELECTOR TO COMMONS SELECTORS BECAUSE IS GONNA BE USED IN MORE PLACES
export const userFriendsSelector = createSelector(stateSelector, userFriends =>
  userFriends.map(uf => ({ ...uf, key: uf.friendID }))
);
