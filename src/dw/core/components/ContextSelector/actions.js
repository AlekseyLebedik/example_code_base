import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import {
  AVAILABLE_CONTEXTS_PREFIX,
  CONTEXT_REGISTRY_PREFIX,
  SERVICE_CHANGE_CONTEXT,
  CONTEXT_SELECTOR_CHANGE_USER,
  CONTEXT_SELECTOR_CHANGE_PROPS,
  CONTEXT_SELECTOR_RESET_PROPS,
} from './constants';

const prefixes = [AVAILABLE_CONTEXTS_PREFIX, CONTEXT_REGISTRY_PREFIX];

const createContextFetch = prefix => params => ({
  type: `${prefix}_FETCH`,
  params,
});

export const fetchAvailableContexts = createContextFetch(
  AVAILABLE_CONTEXTS_PREFIX
);

export const fetchContextsRegistry = createContextFetch(
  CONTEXT_REGISTRY_PREFIX
);

export const fetchSuccess = prefixes.reduce(
  (acc, prefix) => ({
    ...acc,
    [prefix]: (payload, { serviceName, userId }) => ({
      type: `${prefix}_FETCH_SUCCESS`,
      data: payload.data.data,
      serviceName,
      userId,
    }),
  }),
  {}
);

export const changeContext = (context, serviceName) => ({
  type: SERVICE_CHANGE_CONTEXT,
  context,
  serviceName,
});

export const changeUser = userId => ({
  type: CONTEXT_SELECTOR_CHANGE_USER,
  userId,
});

export const changeRemoteProps = props => ({
  type: CONTEXT_SELECTOR_CHANGE_PROPS,
  props,
});

export const resetRemoteProps = () => ({
  type: CONTEXT_SELECTOR_RESET_PROPS,
});

export const showNoAvailablePlatformContextMessage = serviceName =>
  GlobalSnackBarActions.show(
    `No Platform information available for this user.
    Ensure this user has a linked first party account and the ${serviceName} service is correctly configured`,
    'error'
  );

export const showNoAvailableContextMessage = serviceName =>
  GlobalSnackBarActions.show(
    `There are no available contexts for ${serviceName} service.
    Ensure the ${serviceName} service is correctly configured.`,
    'error'
  );
