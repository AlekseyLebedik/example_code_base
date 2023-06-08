import history from 'dw/core/helpers/history';

import { projectsSelector } from 'dw/core/helpers/title-env-selectors';

import { CHANGE_TITLE } from './actionTypes';
import { findEnvironmentFromTitleId } from './helpers';

export function setTitle(project, title, environment) {
  return {
    type: CHANGE_TITLE,
    project: {
      id: project.id,
      name: project.name,
      contentTypeId: project.contentTypeId,
    },
    title: {
      id: title.id,
      name: title.name,
      platform: title.platform,
      external: title.external,
    },
    environment: {
      id: environment.id,
      type: environment.type,
      shortType: environment.shortType,
    },
  };
}

export function setTitleFromUnsafeSource(initialTitleId, initialEnvType) {
  return (dispatch, getState) => {
    const state = getState();
    const projects = projectsSelector(state);

    // Ensure the types of {titleId, envType} for the find method
    const titleId = Number(initialTitleId);
    const envType = String(initialEnvType);

    // Search for the requested {title, env}
    const res = findEnvironmentFromTitleId(projects, titleId, envType);

    if (res) {
      dispatch(setTitle(res.project, res.title, res.environment));
    } else {
      history.push('/404');
    }
  };
}
