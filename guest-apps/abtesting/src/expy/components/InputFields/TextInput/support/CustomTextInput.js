import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const CustomTextInput = ({ value, setParentValue }) => {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      type="text"
      variant="outlined"
      onChange={e => setParentValue(e.target.value)}
    />
  );
};

CustomTextInput.defaultProps = {
  value: null,
  setParentValue: () => {},
};

CustomTextInput.propTypes = {
  value: PropTypes.string,
  setParentValue: PropTypes.func,
};

export default CustomTextInput;
