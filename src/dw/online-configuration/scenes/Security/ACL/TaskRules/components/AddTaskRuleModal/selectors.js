import { createSelector } from 'reselect';

export const serviceInfoSelector = state =>
  state.Scenes.Security.ACL.TaskRules.serviceInfo;

export const servicesListSelector = createSelector(
  serviceInfoSelector,
  serviceInfo => {
    const services = Object.keys(serviceInfo);
    services.sort();
    return ['*'].concat(services);
  }
);
