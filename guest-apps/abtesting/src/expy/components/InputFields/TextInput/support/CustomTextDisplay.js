import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useStyles } from '../styles';

const CustomTextDisplay = ({ value, error, errorMsg }) => {
  const classes = useStyles();
  return (
    <>
      <div className={error ? classes.error : ''}>{value}</div>
      {error && <FormHelperText error>{errorMsg}</FormHelperText>}
    </>
  );
};

CustomTextDisplay.defaultProps = {
  error: false,
  errorMsg: null,
  value: null,
};

CustomTextDisplay.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default CustomTextDisplay;
