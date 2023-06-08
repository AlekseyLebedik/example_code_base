import { createSelector } from 'reselect';

const userDetailsSelector = state =>
  state.Scenes.Accounts.Tabs.TabUserDetails.userDetails;

const getSourceFromDetails = profile =>
  profile.map(a => ({ key: a[0], userKey: a[0], value: a[1] }));

export const userIdSelector = state =>
  state.Scenes.Accounts.Tabs.TabUserDetails.fetchedUserID;

export const profilesSelector = createSelector(
  userDetailsSelector,
  userDetails =>
    !userDetails
      ? { private: [], public: [], reputation: null }
      : {
          private: getSourceFromDetails(userDetails.privateProfile),
          public: getSourceFromDetails(userDetails.publicProfile),
          reputation: userDetails.reputation,
        }
);
