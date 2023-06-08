import history from 'dw/core/helpers/history';
import { projectsSelector } from './selectors';
import * as AT from './actionTypes';

export const setProject = project => ({
  type: AT.CHANGE_PROJECT,
  project,
});

export const setProjectFromUnsafeSource =
  initialProjectId => (dispatch, getState) => {
    const state = getState();
    const projects = projectsSelector(state);
    const project = projects.find(({ id }) => id === Number(initialProjectId));
    if (project) dispatch(setProject(project));
    else history.push('/404');
  };
export const fetchConfiguredProjects = userTitlesId => ({
  type: AT.CONFIGURED_PROJECTS_FETCH,
  userTitlesId,
});
export const fetchConfiguredProjectsSucceed = params => ({
  type: AT.CONFIGURED_PROJECTS_FETCH_SUCCESS,
  ...params,
});

export const fetchConfiguredProjectsFailed = error => ({
  type: AT.CONFIGURED_PROJECTS_FETCH_FAILED,
  message: error.message,
});
