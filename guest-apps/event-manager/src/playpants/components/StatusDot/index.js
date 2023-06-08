import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

import * as styles from './index.module.css';

const StatusDot = ({ iconClassName, statusText }) => (
  <span className={styles.statusDotContainer}>
    <Icon className={classNames(iconClassName, styles.statusDot)} />
    {statusText}
  </span>
);

StatusDot.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  statusText: PropTypes.string,
};

StatusDot.defaultProps = {
  statusText: '',
};

export default StatusDot;
