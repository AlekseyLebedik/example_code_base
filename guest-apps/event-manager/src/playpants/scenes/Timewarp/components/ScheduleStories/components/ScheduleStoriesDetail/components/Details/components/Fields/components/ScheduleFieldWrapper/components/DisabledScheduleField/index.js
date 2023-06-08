import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const DisabledScheduleField = ({ schedule, disabledTooltip }) => (
  <Tooltip title={disabledTooltip}>
    <TextField
      disabled
      label="Schedule"
      fullWidth
      value={schedule}
      InputProps={{
        readOnly: true,
      }}
    />
  </Tooltip>
);

DisabledScheduleField.propTypes = {
  schedule: PropTypes.string,
  disabledTooltip: PropTypes.string.isRequired,
};

DisabledScheduleField.defaultProps = {
  schedule: '---',
};

export default DisabledScheduleField;
