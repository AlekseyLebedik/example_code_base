import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { TIMELINE_GROUPS } from '../../constants';
import styles from './index.module.css';

const GroupSelector = ({ groupBy, setGroupBy, sidebarProps }) => (
  <FormControl
    {...sidebarProps}
    className={styles.container}
    variant="outlined"
    fullWidth
  >
    <InputLabel className={styles.label}>Group Events by</InputLabel>
    <Select
      data-cy="timelineGroupFilter"
      value={groupBy}
      onChange={({ target: { value } }) => setGroupBy(value)}
      classes={{ outlined: styles.select }}
    >
      {TIMELINE_GROUPS.map(({ key, value }) => (
        <MenuItem value={key} key={key}>
          {value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

GroupSelector.propTypes = {
  groupBy: PropTypes.string.isRequired,
  setGroupBy: PropTypes.func.isRequired,
  sidebarProps: PropTypes.object.isRequired,
};

export default GroupSelector;
