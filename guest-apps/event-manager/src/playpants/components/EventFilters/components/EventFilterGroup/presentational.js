import React, { Fragment } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import styles from './presentational.module.css';
import { GROUP_NAME_MAP } from './constants';
import { capitalizeLabel } from './helpers';

const useButtonStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.caption.fontSize,
  },
}));

const EventFilterGroupStateless = ({
  items,
  group,
  getCheckboxColor,
  getCheckboxSelected,
  getSubgroupSelected,
  getSubgroupPartialSelected,
  isGroupSelected,
  isGroupPartialSelected,
  isStyleSelected,
  isExtended,
  classes,
  displayShowAllButton,
  disableTooltip,
  handleToggleExtend,
  handleSetSelectedGroup,
  handleToggleCheck,
  handleRefetchGroup,
  isLoading,
  error,
}) => {
  const { groupProps: { subGroups = null } = {}, name: groupName } = group;
  const buttonClasses = useButtonStyles();

  const hasError = (groupError, filterItem, subGroupItems) =>
    (!filterItem.isSubgroup && groupError) ||
    (filterItem.isSubgroup && subGroupItems[filterItem.name]?.loading?.error);

  const renderListItem = (key, item, isError, idx = 0, parentItem = null) => {
    const isSelected = item.items
      ? getSubgroupSelected(item)
      : getCheckboxSelected(item, parentItem);
    const isPartialSelected =
      !isSelected && (item.items ? getSubgroupPartialSelected(item) : false);
    if (item.name === 'killed') {
      return null;
    }
    return (
      <ListItem
        key={key}
        className={cn(styles.listItem, {
          [styles.listItemSubGroup]: Boolean(idx) && Boolean(item.items),
        })}
      >
        <ListItemIcon classes={{ root: styles.listItemIcon }}>
          <Checkbox
            edge="start"
            checked={isSelected}
            indeterminate={isPartialSelected}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': item.name }}
            classes={{
              checked: classes.checked,
              root: cn(getCheckboxColor(item), classes.choice, styles.checkbox),
            }}
            onChange={() => handleToggleCheck(item, parentItem)}
            {...(isError
              ? {
                  checkedIcon: <Icon>warning</Icon>,
                  icon: <Icon>warning</Icon>,
                  onClick: handleRefetchGroup,
                }
              : {})}
          />
        </ListItemIcon>
        <ListItemText
          id={item.name}
          className={styles.listItemText}
          classes={{ primary: classes.checkboxLabelItem }}
          primary={GROUP_NAME_MAP[item.name] || capitalizeLabel(group, item)}
          disableTypography
        />
      </ListItem>
    );
  };

  return (
    <List className={styles.list}>
      <div className={styles.listSubheader}>
        <FormControlLabel
          checked={isGroupSelected}
          classes={{
            root: classes.checkboxLabel,
            label: classes.checkboxLabelHeader,
          }}
          control={
            isLoading ? (
              <div className={styles.loadingSourceIcon}>
                <CircularProgress disableShrink size={18} thickness={10} />
              </div>
            ) : (
              <Tooltip
                disableFocusListener={disableTooltip}
                disableHoverListener={disableTooltip}
                disableTouchListener={disableTooltip}
                title={`Click to retry ${
                  GROUP_NAME_MAP[groupName] || groupName
                } source fetch`}
              >
                <Checkbox
                  classes={{
                    checked: classes.checked,
                    root: cn(
                      getCheckboxColor(group),
                      classes.choice,
                      styles.checkbox
                    ),
                  }}
                  disableRipple
                  indeterminate={!isGroupSelected && isGroupPartialSelected}
                  onChange={() => handleToggleCheck(group)}
                />
              </Tooltip>
            )
          }
          key={`calendarEventSelector/${groupName}`}
          label={GROUP_NAME_MAP[groupName] || groupName}
        />
        <Tooltip
          title={`Color by Event ${GROUP_NAME_MAP[groupName] || groupName}`}
          placement="right"
        >
          <Radio
            checked={isStyleSelected}
            color="primary"
            disableRipple
            onClick={handleSetSelectedGroup}
            size="small"
            className={styles.radioButton}
          />
        </Tooltip>
      </div>
      {items.map((category, itemIdx) => (
        <Fragment key={category.name}>
          {renderListItem(
            `calendarEventSelector/${category.name}`,
            category,
            hasError(error, category, subGroups),
            itemIdx
          )}
          {category.items &&
            category.items.map(subCategory => (
              <List className={styles.subListItem} key={subCategory.name}>
                {renderListItem(
                  `calendarEventSelector/${category.name}/${subCategory.name}`,
                  subCategory,
                  hasError(error, category, subGroups),
                  false,
                  category
                )}
              </List>
            ))}
        </Fragment>
      ))}
      {displayShowAllButton && (
        <Button onClick={handleToggleExtend} className={styles.showAllButton}>
          <Typography variant="button" classes={buttonClasses}>
            {isExtended ? 'Show less' : 'Show all'}
          </Typography>
        </Button>
      )}
    </List>
  );
};

EventFilterGroupStateless.propTypes = {
  items: PropTypes.array,
  group: PropTypes.object,
  getCheckboxColor: PropTypes.func,
  getCheckboxSelected: PropTypes.func,
  getSubgroupSelected: PropTypes.func,
  getSubgroupPartialSelected: PropTypes.func,
  isGroupSelected: PropTypes.bool,
  isGroupPartialSelected: PropTypes.bool,
  isStyleSelected: PropTypes.bool,
  isExtended: PropTypes.bool,
  classes: PropTypes.object,
  displayShowAllButton: PropTypes.bool,
  disableTooltip: PropTypes.bool,
  handleToggleExtend: PropTypes.func,
  handleSetSelectedGroup: PropTypes.func,
  handleToggleCheck: PropTypes.func,
  handleRefetchGroup: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

EventFilterGroupStateless.defaultProps = {
  items: [],
  group: {},
  getCheckboxSelected: () => {},
  getSubgroupSelected: () => {},
  getSubgroupPartialSelected: () => {},
  getCheckboxColor: () => {},
  isGroupSelected: false,
  isGroupPartialSelected: false,
  isStyleSelected: false,
  isExtended: false,
  classes: {},
  displayShowAllButton: false,
  disableTooltip: true,
  handleToggleExtend: () => {},
  handleSetSelectedGroup: () => {},
  handleToggleCheck: () => {},
  handleRefetchGroup: () => {},
  isLoading: false,
  error: null,
};

export default EventFilterGroupStateless;
