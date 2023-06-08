import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from 'dw/core/components/IconButton';
import CustomTags from './components/CustomTags';
import TagFilter from './components/TagFilter';

import { getTagFiltersSelected, toggleTagFilters } from './helpers';

import styles from './index.module.css';

const TagFilters = ({ classes, setCalendarSettings }) => {
  const filters = useSelector(state => state.Core.EventsCalendar.filters);
  const selectedStyle = useSelector(
    state => state.Core.EventsCalendar.selectedStyle
  );
  const sidebarHovering = useSelector(
    state => state.Core.EventsCalendar.sidebarHovering
  );
  const { customTags } = filters;
  const { userTags, unspecified } = customTags;
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [showAddTag, toggleShowAddTag] = useState(false);
  const [isHovering, setHovering] = useState(false);

  const toggleCustomTags = (tagsIndex, selected) => {
    const updatedCustomTags = { ...customTags };

    if (tagsIndex === 'all') {
      toggleTagFilters(updatedCustomTags, selected);
    } else if (tagsIndex === 'unspecified') {
      updatedCustomTags.unspecified = !unspecified;
    } else {
      updatedCustomTags.userTags[tagsIndex].checked =
        !userTags[tagsIndex].checked;
    }

    setCalendarSettings({
      filters: {
        ...filters,
        customTags: updatedCustomTags,
      },
    });
  };

  const selected = getTagFiltersSelected(customTags);

  return (
    <div className={styles.tagFiltersContainer}>
      <div
        className={styles.tagFiltersGroup}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className={styles.tagFiltersGroupCheckbox}>
          {!isEmpty(userTags) && (
            <IconButton
              className={styles.filterGroupIcon}
              icon={
                tagsExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'
              }
              onClick={() => {
                setTagsExpanded(!tagsExpanded);
                toggleShowAddTag(!tagsExpanded);
              }}
              tooltip={tagsExpanded ? 'Compress' : 'Expand'}
            />
          )}
          <FormControlLabel
            checked={selected}
            classes={{
              root: classNames({
                [styles.tagsCheckboxLabelRoot]: !isEmpty(userTags),
                [styles.tagsCheckboxLabelRootNoTags]: isEmpty(userTags),
              }),
              label: classNames({
                [classes.tagsCheckboxLabel]: !isEmpty(userTags),
                [classes.tagsCheckboxNoTagsLabel]: isEmpty(userTags),
              }),
            }}
            control={
              <Checkbox
                classes={{
                  checked: classNames(classes.checked),
                  root: classNames(
                    {
                      [classes.tagFiltersCheckbox]: !isEmpty(userTags),
                      [classes.tagFiltersNoTagsCheckbox]: isEmpty(userTags),
                    },
                    classes.defaultCheckbox
                  ),
                }}
                disableRipple
                indeterminate={selected === 'indeterminate'}
                onChange={() => {
                  toggleCustomTags('all', selected);
                  toggleShowAddTag(!showAddTag);
                }}
              />
            }
            key="tagFilters"
            label="Tag Filters"
          />
          {isHovering && (
            <IconButton
              className={styles.addCustomTagFilter}
              icon="add_circle"
              onClick={() => toggleShowAddTag(!showAddTag)}
              size="small"
              tooltip="Add Custom Tag Set"
            />
          )}
        </div>
        {sidebarHovering && (
          <Tooltip title="Color by Tag Filters" placement="right">
            <Radio
              checked={selectedStyle === 'tagFilters'}
              color="primary"
              disableRipple
              onChange={() =>
                setCalendarSettings({ selectedStyle: 'tagFilters' })
              }
              size="small"
            />
          </Tooltip>
        )}
      </div>
      {tagsExpanded && (
        <CustomTags
          classes={classes}
          setCalendarSettings={setCalendarSettings}
          toggleCustomTags={toggleCustomTags}
        />
      )}
      {showAddTag && (
        <TagFilter
          setCalendarSettings={setCalendarSettings}
          setTagsExpanded={setTagsExpanded}
        />
      )}
    </div>
  );
};

TagFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
};

export default TagFilters;
