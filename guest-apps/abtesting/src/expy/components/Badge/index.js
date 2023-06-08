import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useStyles } from './styles';

const Badge = ({ className, color, children, withBullet }) => {
  const classes = useStyles();

  return (
    <div
      className={cn(className, classes.badge, classes[color], {
        [classes.bullet]: withBullet,
      })}
    >
      {children}
    </div>
  );
};

Badge.defaultProps = {
  className: '',
  color: 'basic',
  withBullet: false,
};

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  withBullet: PropTypes.bool,
  color: PropTypes.oneOf([
    'white',
    'basic',
    'proposal',
    'live',
    'cancelled',
    'ready',
    'done',
  ]),
};

export default Badge;
