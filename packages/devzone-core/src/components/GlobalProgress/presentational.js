import React from 'react';
import PropTypes from 'prop-types';
import { MAX_PROGRESS } from './constants';

import './presentational.css';

function GlobalProgressStateless({ animationDuration, isShown, percent }) {
  const style = {
    transform: `translate(-${MAX_PROGRESS - percent}%)`,
    transition: `all ${animationDuration}ms ease-out`,
    opacity: isShown ? '1' : '0',
  };

  return (
    <div id="global-progress">
      <div className="bar" style={style}>
        <div className="glow" />
      </div>
    </div>
  );
}

GlobalProgressStateless.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  isShown: PropTypes.bool.isRequired,
  percent: PropTypes.number.isRequired,
};

export default GlobalProgressStateless;
