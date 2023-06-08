import React from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { showAllColorsSelector } from 'dw/core/components/EventsCalendar/selectors';

import {
  getStartEndRange,
  selectGroup,
} from 'dw/core/components/EventsCalendar/helpers';
import {
  getClassValue,
  getFilterPath,
  toggleCheckboxSelected,
} from '../../helpers';

import StatelessFiltersTableCell from './presentational';

export const FiltersTableCellBase = ({
  api,
  context: {
    classes,
    eventGroups,
    onFetchEvents,
    setCalendarSettings,
    setExpandedStyle,
  },
  node,
  showAllColors,
}) => {
  const {
    filters,
    groupLoadingStatuses,
    numberOfDays,
    selectedDay,
    selectedStyle,
    sidebarHovering,
  } = useSelector(state => state.Core.EventsCalendar);

  const { filterGroup, filterPath, groupName } = getFilterPath(node);

  const toggleGroupsExpanded = () => {
    if (node.group) {
      node.setExpanded(!node.expanded);
      if (!node.level) {
        setExpandedStyle(node.expanded);
      }
      api.refreshCells();
    }
  };

  const getCheckboxColor = () => {
    if (filterGroup === 'sources') {
      const { error } = groupLoadingStatuses[groupName] || {};
      if (error) {
        return selectedStyle === 'sources'
          ? classes.loadingErrorIcon
          : classes.loadingErrorIconColorsOff;
      }
      if (selectedStyle !== 'sources' || !node.level) {
        return classes.defaultCheckbox;
      }
      const group = selectGroup(eventGroups, groupName) || {};
      const colorKey = node.level > 2 ? node.parent.key : node.key;
      return group.classes
        ? group.classes[
            `${groupName}-${showAllColors ? colorKey : groupName}-checked`
          ]
        : '';
    }
    const { key, group } = node;
    return group || selectedStyle !== filterGroup
      ? classes.defaultCheckbox
      : classes[
          `filters-${filterGroup}-${getClassValue(
            filterGroup,
            key,
            filters.projects
          )}`
        ];
  };

  const isPartialSelected = () => {
    const { allLeafChildren } = node;
    const numSelected = allLeafChildren.reduce(
      (acc, cur) => acc + cur.selected,
      0
    );
    return numSelected > 0 && numSelected < allLeafChildren.length;
  };

  const handleRefetchGroup = () => {
    const [startRange, endRange] = getStartEndRange(selectedDay, numberOfDays);
    onFetchEvents([groupName], startRange, endRange);
  };

  const updateCalendarFilterSettings = (single, group, selected) => {
    const updatedSettings = { ...filters[filterGroup] };

    if (filterGroup === 'sources') {
      const [, ...groupPath] = filterPath;
      if (!groupPath.length) {
        // Sources row clicked, toggle all groups
        Object.values(updatedSettings).forEach(grp => {
          toggleCheckboxSelected(grp, selected);
        });
      } else if (group) {
        // Event group clicked, toggle all options
        const checkboxes = groupPath.reduce((a, b) => a[b], updatedSettings);
        toggleCheckboxSelected(checkboxes, selected);
      } else {
        // Single source option clicked, toggle selected
        const option = groupPath.pop();
        const checkboxes = groupPath.reduce((a, b) => a[b], updatedSettings);
        checkboxes[option] = selected;
      }
    } else if (group) {
      // Non-source filter group clicked
      toggleCheckboxSelected(updatedSettings, selected);
    } else if (single) {
      // Non-source single filter option clicked
      updatedSettings[single] = selected;
    }

    setCalendarSettings({
      filters: {
        ...filters,
        [filterGroup]: updatedSettings,
      },
    });
  };

  const toggleSelectedFilters = () => {
    const { data, group, key, selected } = node;
    const selectorValue = (data && data.value) || key;
    updateCalendarFilterSettings(selectorValue, group, !selected);
  };

  const newProps = {
    checkboxColor: getCheckboxColor(),
    classes,
    filterGroup,
    filterPath,
    isPartialSelected: isPartialSelected(),
    node,
    selectedStyle,
    setCalendarSettings,
    sidebarHovering,
    toggleGroupsExpanded,
    toggleSelectedFilters,
    ...(groupName &&
      filterGroup === 'sources' && {
        ...groupLoadingStatuses[groupName],
        handleRefetchGroup,
      }),
  };

  return <StatelessFiltersTableCell {...newProps} />;
};

FiltersTableCellBase.propTypes = {
  api: PropTypes.object,
  context: PropTypes.shape({
    classes: PropTypes.object.isRequired,
    eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    onFetchEvents: PropTypes.func.isRequired,
    setCalendarSettings: PropTypes.func.isRequired,
    setExpandedStyle: PropTypes.func.isRequired,
  }).isRequired,
  node: PropTypes.object.isRequired,
  showAllColors: PropTypes.bool.isRequired,
};

FiltersTableCellBase.defaultProps = {
  api: {},
};

const mapStateToProps = state => ({
  showAllColors: showAllColorsSelector(state),
});

export default connect(mapStateToProps)(FiltersTableCellBase);
