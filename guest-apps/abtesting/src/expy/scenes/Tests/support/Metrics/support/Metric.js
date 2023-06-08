import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useStyles } from '../styles';

const Metric = ({ className, type, amount, heading, children }) => {
  const classes = useStyles();
  return (
    <div className={cn(classes.container, className)}>
      <div className={cn(classes.dot, classes[type])} />
      <div className={classes.number}>{amount}</div>
      <div className={classes.textContainer}>
        <p className={classes.heading}>{heading}</p>
        {children && children}
      </div>
    </div>
  );
};

Metric.defaultProps = {
  className: '',
  children: null,
};

Metric.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['live', 'proposal', 'done']).isRequired,
  amount: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Metric;
