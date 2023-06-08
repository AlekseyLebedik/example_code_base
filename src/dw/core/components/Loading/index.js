import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './index.module.css';

const LoadingComponent = ({ classes, size, thickness, ...props }) => (
  <div className={cn(styles.container, classes.loadingContainer)}>
    <CircularProgress size={size} thickness={thickness} {...props} />
  </div>
);

LoadingComponent.propTypes = {
  classes: PropTypes.object,
  size: PropTypes.number,
  thickness: PropTypes.number,
};

LoadingComponent.defaultProps = {
  classes: {},
  size: 80,
  thickness: 5,
};

export default LoadingComponent;
