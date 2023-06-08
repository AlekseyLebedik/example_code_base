import { createSelector } from 'reselect';
import uniq from 'lodash/uniq';
import { BASE_PATH } from '../Navigation/routes';

export const projectsSelector = state => state.user.projects;

export const currentProjectSelector = state =>
  state.Components.App.currentProject;

export const configuredProjectsSelector = state =>
  state.Components.App.currentProject.configuredProjects;

export const configuredProjectsFilterSelector = createSelector(
  projectsSelector,
  configuredProjectsSelector,
  (userProjects, configProjects) =>
    configProjects
      .map(value => userProjects.find(obj => obj.id === value))
      .map(project => ({ value: project.id, label: project.name }))
);

export const projectsDropdownSelector = createSelector(
  projectsSelector,
  projects =>
    projects.map(project => ({ value: project.id, label: project.name }))
);

export const selectedProjectDropdownSelector = createSelector(
  currentProjectSelector,
  currentProject => ({ value: currentProject.id, label: currentProject.name })
);

export const currentProjectIdSelector = createSelector(
  currentProjectSelector,
  currentProject => currentProject.id
);

export const allProjectTitlesSelector = createSelector(
  currentProjectSelector,
  currentProject => currentProject && currentProject.titles
);

export const allProjectTitlesEnvsSelector = createSelector(
  allProjectTitlesSelector,
  titles =>
    titles &&
    uniq(
      titles.reduce(
        (acc, val) => acc.concat(...Object.values(val.environments)),
        []
      )
    )
);

export const titleEnvsListSelector = createSelector(
  allProjectTitlesSelector,
  projectTitles =>
    projectTitles.reduce(
      (acc, { id: titleId, environments }) => [
        ...acc,
        ...environments.map(({ shortType: env }) => ({
          titleId,
          env,
        })),
      ],
      []
    )
);

export const allProjectTitlesEnvsTypesSelector = createSelector(
  allProjectTitlesEnvsSelector,
  envs => envs && uniq(envs.map(env => env.type)).sort()
);

const defaultTitleEnv = state => state.user.profile.defaultTitleEnv;

export const defaultProjectSelector = createSelector(
  defaultTitleEnv,
  projectsSelector,
  (titleEnv, projects) => {
    const project = projects.find(p =>
      p.titles.some(title => title.id === titleEnv.titleId)
    );
    return project.id;
  }
);

export const getBaseURL = createSelector(
  currentProjectIdSelector,
  urlID => `/${BASE_PATH}/${urlID}/`
);
