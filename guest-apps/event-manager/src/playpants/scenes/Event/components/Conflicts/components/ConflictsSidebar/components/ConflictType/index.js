import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { CONFLICT_TYPES } from 'playpants/constants/conflicts';

const ConflictType = ({ changeConflictType, classes, conflictTypeFilter }) => (
  <FormControl fullWidth>
    <InputLabel>Severity</InputLabel>
    <Select
      id="conflicttype"
      onChange={({ target: { value } }) => changeConflictType(value)}
      value={conflictTypeFilter}
    >
      <MenuItem key="all" value="all">
        <Icon className={classes['all-conflict-types']}>
          fiber_manual_record
        </Icon>
        <span className={classes.selectableConflictType}>All</span>
      </MenuItem>
      {Object.entries(CONFLICT_TYPES).map(([type, name]) => (
        <MenuItem key={type} value={type}>
          <Icon className={classes[type]}>fiber_manual_record</Icon>
          <span className={classes.selectableConflictType}>{name}</span>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

ConflictType.propTypes = {
  changeConflictType: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  conflictTypeFilter: PropTypes.string.isRequired,
};

export default ConflictType;
