import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const CreatedBy = ({ eventData: { created_by: createdBy } }) => (
  <TextField
    label="Created By"
    fullWidth
    value={createdBy ? createdBy.name : '---'}
    disabled
  />
);

CreatedBy.propTypes = {
  eventData: PropTypes.object.isRequired,
};

export default CreatedBy;
