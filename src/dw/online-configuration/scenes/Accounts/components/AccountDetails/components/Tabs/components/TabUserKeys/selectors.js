import { createSelector } from 'reselect';

const userKeysSelector = state =>
  state.Scenes.Accounts.Tabs.TabUserKeys.userKeys;

const getSourceFromDetails = keysCollection =>
  keysCollection.map(k => ({ ...k, key: k.index }));

export const dedicationSelector = createSelector(userKeysSelector, userKeys =>
  !userKeys || userKeys === []
    ? { dedicated: [], nonDedicated: [] }
    : {
        dedicated: getSourceFromDetails(userKeys.filter(k => k.dedicated)),
        nonDedicated: getSourceFromDetails(userKeys.filter(k => !k.dedicated)),
      }
);
