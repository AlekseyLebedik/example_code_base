import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

const SubmitBtn = ({ onClick, children, disabled }) => {
  const classes = useStyles();
  return (
    <button
      type="submit"
      disabled={disabled}
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

SubmitBtn.defaultProps = {
  disabled: false,
  onClick: () => {},
  children: 'Save',
};

SubmitBtn.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default SubmitBtn;
