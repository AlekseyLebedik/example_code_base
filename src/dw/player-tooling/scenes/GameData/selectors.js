import { createSelector } from 'reselect';
import { plainProjectsSelector } from 'dw/core/helpers/title-env-selectors';

export const titleNameSelector = createSelector(
  plainProjectsSelector,
  projects => titleId => {
    if (projects && titleId) {
      const { title } =
        projects.find(p => p.title.id === parseInt(titleId, 10)) || {};
      return title?.name || titleId;
    }
    return null;
  }
);

export const titlePlatformSelector = createSelector(
  plainProjectsSelector,
  projects => titleId => {
    if (projects && titleId) {
      const { title } =
        projects.find(p => p.title.id === parseInt(titleId, 10)) || {};
      return title?.platform || null;
    }
    return null;
  }
);
