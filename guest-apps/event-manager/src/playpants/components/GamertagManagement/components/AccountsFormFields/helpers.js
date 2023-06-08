import uniqBy from 'lodash/uniqBy';

import { PROVIDERS, KEY_PROVIDERS } from 'playpants/constants/providers';

/**
 * Merges all accounts from each title-env for the project
 * @param {[]} results - list of fetch results from each title-env
 * @param {[]} uniqKey - key to use as uniqBy basis
 * @returns {[]} flattened list of accounts uniq by umbrellaID
 */
export const mergeAccountResults = (results, uniqKey) =>
  uniqBy(
    results.flatMap(res => res.data.data),
    uniqKey
  );

/**
 * Handles formatting the linked-account data to work with react-select.
 * Adds every linked account as well as an Umbrella group with all
 * accounts as it's data so when this group is added we can grab
 * every linked accounts to add to the account list table
 * @param {Object} results - list of fetch results from each title-env
 * @returns
 */
export const formatLinkedAccounts = data =>
  data
    .filter(({ accounts }) => accounts.some(a => a.provider === 'uno'))
    .map(({ accounts, umbrellaID }) => {
      const uno = accounts.find(a => a.provider === 'uno');
      const { accountID: key } = uno;
      const label = accounts.reduce(
        (acc, account) => {
          const { accountID, provider, username } = account;
          return [
            ...acc,
            `${provider.toUpperCase()}: ${username} (${accountID})`,
          ];
        },
        [`Umbrella (${umbrellaID})`]
      );
      const linkedAccounts = JSON.stringify(label);
      const value = { ...uno, linkedAccounts };
      return { value, label, key };
    });

/**
 * Returns a sorted list of providers by KEY_PROVIDERS index first
 * @returns {[]} sorted provider list
 */
export const sortProviders = () =>
  PROVIDERS.sort((p, p2) =>
    KEY_PROVIDERS.includes(p.label) || KEY_PROVIDERS.includes(p2.label)
      ? -(KEY_PROVIDERS.indexOf(p.label) - KEY_PROVIDERS.indexOf(p2.label))
      : PROVIDERS.indexOf(p.label) - PROVIDERS.indexOf(p2.label)
  );
