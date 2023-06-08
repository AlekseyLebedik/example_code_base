import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { getStartEndRange } from 'dw/core/components/EventsCalendar/helpers';
import {
  getClassValue,
  getSortedItems,
  getSlicedItems,
  checkboxOrGroupSelected,
  checkboxOrGroupPartialSelected,
} from './helpers';
import EventFilterGroupStateless from './presentational';
import {
  SOURCES_EVENT_TYPES,
  FILTER_KEYS,
  NON_VISIBLE_FILTERS_PATH,
} from './constants';

const EventFiltersGroup = ({
  filters,
  classes,
  group,
  onFetchEvents,
  setCalendarSettings,
}) => {
  const { items: totalItems, name: groupName, groupProps } = group;
  const sortedItems = useMemo(
    () => getSortedItems(totalItems, groupName),
    [totalItems, groupName]
  );
  const [isExtended, setExtended] = useState(false);
  const handleToggleExtend = () => {
    setExtended(value => !value);
  };
  const filteredItems = useMemo(
    () => (isExtended ? sortedItems : getSlicedItems(sortedItems, groupName)),
    [isExtended, sortedItems, groupName]
  );

  const sliceCount = useMemo(
    () => getSlicedItems(sortedItems, groupName).length,
    [sortedItems, groupName]
  );

  const { groupLoadingStatuses, numberOfDays, selectedDay, selectedStyle } =
    useSelector(state => state.Core.EventsCalendar, isEqual);

  const expyTestsEnabled = totalItems.find(
    item => item.name === 'demonwareExpyTesting'
  );

  const groupFilters = useMemo(
    () =>
      (filters &&
        ((filters?.sources &&
          ((groupName === 'abTesting' && {
            demonwareABTesting: filters?.sources?.abTesting,
            ...(expyTestsEnabled
              ? { demonwareExpyTesting: filters?.sources?.expyTests }
              : {}),
          }) ||
            filters.sources[groupName])) ||
          (filters?.externalEvents && filters.externalEvents[groupName]) ||
          filters[groupName])) ||
      {},
    [expyTestsEnabled, filters, groupName]
  );

  // Object containing a bool/object for checkboxes selected. Example:
  // { filterA: true, filterB: false, filterWithItems: { filterC: true, filterD: false }, ...}
  const [filtersCheckboxes, setGroupItemsChecked] = useState(groupFilters);
  useEffect(() => setGroupItemsChecked(groupFilters), [groupFilters]);

  const getCheckboxColor = useCallback(
    filter => {
      const { name, isGroup, items } = filter;
      const hasChildren = isGroup || items;
      return hasChildren || selectedStyle !== groupName
        ? classes.defaultCheckbox
        : classes[
            `filters-${groupName}-${getClassValue(
              groupName,
              name,
              filters?.projects
            )}`
          ];
    },
    [selectedStyle, filters, groupName, classes]
  );

  const displayShowAllButton = totalItems.length > sliceCount;

  const getCheckboxSelected = useCallback(
    (filter, parentItem = undefined) =>
      parentItem
        ? checkboxOrGroupSelected(
            filtersCheckboxes[parentItem.name][filter.name]
          )
        : checkboxOrGroupSelected(filtersCheckboxes[filter.name]),
    [filtersCheckboxes]
  );

  const getSubgroupSelected = useCallback(
    subgroup =>
      subgroup.items && checkboxOrGroupSelected(filtersCheckboxes, subgroup),
    [filtersCheckboxes]
  );

  const getSubgroupPartialSelected = useCallback(
    subgroup =>
      subgroup.items && checkboxOrGroupPartialSelected(filtersCheckboxes),
    [filtersCheckboxes]
  );

  const isGroupSelected = checkboxOrGroupSelected(filtersCheckboxes);

  const isGroupPartialSelected =
    checkboxOrGroupPartialSelected(filtersCheckboxes);

  const isStyleSelected = useMemo(
    () => selectedStyle === groupName,
    [selectedStyle, groupName]
  );

  // Format settings into calendar filters format
  const getFilterKey = useCallback(key => FILTER_KEYS[key] || key, []);
  const updateCalendarFilterSettings = useCallback(
    selectedValue => {
      let updatedSettings;
      if (groupName === 'abTesting') {
        updatedSettings = {
          demonwareABTesting: cloneDeep(filters.sources.abTesting),
          ...(expyTestsEnabled
            ? { demonwareExpyTesting: cloneDeep(filters.sources.expyTests) }
            : {}),
        };
      } else {
        updatedSettings = cloneDeep(get(filters, getFilterKey(groupName), {}));
      }
      Object.entries(selectedValue).forEach(([key, value]) => {
        const nonVisibleKeys = cloneDeep(
          get(updatedSettings, NON_VISIBLE_FILTERS_PATH[key])
        );
        if (nonVisibleKeys) {
          Object.keys(nonVisibleKeys).forEach(i => {
            nonVisibleKeys[i] = value;
          });
          set(updatedSettings, NON_VISIBLE_FILTERS_PATH[key], nonVisibleKeys);
        } else if (groupName === 'abTesting') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            updatedSettings[key][subKey] = subValue;
          });
        } else {
          set(updatedSettings, getFilterKey(key), selectedValue[key]);
        }
      });
      const filtersCopy = cloneDeep(filters);
      if (groupName === 'abTesting') {
        let updatedABTestingSettings = set(
          { filters: filtersCopy, selectedStyle },
          `filters.sources.abTesting`,
          updatedSettings.demonwareABTesting
        );
        if (expyTestsEnabled) {
          updatedABTestingSettings = set(
            updatedABTestingSettings,
            `filters.sources.expyTests`,
            updatedSettings.demonwareExpyTesting
          );
        }
        setCalendarSettings(updatedABTestingSettings);
      } else {
        setCalendarSettings(
          set(
            { filters: filtersCopy, selectedStyle },
            `filters.${getFilterKey(groupName)}`,
            updatedSettings
          )
        );
      }
    },
    [
      setCalendarSettings,
      filters,
      selectedStyle,
      groupName,
      getFilterKey,
      expyTestsEnabled,
    ]
  );

  const handleRefetchGroup = useCallback(() => {
    const [startRange, endRange] = getStartEndRange(selectedDay, numberOfDays);
    onFetchEvents([getFilterKey(groupName)], startRange, endRange);
  }, [selectedDay, numberOfDays, groupName, onFetchEvents, getFilterKey]);

  const handleToggleCheck = useCallback(
    (filter, parentFilter = undefined) => {
      const newChecked = cloneDeep(filtersCheckboxes);
      if (filter.isGroup) {
        Object.entries(newChecked).forEach(([key, value]) => {
          if (typeof value === 'object') {
            Object.keys(value).forEach(subKey => {
              newChecked[key][subKey] = !isGroupSelected;
            });
          } else {
            newChecked[key] = !isGroupSelected;
          }
        });
      } else if (typeof newChecked[filter.name] === 'object') {
        // Normal checkbox on UI that combines several filters (e.g. Holidays, PMG...)
        const allChecked = checkboxOrGroupSelected(newChecked[filter.name]);
        Object.keys(newChecked[filter.name]).forEach(subKey => {
          newChecked[filter.name][subKey] = !allChecked;
        });
      } else if (!filter.isGroup && !filter.isSubgroup && parentFilter) {
        newChecked[parentFilter.name][filter.name] =
          !filtersCheckboxes[parentFilter.name][filter.name];
      } else {
        newChecked[filter.name] = !filtersCheckboxes[filter.name];
      }
      setGroupItemsChecked(newChecked);
      updateCalendarFilterSettings(newChecked);
      if (SOURCES_EVENT_TYPES.includes(groupName)) {
        handleRefetchGroup();
      }
    },
    [
      filtersCheckboxes,
      getSubgroupSelected,
      groupName,
      handleRefetchGroup,
      isGroupSelected,
      updateCalendarFilterSettings,
    ]
  );

  const handleSetSelectedGroup = useCallback(
    () =>
      setCalendarSettings({
        selectedStyle: groupName === selectedStyle ? 'nogroup' : groupName,
      }),
    [setCalendarSettings, selectedStyle, groupName]
  );

  const newProps = {
    group,
    items: filteredItems,
    getCheckboxSelected,
    getSubgroupSelected,
    getSubgroupPartialSelected,
    isGroupSelected,
    isGroupPartialSelected,
    isStyleSelected,
    isExtended,
    handleToggleExtend,
    displayShowAllButton,
    handleSetSelectedGroup,
    getCheckboxColor,
    classes,
    setCalendarSettings,
    handleToggleCheck,
    error: groupProps?.loading?.error,
    isLoading: groupProps?.loading?.isLoading,
    disableTooltip: !SOURCES_EVENT_TYPES.includes(groupName),
    ...(SOURCES_EVENT_TYPES.includes(groupName) && {
      ...groupLoadingStatuses[groupName],
      handleRefetchGroup,
    }),
  };

  return <EventFilterGroupStateless {...newProps} />;
};
EventFiltersGroup.propTypes = {
  filters: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.shape({
    items: PropTypes.array,
    name: PropTypes.string,
    groupProps: PropTypes.object,
  }),
  onFetchEvents: PropTypes.func,
  setCalendarSettings: PropTypes.func,
};

EventFiltersGroup.defaultProps = {
  filters: {},
  classes: {},
  group: {
    items: [],
    name: '',
    groupProps: {},
  },
  onFetchEvents: () => {},
  setCalendarSettings: () => {},
};

export default EventFiltersGroup;
