import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const CreatedBy = ({ createdBy }) => (
  <TextField
    disabled
    label="Created By"
    fullWidth
    value={createdBy ? createdBy.name : '---'}
    InputProps={{
      readOnly: true,
    }}
  />
);

CreatedBy.propTypes = {
  createdBy: PropTypes.object,
};

CreatedBy.defaultProps = {
  createdBy: null,
};

export default CreatedBy;
