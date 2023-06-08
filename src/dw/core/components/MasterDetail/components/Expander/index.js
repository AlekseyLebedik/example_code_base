import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import './index.css';

function Expander({ expanded, onClick, className, title }) {
  const iconClass = expanded ? 'chevron_right' : 'chevron_left';
  const tooltip = title || (expanded ? 'Collapse Details' : 'Expand Details');

  return (
    <div className={`common__expander ${className}`}>
      <Tooltip title={tooltip} placement="bottom-start">
        <IconButton onClick={onClick}>
          <Icon>{iconClass}</Icon>
        </IconButton>
      </Tooltip>
    </div>
  );
}

Expander.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

Expander.defaultProps = {
  className: '',
  title: null,
};

export default Expander;
