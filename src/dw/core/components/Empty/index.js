import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.module.css';

const EmptyComponent = ({ emptyText, children, className, classes }) => (
  <div className={classNames(styles.container, className, classes.root)}>
    {children || emptyText}
  </div>
);

EmptyComponent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  emptyText: PropTypes.string,
  children: PropTypes.node,
};

EmptyComponent.defaultProps = {
  classes: {},
  className: undefined,
  emptyText: 'No data to display',
  children: null,
};

export default EmptyComponent;
