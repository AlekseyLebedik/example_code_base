import { createSelector } from 'reselect';
import {
  sortPlatforms,
  PLATFORMS_GROUPS_MAP,
  EXCLUDE_PLATFORMS,
} from 'dw/reporting/constants';

const franchiseProjectsSelector = (_, props) =>
  (props.franchise && props.franchise.projects) || [];

const projectsPlatformsSelector = createSelector(
  franchiseProjectsSelector,
  franchiseProjects => {
    const projectsPlatforms = {};
    franchiseProjects.forEach(p => {
      projectsPlatforms[p.id] = p.platforms.filter(
        platform => !EXCLUDE_PLATFORMS.includes(platform.platform)
      );
    });
    return projectsPlatforms;
  }
);

const platformsSelector = createSelector(
  projectsPlatformsSelector,
  projectsPlatforms => {
    const allPlatforms = [];
    Object.values(projectsPlatforms).forEach(platforms => {
      platforms.forEach(p => {
        const mapped = PLATFORMS_GROUPS_MAP[p.platform] || p.platform;
        if (!allPlatforms.includes(mapped)) allPlatforms.push(mapped);
      });
    });
    return sortPlatforms(allPlatforms);
  }
);
const getProjectPlatformsSelector = createSelector(
  projectsPlatformsSelector,
  projectsPlatforms => projectId =>
    projectsPlatforms[projectId] && sortPlatforms(projectsPlatforms[projectId])
);

export { platformsSelector, getProjectPlatformsSelector };
