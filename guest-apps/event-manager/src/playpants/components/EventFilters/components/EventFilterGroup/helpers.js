import capitalize from 'lodash/capitalize';
import sortBy from 'lodash/sortBy';
import {
  PLATFORM_FILTERS,
  ENV_TYPE_FILTERS,
} from 'dw/core/components/EventsCalendar/constants';
import { sortByOrder } from '../../helpers';

/**
 * Order the project names and get the index of the selected project name
 * @param {*} projectName
 */
const getProjectIndex = (projectName, projectCheckboxes) =>
  sortBy(Object.keys(projectCheckboxes)).findIndex(p => p === projectName);

/**
 * Gets the value used for determining the class for the relevant
 * environment/platform/project checkbox
 * @param {*} group
 * @param {*} value
 * @param {*} projectCheckboxes
 */
export const getClassValue = (group, value, projectCheckboxes) => {
  switch (group) {
    case 'environments':
      return ENV_TYPE_FILTERS[value];
    case 'projects':
      return getProjectIndex(value, projectCheckboxes);
    default:
      return value;
  }
};

const expectedOrder = {
  projects: null,
  environments: ['live', 'development'],
  platforms: PLATFORM_FILTERS,
  demonwareEvents: ['criticalEvents', 'maintenance', 'incidents'],
};

export const getSortedItems = (items, groupName) =>
  expectedOrder[groupName] === null
    ? items
    : sortByOrder(items, expectedOrder[groupName]);

const expectedSlice = {
  platforms: 5,
  eventManager: 0,
  abTesting: 0,
  demonwareEvents: 0,
};

export const getSlicedItems = (items, groupName) => {
  const slice =
    expectedSlice[groupName] !== undefined ? expectedSlice[groupName] : 3;
  return items.slice(0, slice);
};

export const checkboxOrGroupSelected = (checkboxGroup, subgroup = null) => {
  if (typeof checkboxGroup === 'object') {
    if (subgroup && subgroup.name in checkboxGroup) {
      return Object.values(checkboxGroup[subgroup.name]).every(subCheck =>
        checkboxOrGroupSelected(subCheck)
      );
    }
    return Object.values(checkboxGroup).every(subCheck =>
      checkboxOrGroupSelected(subCheck)
    );
  }
  return checkboxGroup === true;
};

export const checkboxOrGroupPartialSelected = checkboxGroup => {
  if (typeof checkboxGroup !== 'object') return false;
  return Object.values(checkboxGroup).some(
    check =>
      check === true ||
      (typeof check === 'object' &&
        Object.values(check).some(
          subCheck =>
            subCheck === true || checkboxOrGroupPartialSelected(subCheck)
        ))
  );
};

export const capitalizeLabel = (group, item) =>
  group.name === 'abTesting' ? capitalize(item.name) : item.name;
