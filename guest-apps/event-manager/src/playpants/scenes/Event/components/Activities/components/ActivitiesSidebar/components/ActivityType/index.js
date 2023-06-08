import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ActivityType = ({
  changeActivityType,
  activityTypeFilter,
  activitySettings,
}) => (
  <FormControl fullWidth>
    <InputLabel>Type</InputLabel>
    <Select
      value={activityTypeFilter}
      id="activitytype"
      onChange={({ target: { value } }) => changeActivityType(value)}
    >
      <MenuItem key="all" value="all">
        All
      </MenuItem>
      {activitySettings.map(activity => (
        <MenuItem key={activity.type} value={activity.type}>
          {activity.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

ActivityType.propTypes = {
  changeActivityType: PropTypes.func.isRequired,
  activityTypeFilter: PropTypes.string.isRequired,
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActivityType;
