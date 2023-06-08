import { createSelector } from 'reselect';
import get from 'lodash/get';

import {
  serviceEnabledSelectorFactory,
  serviceEnabledEnvsListSelector,
} from '@demonware/devzone-core/access/ServiceAvailability/selectors';

export { serviceEnabledEnvsListSelector };

export const projectsSelector = state => state.user.projects;

export const plainProjectsSelector = createSelector(
  projectsSelector,
  projects => {
    const list = [];
    projects.forEach(project => {
      project.titles.forEach(title => {
        title.environments.forEach(environment => {
          list.push({
            environment,
            title: {
              id: title.id,
              name: title.name,
              platform: title.platform,
              external: title.external,
            },
            project: {
              id: project.id,
              name: project.name,
              contentTypeId: project.contentTypeId,
              companies: project.companies,
            },
          });
        });
      });
    });
    return list.sort((a, b) => b.project.id - a.project.id);
  }
);

const TitleSelector = state => get(state, 'Components.TitleSelector', {});

export const currentTitle = createSelector(
  TitleSelector,
  project => project && project.currentTitle
);
export const currentEnvironment = createSelector(
  TitleSelector,
  project => project && project.currentEnv
);
export const currentProject = createSelector(
  TitleSelector,
  project => project && project.currentProject
);

export const currentEnvSelector = createSelector(
  currentEnvironment,
  currentTitle,
  currentProject,
  (env, title, project) => ({
    id: env && env.id,
    shortType: env && env.shortType,
    title: title && title.id,
    project: project && project.id,
    type: env && env.type,
  })
);

const envTypeSelector = state =>
  state.Components.TitleSelector.currentEnv.shortType;
const titleIdSelector = state => state.Components.TitleSelector.currentTitle.id;

export const plainCurrentEnvSelector = createSelector(
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

const titleEnvOptionPropsSelector = (_, props) => props && props.titleEnvOption;

export const makeGetTitleEnvOption = () =>
  createSelector(
    plainCurrentEnvSelector,
    titleEnvOptionPropsSelector,
    (titleEnv, titleEnvOption) =>
      get(titleEnv, `options.${titleEnvOption}`, false)
  );

export const currentEnvDetailsSelector = createSelector(
  currentEnvironment,
  plainProjectsSelector,
  (env, projects) => {
    const current =
      env && projects && projects.find(e => e.environment.id === env.id);
    return current ? current.environment : undefined;
  }
);

export const currentCompaniesDetailsSelector = createSelector(
  currentProject,
  plainProjectsSelector,
  (project, projects = []) => {
    const current = project && projects.find(p => p.project.id === project.id);
    return get(current, 'project.companies', []);
  }
);

export const defaultTitleEnvSelector = state =>
  state.user && state.user.profile.defaultTitleEnv;

const baseUrlSelector = (_, props) => props && props.baseUrl;
const baseUrlIDSelector = (_, props) => (props && props.urlID) || 'title';

export const getReactBaseURL = createSelector(
  baseUrlSelector,
  baseUrlIDSelector,
  currentEnvSelector,
  (baseUrl, urlID, env) => `/${baseUrl}/${env[urlID]}/${env.shortType}/`
);

export const servicesAvailabilitySelector = state =>
  get(state, 'Components.App.servicesAvailability');

export const currentTitleEnvOptionsSelector = state =>
  get(state, 'Components.App.currentTitleEnv.options', {});

export const isServiceAvailableSelector = createSelector(
  servicesAvailabilitySelector,
  currentEnvDetailsSelector,
  (servicesAvailability, currentEnv) =>
    servicesAvailability === undefined
      ? servicesAvailability
      : entry => {
          if (!entry.availabilityCheck) return true;

          if (typeof entry.availabilityCheck === 'object') {
            const { target, fn } = entry.availabilityCheck;
            let targetObj;
            switch (target) {
              case 'titleenv.current':
                if (!currentEnv) return true;
                targetObj = currentEnv;
                break;
              default:
                throw new Error(`The check for ${target} is not implemented`);
            }
            return fn(targetObj);
          }

          const service = servicesAvailability.find(
            s => s.name === entry.availabilityCheck
          );

          if (service === undefined) {
            // We are still waiting for the service status
            return service;
          }

          return !!(service.configured || service.enabled);
        }
);

export const serviceEnabledSelector = serviceEnabledSelectorFactory(
  currentEnvDetailsSelector
);

export const envsIdsSelector = createSelector(
  plainProjectsSelector,
  titleEnvs => titleEnvs.map(e => e.environment.id)
);

export const projectEnvsSelector = createSelector(
  plainProjectsSelector,
  currentProject,
  (projects, project) => {
    const currentEnvs = projects.filter(proj => proj.project.id === project.id);
    return currentEnvs.map(e => e.environment);
  }
);
