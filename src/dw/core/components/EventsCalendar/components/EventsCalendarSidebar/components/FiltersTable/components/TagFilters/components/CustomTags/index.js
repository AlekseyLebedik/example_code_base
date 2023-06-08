import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { useSelector } from 'react-redux';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CustomTag from './components/CustomTagCell';

import styles from './index.module.css';

const CustomTags = ({ classes, setCalendarSettings, toggleCustomTags }) => {
  const filters = useSelector(state => state.Core.EventsCalendar.filters);
  const selectedStyle = useSelector(
    state => state.Core.EventsCalendar.selectedStyle
  );
  const { unspecified, userTags } = filters.customTags;

  return (
    <div className={styles.calendarOptions}>
      {Object.entries(userTags).map(([idx, tagFilter]) => (
        <CustomTag
          checked={tagFilter.checked}
          classes={classes}
          filters={filters}
          idx={idx}
          key={`customTagRow/${idx}`}
          selectedStyle={selectedStyle}
          setCalendarSettings={setCalendarSettings}
          tags={tagFilter.tags}
          toggleCustomTags={toggleCustomTags}
        />
      ))}
      {!isEmpty(userTags) && (
        <FormControlLabel
          checked={unspecified}
          classes={{
            label: classes.checkboxLabel,
            root: classes.noCustomTagsCheckbox,
          }}
          control={
            <Checkbox
              classes={{
                checked: classNames(classes.checked),
                root: classNames(classes.noCustomTags, classes.customTagChoice),
              }}
              disableRipple
              onChange={() => toggleCustomTags('unspecified')}
            />
          }
          key="customTagsUnspecified"
          label="Unspecified"
        />
      )}
    </div>
  );
};

CustomTags.propTypes = {
  classes: PropTypes.object.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  toggleCustomTags: PropTypes.func.isRequired,
};

export default CustomTags;
