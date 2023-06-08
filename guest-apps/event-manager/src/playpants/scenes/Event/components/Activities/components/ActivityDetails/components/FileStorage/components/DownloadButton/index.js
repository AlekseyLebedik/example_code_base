import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'dw/core/components/IconButton';

const DownloadButton = props => {
  const { value: disabled, size, icon, tooltip, color } = props;
  return (
    <IconButton
      iconProps={{ style: { fontSize: size } }}
      icon={icon}
      tooltip={tooltip}
      color={color}
      disabled={disabled}
    />
  );
};

DownloadButton.propTypes = {
  value: PropTypes.bool,
  size: PropTypes.number,
  icon: PropTypes.string,
  tooltip: PropTypes.string,
  color: PropTypes.string,
};

DownloadButton.defaultProps = {
  value: false,
  size: 20,
  icon: 'save_alt',
  tooltip: 'Download File',
  color: 'primary',
};

export default DownloadButton;
