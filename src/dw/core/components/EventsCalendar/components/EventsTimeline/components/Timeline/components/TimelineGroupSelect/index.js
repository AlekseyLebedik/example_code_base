import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { GROUP_SELECTIONS } from '../../constants';

import styles from '../../index.module.css';

const TimelineGroupSelect = ({ groupKey, setGroupKey, sidebarProps }) => (
  <div {...sidebarProps} className={styles.sidebarHeader}>
    <FormControl margin="dense" fullWidth>
      <InputLabel>Filter Group</InputLabel>
      <Select
        data-cy="timelineGroupFilter"
        value={groupKey}
        onChange={({ target: { value } }) => setGroupKey(value)}
      >
        {Object.entries(GROUP_SELECTIONS).map(([key, value]) => (
          <MenuItem value={key} key={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

TimelineGroupSelect.propTypes = {
  groupKey: PropTypes.string.isRequired,
  setGroupKey: PropTypes.func.isRequired,
  sidebarProps: PropTypes.object.isRequired,
};

export default TimelineGroupSelect;
