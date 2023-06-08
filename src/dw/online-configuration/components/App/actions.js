import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import * as AT from './actionTypes';

export function resetProjectData() {
  return {
    type: AT.APP_RESET_PROJECT_DATA,
  };
}

export function fetchServicesAvailabilitySuccess(services) {
  return {
    type: AT.APP_FETCH_SERVICES_AVAILABILITY_SUCCESS,
    services,
  };
}

export function fetchEnvironmentServicesSuccess(env) {
  return fetchServicesAvailabilitySuccess([
    {
      name: SERVICE_NAMES.ACHIEVEMENTS,
      configured: env.usesAE,
    },
    {
      name: SERVICE_NAMES.MARKETPLACE,
      configured: env.usesMarketplace,
    },
    {
      name: SERVICE_NAMES.EXCHANGE,
      configured: env.usesExchangeMarketplace,
    },
    {
      name: SERVICE_NAMES.MATCHMAKING,
      configured: env.usesAsyncMMP,
    },
    {
      name: SERVICE_NAMES.ONLINE_GAMES,
      configured: !env.usesAsyncMMP,
    },
    {
      name: SERVICE_NAMES.STORAGES,
      configured: env.usesLegacyStore,
    },
    {
      name: SERVICE_NAMES.OBJECT_STORE,
      configured: env.usesObjectStore,
    },
    {
      name: SERVICE_NAMES.GROUPS,
      configured: env.usesGroups,
    },
    {
      name: SERVICE_NAMES.ACCOUNTS_MANAGEMENT,
      configured: env.usesAccountsManagement,
    },
    {
      name: SERVICE_NAMES.DDL_TRANSLATION,
      configured: env.usesDDLTranslation,
    },
  ]);
}

export function fetchTitleEnvironment(env) {
  return {
    type: AT.APP_FETCH_TITLE_ENVIRONMENT,
    env,
  };
}

export const fetchTitleEnvironmentSuccess = env => dispatch => {
  dispatch({ type: AT.APP_FETCH_TITLE_ENVIRONMENT_SUCCESS, env });
  dispatch(fetchEnvironmentServicesSuccess(env));
};

export function fetchTitleEnvironmentFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
