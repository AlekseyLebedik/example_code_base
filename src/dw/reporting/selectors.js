import { createSelector } from 'reselect';
import {
  PROJECT_NAME_TRANSFORMATION_EXCEPTIONS,
  PROJECT_NAME_MAP,
} from './constants';

const stateSelector = state => state;

const franchisesSelector = createSelector(
  stateSelector,
  state => state && state.reporting && state.reporting.franchises
);

const franchiseDataSelector = createSelector(
  stateSelector,
  state => state && state.reporting && state.reporting.franchiseData
);

const franchiseIdSelector = (_, props) => props.match.params.franchiseId;

const projectIdSelector = (_, props) => props.match.params.projectId;

const selectedFranchiseSelector = createSelector(
  franchisesSelector,
  franchiseIdSelector,
  (franchises, franchiseId) => {
    if (franchises === undefined) return undefined;
    return franchises && franchiseId
      ? franchises.find(f => String(f.id) === String(franchiseId)) || undefined
      : null;
  }
);

const selectedProjectSelector = createSelector(
  selectedFranchiseSelector,
  projectIdSelector,
  (franchise, projectId) => {
    if (franchise === undefined || projectId === undefined) return undefined;
    return franchise && projectId
      ? franchise.projects.find(p => String(p.id) === String(projectId)) ||
          undefined
      : null;
  }
);

const getProjectName = (franchiseName, projectName) => {
  if (PROJECT_NAME_TRANSFORMATION_EXCEPTIONS.includes(franchiseName))
    return projectName;
  let newProjectName = projectName.replace(franchiseName, '').trim();
  if (newProjectName.charAt(0) === ':') {
    newProjectName = newProjectName.slice(1).trim();
  }
  newProjectName = PROJECT_NAME_MAP[newProjectName] || newProjectName;
  return newProjectName;
};

export {
  franchisesSelector,
  franchiseIdSelector,
  selectedFranchiseSelector,
  selectedProjectSelector,
  franchiseDataSelector,
  getProjectName,
};
