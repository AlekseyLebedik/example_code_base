import flatMap from 'lodash/flatMap';
import sortBy from 'lodash/sortBy';
import { ENV_TYPE_FILTERS } from 'dw/core/components/EventsCalendar/constants';

/**
 * For a given source filter ag grid node, determine the hierarchy
 * of the filter, starting from the parent node and ending in the
 * given node.  For example, an Event Manager approved checkbox
 * would have a filter structure as follows:
 *    ['sources', 'eventManager', 'approved']
 * @param {*} node - the ag grid node of a checkbox
 */
export const getFilterPath = node => {
  const {
    data: filterData,
    key: filterKey,
    level: filterLevel,
    parent: filterParent,
  } = node;
  let filterPath;
  if (filterData) ({ filterPath } = filterData);
  else if (filterLevel > 1 && node.group)
    filterPath = [filterParent.parent.key, filterParent.key, filterKey];
  else if (filterLevel) filterPath = [filterParent.key, filterKey];
  else filterPath = [filterKey];
  return {
    filterGroup: filterPath[0],
    filterLevel,
    filterPath,
    groupName: filterPath[1],
  };
};

/**
 * For a checkbox, assign the new selected value, or for a group,
 * assign the selected value for all it's children
 * @param {*} checkboxes - the object of checkboxes and their selected status
 * @param {*} selected   - the updated selected status
 */
export const toggleCheckboxSelected = (checkboxes, selected) =>
  Object.keys(checkboxes).forEach(boxKey => {
    if (typeof checkboxes[boxKey] === 'object') {
      toggleCheckboxSelected(checkboxes[boxKey], selected);
    } else {
      // eslint-disable-next-line no-param-reassign
      checkboxes[boxKey] = selected;
    }
  });

/**
 * Checks if any individual platforms are checked, ignoring
 * the Multiple and Unspecified checkboxes
 * @param {*} platformCheckboxes
 */
export const anyPlatformsChecked = platformCheckboxes =>
  !!Object.entries(platformCheckboxes).find(
    ([p, checked]) => p !== 'Multiple' && p !== 'Unspecified' && checked
  );

const setFilterPath = (obj, group) =>
  Object.keys(obj).map(key => ({
    filterPath: [group, key],
  }));

const setFilterPathRecursive = (obj, groupName, filterPath = []) =>
  flatMap(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'boolean')
        return { filterPath: [...filterPath, groupName, key] };
      return setFilterPathRecursive(value, key, [...filterPath, groupName]);
    })
  );

export const getFilterRowData = (
  { environments, gamertags, platforms, projects, sources, stories },
  disabledFilters
) => [
  ...setFilterPath(environments, 'environments'),
  ...setFilterPath(platforms, 'platforms'),
  ...setFilterPath(projects, 'projects'),
  ...setFilterPathRecursive(sources, 'sources'),
  ...(!disabledFilters.stories ? setFilterPath(stories, 'stories') : []),
  ...setFilterPath(gamertags, 'gamertags'),
];

/**
 * Checks if a node is checked using its path and
 * eventsCalendarSettings.filters values
 * @param {*} filterSettings
 * @param {*} node
 */
export const isFilterChecked = (filterSettings, node) => {
  let values;
  if (node.data) {
    // Child node with filterPath
    const { filterPath, value } = node.data;
    return value === 'Multiple'
      ? anyPlatformsChecked(filterSettings.platforms)
      : filterPath.reduce((a, b) => a[b], filterSettings);
  }
  if (node.level === 0) {
    // Main filter group such as projects/platforms
    values = Object.values(filterSettings[node.key]).flatMap(v =>
      typeof v === 'object' ? Object.values(v) : v
    );
  } else if (node.level === 2 && node.group) {
    // groups with 4th layer such as holidays
    values = Object.values(
      filterSettings[node.parent.parent.key][node.parent.key][node.key]
    );
  } else {
    // 2nd layer groups such as EventManager, AbTesting
    values = Object.values(filterSettings[node.parent.key][node.key]);
  }
  values = Object.values(values).flatMap(v =>
    typeof v === 'object' ? Object.values(v) : v
  );
  return flatMap(values).some(v => v);
};

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
  if (group === 'environments') return ENV_TYPE_FILTERS[value];
  if (group === 'projects') return getProjectIndex(value, projectCheckboxes);
  return value;
};
