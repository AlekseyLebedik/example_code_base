import get from 'lodash/get';
import { createSelector } from 'reselect';

import { CONTEXT_TYPE_ANY } from './constants';

const platforms = [
  'psp',
  'psp2',
  'psn',
  'ps2',
  'ps3',
  'ps4',
  'ps5',
  'xbl',
  'xb1',
  'xbox',
  'xbox360',
  'xbox one',
  'xbsx',
  'steam',
  'pc-steam',
  'wii-u',
  'wii',
  'battle',
  'bnet',
  'pc-bnet',
  'android',
  'iphone',
  'mobile',
];

const serviceSelector = (_, props) => props.serviceName;
const endpointSelector = (_, props) => props.endpoint;

const titleIdPropsSelector = (_, props) => parseInt(props.titleId, 10);
const titleIdSelector = state => state.Components.TitleSelector.currentTitle.id;

const envTypePropsSelector = (_, props) => props.envType;
const envTypeSelector = state =>
  state.Components.TitleSelector.currentEnv.shortType;

const projectsSelector = state => state.user.projects;

const currentEnvSelector = createSelector(
  projectsSelector,
  titleIdSelector,
  envTypeSelector,
  (projects, titleId, envType) => {
    const project = projects.find(p => p.titles.some(t => t.id === titleId));
    if (!project) return project;
    const title = project.titles.find(t => t.id === titleId);
    if (!title) return title;
    return title.environments.find(e => e.shortType === envType);
  }
);

const propsEnvSelector = createSelector(
  projectsSelector,
  titleIdPropsSelector,
  envTypePropsSelector,
  (projects, titleId, envType) => {
    const project = projects.find(p => p.titles.some(t => t.id === titleId));
    if (!project) return project;
    const title = project.titles.find(t => t.id === titleId);
    if (!title) return title;
    return title.environments.find(e => e.shortType === envType);
  }
);

export const usesMulticontextSelector = createSelector(
  currentEnvSelector,
  titleEnv => get(titleEnv, 'options.is_multicontext', false)
);

export const usesMulticontextPropsSelector = createSelector(
  propsEnvSelector,
  titleEnv => get(titleEnv, 'options.is_multicontext', false)
);

export const userAvailableLoadedSelector = state =>
  state.Components.ContextSelector.UserAvailableLoaded;

const contextForServiceSelector = createSelector(
  (state, props) =>
    !props?.userId || state.Components.ContextSelector.userId === props.userId,
  state => get(state, 'Components.ContextSelector.Available', {}),
  serviceSelector,
  (loadedForUser, availableContexts, serviceName) =>
    loadedForUser ? availableContexts[serviceName] : []
);

export const availableContextsSelector = createSelector(
  contextForServiceSelector,
  availableContexts => {
    if (!availableContexts) return availableContexts;
    return availableContexts.data;
  }
);

export const registrySelector = createSelector(
  state => get(state, 'Components.ContextSelector.Registry', {}),
  serviceSelector,
  (contextRegistry, serviceName) => {
    if (!contextRegistry[serviceName]) return contextRegistry[serviceName];
    return contextRegistry[serviceName].data;
  }
);

export const userSelector = state =>
  get(state, 'Components.ContextSelector.User', {});

export const userIDSelector = createSelector(
  userSelector,
  user => user && user.userId
);

export const contextRemotePropsSelector = state =>
  get(state, 'Components.ContextSelector.Props', {});

const platformRegex = new RegExp(`.*(${platforms.join('|')})`, 'i');

const addPlatform = context => {
  // eslint-disable-next-line
  const [, platform] = platformRegex.exec(context.name) || [];
  return { ...context, value: context.name, platform };
};

const relatedServicesAvailabilitySelector = createSelector(
  (_, props) => props.relatedServices,
  state => state.Components.ContextSelector.Available,
  state => state.Components.ContextSelector.Registry,
  (relatedServices, available, registry) => {
    if (!relatedServices || relatedServices.length === 0) return true;
    return relatedServices.every(
      serviceName =>
        available[serviceName] &&
        available[serviceName].data &&
        registry[serviceName] &&
        registry[serviceName].data
    );
  }
);

const isLoadingSelector = createSelector(
  availableContextsSelector,
  registrySelector,
  relatedServicesAvailabilitySelector,
  (availableContexts, contextRegistry, relatedServicesAvailable) =>
    !(availableContexts && contextRegistry && relatedServicesAvailable)
);

export const requiredContextSelector = createSelector(
  registrySelector,
  endpointSelector,
  (contextRegistry, endpoint) =>
    contextRegistry && contextRegistry.find(c => c.endpoint === endpoint)
);

const requiredContextTypeSelector = createSelector(
  requiredContextSelector,
  requiredContext => requiredContext && requiredContext.type
);

export const availableOptionsSelector = createSelector(
  availableContextsSelector,
  isLoadingSelector,
  requiredContextTypeSelector,
  (availableContexts, isLoading, requiredContextType) => {
    if (isLoading) return undefined; // Still loading
    if (!requiredContextType) {
      // endpoint does not require context
      return [];
    }
    return availableContexts
      .filter(
        c =>
          c.userSelectable &&
          (c.type === requiredContextType || c.type === CONTEXT_TYPE_ANY)
      )
      .map(addPlatform);
  }
);

export const currentContextSelector = createSelector(
  contextForServiceSelector,
  requiredContextTypeSelector,
  (availableContexts, requiredContextType) => {
    if (!availableContexts) return availableContexts;
    if (!requiredContextType) return requiredContextType;
    const currentContext =
      availableContexts.currentContext &&
      (availableContexts.currentContext[requiredContextType] ||
        availableContexts.currentContext[CONTEXT_TYPE_ANY]);
    return currentContext ? addPlatform(currentContext) : currentContext;
  }
);

export const makeContextToUseSelector = createSelector(
  availableContextsSelector,
  registrySelector,
  currentContextSelector,
  endpointSelector,
  usesMulticontextSelector,
  (
    availableContexts,
    contextRegistry,
    currentContext,
    endpoint,
    usesMulticontext
  ) => {
    if (!(availableContexts && contextRegistry)) return undefined; // Still loading
    const requiredContext = contextRegistry.find(c => c.endpoint === endpoint);
    if (!(requiredContext && usesMulticontext)) {
      // endpoint does not require context (probably title not supporting multiple contexts), using first
      return availableContexts.length > 0 ? availableContexts[0].name : null;
    }
    if (
      currentContext &&
      requiredContext &&
      (currentContext.type === requiredContext.type ||
        currentContext.type === CONTEXT_TYPE_ANY)
    )
      return currentContext.name;

    const contexts = availableContexts.filter(
      c => c.type === requiredContext.type || c.type === CONTEXT_TYPE_ANY
    );
    if (contexts.length === 0) {
      // Use default context if title has the multicontext flag set and only a single context (its type is not set).
      if (availableContexts.length === 1 && !availableContexts[0].type) {
        return availableContexts[0].name;
      }
      return null;
    }
    return contexts[0].name;
  }
);
