import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useStyles } from '../styles';

const CustomSelectDisplay = ({ value, error, errorMsg }) => {
  const classes = useStyles();
  return (
    <>
      <div className={error ? classes.error : ''}>{value || 'None'}</div>
      {error && <FormHelperText error>{errorMsg}</FormHelperText>}
    </>
  );
};

CustomSelectDisplay.defaultProps = {
  error: false,
  errorMsg: null,
  value: null,
};

CustomSelectDisplay.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default CustomSelectDisplay;
