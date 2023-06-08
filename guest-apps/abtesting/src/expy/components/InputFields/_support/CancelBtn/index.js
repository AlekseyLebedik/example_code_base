import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

const CancelBtn = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <button type="button" className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
};

CancelBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default CancelBtn;
