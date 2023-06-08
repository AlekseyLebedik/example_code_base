import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useStyles } from './styles';

const Alert = ({ color, title, children, icon }) => {
  const classes = useStyles();

  return (
    <div className={cn(classes.container, classes[color])}>
      <div className={classes.titleContainer}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <p className={classes.title}>{title}</p>
      </div>
      {children && <p className={classes.description}>{children}</p>}
    </div>
  );
};

Alert.defaultProps = {
  color: 'basic',
  children: undefined,
  icon: undefined,
};

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.node,
  color: PropTypes.oneOf(['basic', 'info', 'approved', 'denied', 'pending']),
};

export default Alert;
