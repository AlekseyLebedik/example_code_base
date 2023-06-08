import React from 'react';
import PropTypes from 'prop-types';

import ContentLoader from 'react-content-loader';

const LoadingSkeleton = ({ width, height, ...props }) => (
  <ContentLoader
    width={width}
    height={height}
    style={{ width, height }}
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
  </ContentLoader>
);

LoadingSkeleton.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

LoadingSkeleton.defaultProps = {
  width: 90,
  height: 16,
};

export default LoadingSkeleton;
