import { createSelector } from 'reselect';
import { SERVICE_NAMES } from './constants';
import {
  plainProjectsSelector,
  currentTitleEnvSelector,
} from '../../modules/user/selectors';

const isServiceEnabled = (serviceName, env) => {
  if (!env) return false;
  switch (serviceName) {
    case SERVICE_NAMES.ACHIEVEMENTS:
      return env.usesAE;
    case SERVICE_NAMES.MARKETPLACE:
      return env.usesMarketplace;
    case SERVICE_NAMES.EXCHANGE:
      return env.usesExchangeMarketplace;
    case SERVICE_NAMES.MATCHMAKING:
      return env.usesAsyncMMP;
    case SERVICE_NAMES.ONLINE_GAMES:
      return !env.usesAsyncMMP;
    case SERVICE_NAMES.STORAGES:
      return env.usesLegacyStore;
    case SERVICE_NAMES.OBJECT_STORE:
      return env.usesObjectStore;
    case SERVICE_NAMES.ABTESTING:
      return env.usesABTesting;
    case SERVICE_NAMES.GROUPS:
      return env.usesGroups;
    case SERVICE_NAMES.ACCOUNTS_MANAGEMENT:
      return env.usesAccountsManagement;
    case SERVICE_NAMES.GVS:
      return env.usesGVS;
    default:
      return false;
  }
};

const makeServiceEnabledFilterFn = serviceName => env =>
  isServiceEnabled(serviceName, env);

export const serviceEnabledEnvsListSelector = createSelector(
  plainProjectsSelector,
  plainProjects => serviceName => {
    if (serviceName === undefined) return plainProjects;
    const filterFn = makeServiceEnabledFilterFn(serviceName);
    return plainProjects.filter(e => filterFn(e.environment));
  }
);

export const serviceEnabledSelectorFactory = (
  envSelector = currentTitleEnvSelector
) =>
  createSelector(
    envSelector,
    env => serviceName => isServiceEnabled(serviceName, env)
  );

export const serviceEnabledSelector = serviceEnabledSelectorFactory();
