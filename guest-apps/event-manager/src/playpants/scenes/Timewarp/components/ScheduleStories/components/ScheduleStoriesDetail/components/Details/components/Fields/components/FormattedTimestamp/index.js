import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  formatDateTime,
  timezoneOrDefaultSelector,
} from 'playpants/helpers/dateTime';
import TextField from '@material-ui/core/TextField';

export const FormattedTimestampBase = ({ timestamp, timezone, label }) => {
  const formattedTimestamp = timestamp
    ? formatDateTime(timestamp, undefined, timezone)
    : '---';
  return (
    <TextField
      disabled
      label={label}
      fullWidth
      value={formattedTimestamp}
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

FormattedTimestampBase.propTypes = {
  timestamp: PropTypes.number,
  label: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
};

FormattedTimestampBase.defaultProps = {
  timestamp: null,
};

const mapStateToProps = state => ({
  timezone: timezoneOrDefaultSelector(state),
});

export default connect(mapStateToProps)(FormattedTimestampBase);
