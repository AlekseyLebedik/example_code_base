import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const FilterTestUsersLogs = ({
  includeTestUsersEntries,
  onToggleTestUsersLogs,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={includeTestUsersEntries}
        onChange={onToggleTestUsersLogs}
        name="includeTestUsersEntries"
        color="primary"
      />
    }
    label="Include Test Users "
  />
);

FilterTestUsersLogs.propTypes = {
  includeTestUsersEntries: PropTypes.bool.isRequired,
  onToggleTestUsersLogs: PropTypes.func.isRequired,
};
