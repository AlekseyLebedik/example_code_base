import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function SkeletonProgress({ height }) {
  return (
    <div
      className="skeleton-progress-indicator"
      style={{ height: `${height}` }}
    />
  );
}

SkeletonProgress.propTypes = {
  height: PropTypes.string,
};

SkeletonProgress.defaultProps = {
  height: '100%',
};

export default SkeletonProgress;
