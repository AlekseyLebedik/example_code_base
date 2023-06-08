import { createSelector } from 'reselect';
import get from 'lodash/get';
import moment from 'moment-timezone';

import { contentTypesSelector } from '../contentType/selectors';

export const isStaffSelector = state => get(state, 'user.profile.isStaff');
export const isHijackedSelector = state =>
  get(state, 'user.profile.isHijacked');

export const userMembershipsSelector = state =>
  state.permissions.memberships || [];

export const profileSelector = state => state.user.profile;

export const bookmarksSelector = state => state.user.profile.favoriteSections;

export const bookmarkCountSelector = state => state.user.bookmarkCount;

export const bookmarkLoadingSelector = state => state.user.loading;

export const bookmarkLoadingKeysSelector = state => state.user.loadingKeys;

export const projectsSelector = state => state.user.projects;

export const timezoneSelector = state =>
  state.user.profile.timezone || moment.tz.guess();

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

export const currentProjectSelector = createSelector(
  state => state.user.profile.defaultTitleEnv,
  state => state.navigationBar.currentTitleEnv,
  state => state.navigationBar.currentProject,
  plainProjectsSelector,
  (defaultEnv, currentEnv, currentProject, projects) => {
    let project;
    if (currentProject && currentProject.id) {
      project = projects.find(p => p.project.id === currentProject.id);
    } else {
      const env = currentEnv && currentEnv.id ? currentEnv : defaultEnv;
      project = env && projects.find(p => p.environment.id === env.id);
    }
    return project ? { ...project, ...project.project } : {};
  }
);

export const currentTitleSelector = createSelector(
  currentProjectSelector,
  project => (project ? project.title : {})
);

export const currentTitleEnvSelector = createSelector(
  currentProjectSelector,
  project => (project ? project.environment : {})
);

export const currentEnvSelector = createSelector(
  currentTitleEnvSelector,
  currentTitleSelector,
  currentProjectSelector,
  plainProjectsSelector,
  (env, title, project, projects) => {
    const plainEnvProject =
      env && projects.find(p => p.environment && p.environment.id === env.id);
    return {
      id: env?.id,
      shortType: env?.shortType,
      title: title?.id,
      project: project?.id,
      type: env?.type,
      contentTypeId: plainEnvProject?.environment.contentTypeId,
    };
  }
);

export const currentEnvDetailsSelector = createSelector(
  currentEnvSelector,
  plainProjectsSelector,
  (env, projects) => {
    const current =
      env && projects && projects.find(e => e.environment.id === env.id);
    return current ? current.environment : undefined;
  }
);

export const currentCompaniesSelector = createSelector(
  currentProjectSelector,
  plainProjectsSelector,
  (project, projects = []) => {
    const current = project && projects.find(p => p.project.id === project.id);
    return get(current, 'project.companies', []);
  }
);

export const userCompaniesSelector = createSelector(
  userMembershipsSelector,
  contentTypesSelector,
  (memberships, contentTypes) => {
    if (Object.keys(contentTypes).length === 0) return false;
    const companyCT = contentTypes.find(ct => ct.model === 'company');
    const companies = memberships.map(({ companyId: id, companyName }) => ({
      id,
      companyName,
      contentTypeId: companyCT.id,
    }));
    return companies;
  }
);
