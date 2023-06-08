import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import IconButton from 'dw/core/components/IconButton';

import styles from './index.module.css';

export const CustomTagCell = ({
  checked,
  classes,
  filters,
  idx,
  selectedStyle,
  setCalendarSettings,
  tags,
  toggleCustomTags,
}) => {
  const [isHovering, setHovering] = useState(false);

  const deleteCustomTagSet = tagIndex => {
    const { unspecified, userTags } = filters.customTags;
    const updatedCustomTags = { ...userTags };
    delete updatedCustomTags[tagIndex];
    const customTagsLength = Object.keys(userTags).length;

    range(tagIndex, customTagsLength).forEach(index => {
      updatedCustomTags[index] = userTags[index + 1];
    });
    delete updatedCustomTags[customTagsLength - 1];

    setCalendarSettings({
      filters: {
        ...filters,
        customTags: {
          unspecified: isEmpty(updatedCustomTags) ? true : unspecified,
          userTags: updatedCustomTags,
        },
      },
    });
  };

  return (
    <div
      className={styles.customTagFilter}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Checkbox
        checked={checked}
        classes={{
          checked: classNames(classes.checked),
          root: classNames(
            selectedStyle === 'tagFilters'
              ? classes[`customTags${idx}`]
              : classes.noCustomTags,
            classes.customTagChoice
          ),
        }}
        disableRipple
        onChange={() => toggleCustomTags(idx)}
        value={idx}
      />
      <div className={styles.customTagFilterTags}>
        {tags.map(tag => (
          <Chip
            className={classes.filterTag}
            key={`eventFilterTag/${tag}`}
            label={tag}
          />
        ))}
      </div>
      {isHovering && (
        <IconButton
          className={styles.deleteCustomTagFilter}
          icon="close"
          onClick={() => deleteCustomTagSet(idx)}
          size="small"
          tooltip="Clear Custom Tag Set"
        />
      )}
    </div>
  );
};

CustomTagCell.propTypes = {
  checked: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  idx: PropTypes.string.isRequired,
  selectedStyle: PropTypes.string.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleCustomTags: PropTypes.func.isRequired,
};

export default CustomTagCell;
