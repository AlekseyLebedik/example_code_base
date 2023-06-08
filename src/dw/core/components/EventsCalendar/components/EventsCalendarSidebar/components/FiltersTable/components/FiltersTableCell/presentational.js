import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from 'dw/core/components/IconButton';

import styles from 'dw/core/components/EventsCalendar/components/EventsCalendarSidebar/components/FiltersTable/index.module.css';

import { GROUP_NAME_MAP } from '../../constants';

const CalendarSidebarCellStateless = ({
  checkboxColor,
  classes,
  error,
  filterGroup,
  filterPath,
  handleRefetchGroup,
  isLoading,
  isPartialSelected,
  node: { expanded, group: isGroup, key: nodeKey, level, selected },
  selectedStyle,
  setCalendarSettings,
  sidebarHovering,
  toggleGroupsExpanded,
  toggleSelectedFilters,
}) => {
  const checkboxLabel = GROUP_NAME_MAP[nodeKey] || nodeKey;
  const disableTooltip = !error || !isGroup;
  const showExpandButton =
    isGroup && (!isLoading || (isLoading && !selected)) && !error;
  const showLoadingIcon = isLoading && selected;
  const disabledCheckbox =
    !isGroup && filterGroup === 'platforms' && nodeKey === 'Multiple';

  const rowClass =
    filterGroup === 'sources'
      ? classNames({
          [styles.calendarSidebarFilterGroup]: !level,
          [styles.calendarSidebarSourceGroup]: level === 1,
          [styles.calendarSidebarProp]: level === 2 && !isGroup,
          [styles.calendarSidebarPropGroup]: level === 2 && isGroup,
          [styles.calendarSidebarSubProp]: level === 3,
        })
      : classNames({
          [styles.calendarSidebarFilterGroup]: isGroup,
          [styles.calendarSidebarSourceGroupNoExpand]: !isGroup,
        });
  const [, ...groupPath] = filterPath;

  if (groupPath[0] === 'abTesting') {
    if (groupPath[1] === 'killed') {
      return null;
    }
  }
  return (
    <div className={rowClass}>
      <div
        className={classNames({
          [styles.calendarSidebarFilterGroupCheckbox]: !level,
        })}
      >
        {showExpandButton && (
          <IconButton
            className={styles.filterGroupIcon}
            icon={expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
            onClick={toggleGroupsExpanded}
            tooltip={expanded ? 'Compress' : 'Expand'}
          />
        )}
        <FormControlLabel
          checked={selected}
          classes={{ root: classes.checkboxLabel }}
          control={
            showLoadingIcon ? (
              <div className={styles.loadingSourceIcon}>
                <CircularProgress disableShrink size={18} thickness={10} />
              </div>
            ) : (
              <Tooltip
                disableFocusListener={disableTooltip}
                disableHoverListener={disableTooltip}
                disableTouchListener={disableTooltip}
                title={`Click to retry ${checkboxLabel} source fetch`}
              >
                <Checkbox
                  {...(error
                    ? {
                        checkedIcon: <Icon>warning</Icon>,
                        icon: <Icon>warning</Icon>,
                        onClick: handleRefetchGroup,
                      }
                    : {})}
                  classes={{
                    checked: classes.checked,
                    root: classNames(checkboxColor, classes.choice),
                  }}
                  disableRipple
                  disabled={disabledCheckbox}
                  indeterminate={isPartialSelected}
                  onChange={!error ? toggleSelectedFilters : () => {}}
                />
              </Tooltip>
            )
          }
          key={`calendarEventSelector/${nodeKey}`}
          label={checkboxLabel}
        />
      </div>
      {!level && sidebarHovering && filterGroup !== 'gamertags' && (
        <Tooltip title={`Color by Event ${nodeKey}`} placement="right">
          <Radio
            checked={selectedStyle === nodeKey}
            color="primary"
            disableRipple
            onChange={() => setCalendarSettings({ selectedStyle: nodeKey })}
            size="small"
          />
        </Tooltip>
      )}
    </div>
  );
};

CalendarSidebarCellStateless.propTypes = {
  checkboxColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  filterGroup: PropTypes.string.isRequired,
  filterPath: PropTypes.string.isRequired,
  handleRefetchGroup: PropTypes.func,
  isLoading: PropTypes.bool,
  isPartialSelected: PropTypes.bool.isRequired,
  node: PropTypes.object.isRequired,
  selectedStyle: PropTypes.string.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  sidebarHovering: PropTypes.bool.isRequired,
  toggleGroupsExpanded: PropTypes.func.isRequired,
  toggleSelectedFilters: PropTypes.func.isRequired,
};
CalendarSidebarCellStateless.defaultProps = {
  error: null,
  handleRefetchGroup: null,
  isLoading: false,
};

export default CalendarSidebarCellStateless;
