import React from 'react';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const Status = ({ status }) => (
  <TextField
    disabled
    label="Status"
    fullWidth
    value={startCase(status)}
    InputProps={{
      readOnly: true,
    }}
  />
);

Status.propTypes = {
  status: PropTypes.string,
};

Status.defaultProps = {
  status: '---',
};

export default Status;
