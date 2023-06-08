import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import { useSelector } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { getFilterRowData, isFilterChecked } from './helpers';

import FiltersTableCell from './components/FiltersTableCell';
import TagFilters from './components/TagFilters';

import { GRID_OPTIONS } from './constants';

import styles from './index.module.css';

export const FiltersTableBase = ({
  classes,
  disabledFilters,
  eventGroups,
  onFetchEvents,
  setCalendarSettings,
}) => {
  const filters = useSelector(state => state.Core.EventsCalendar.filters);
  const [expandedClass, setExpandedClass] = useState(
    styles.calendarOptionsExpanded
  );
  const [initialNodesExpanded, setInitialNodesExpanded] = useState([]);
  const [filter, setFilter] = useState('');
  const [gridApi, setGridApi] = useState();

  const updateGridValues = useCallback(
    api => {
      api.forEachNode(node => {
        node.setSelected(isFilterChecked(filters, node));
      });
    },
    [filters]
  );

  const setExpandedStyle = expanded => {
    setExpandedClass(
      expanded
        ? styles.calendarOptionsExpanded
        : styles.calendarOptionsCompressed
    );
  };
  const [prevGamertags, setPrevGamertags] = useState(filters.gamertags);
  useEffect(() => {
    setPrevGamertags(filters.gamertags);
  }, [filters.gamertags]);
  useEffect(() => {
    const hasChangedGamertagFilterOptions = !isEqual(
      sortBy(Object.keys(filters.gamertags)),
      sortBy(Object.keys(prevGamertags))
    );
    if (hasChangedGamertagFilterOptions && gridApi) {
      gridApi.setRowData(getFilterRowData(filters, disabledFilters));
    }
  }, [gridApi, disabledFilters, filters.gamertags, prevGamertags]);

  const updateExpandedNodeState = value => {
    if (!filter) {
      // save expanded node state on initial search
      const tempNodes = [];
      gridApi.forEachNode(node => {
        if (node.expanded) {
          tempNodes.push(node.key);
        }
      });
      setInitialNodesExpanded(tempNodes);
    } else if (value.length === 0) {
      // revert nodes expanded state to initial setting on clear
      gridApi.forEachNode(node => {
        if (initialNodesExpanded.includes(node.key)) {
          node.setExpanded(true);
        } else {
          node.setExpanded(false);
        }
      });
      setInitialNodesExpanded([]);
    }
  };

  const onFilterTextBoxChanged = value => {
    gridApi.setQuickFilter(value);
    if (value) gridApi.forEachNode(node => node.setExpanded(true));
  };

  const handleUpdateFilter = value => {
    updateExpandedNodeState(value);
    setFilter(value);
    onFilterTextBoxChanged(value);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setRowData(getFilterRowData(filters, disabledFilters));
    }
  }, [disabledFilters, gridApi]);

  useEffect(() => {
    if (gridApi) {
      updateGridValues(gridApi);
    }
  }, [filters, disabledFilters, gridApi, updateGridValues]);

  return (
    <div
      className={styles.sidebarFilters}
      onMouseEnter={() => setCalendarSettings({ sidebarHovering: true })}
      onMouseLeave={() => setCalendarSettings({ sidebarHovering: false })}
    >
      <TextField
        className={styles.search}
        onChange={({ target: { value } }) => handleUpdateFilter(value)}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
          endAdornment: filter && (
            <InputAdornment position="end">
              <Tooltip title="Clear Filtering">
                <IconButton onClick={() => handleUpdateFilter('')}>
                  <Icon>clear</Icon>
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        placeholder="Search filter options"
        value={filter}
      />
      <Divider className={styles.divider} variant="middle" />
      <div
        className={classNames(
          styles.calendarOptionsSources,
          expandedClass,
          'ag-theme-material'
        )}
      >
        <AgGridReact
          {...GRID_OPTIONS}
          components={{ filtersTableCell: FiltersTableCell }}
          context={{
            classes,
            eventGroups,
            onFetchEvents,
            setCalendarSettings,
            setExpandedStyle,
          }}
          onGridReady={({ api }) => {
            setGridApi(api);
            api.setRowData(getFilterRowData(filters, disabledFilters));
            updateGridValues(api);
          }}
          rowClass={styles.calendarEventStatus}
        />
      </div>
      <TagFilters classes={classes} setCalendarSettings={setCalendarSettings} />
    </div>
  );
};

FiltersTableBase.propTypes = {
  classes: PropTypes.object.isRequired,
  disabledFilters: PropTypes.object.isRequired,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFetchEvents: PropTypes.func.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
};

export default FiltersTableBase;
