import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const Context = ({ context }) => (
  <TextField
    disabled
    label="Context"
    fullWidth
    value={context}
    InputProps={{
      readOnly: true,
    }}
  />
);

Context.propTypes = {
  context: PropTypes.string,
};

Context.defaultProps = {
  context: '---',
};

export default Context;
