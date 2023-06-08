import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

const FloatingButton = props => {
  const { title, color, className, onClick, icon, hide } = props;
  return hide ? null : (
    <Tooltip title={title}>
      <Fab color={color} className={className} onClick={onClick}>
        <Icon>{icon}</Icon>
      </Fab>
    </Tooltip>
  );
};

FloatingButton.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hide: PropTypes.bool,
};
FloatingButton.defaultProps = {
  title: '',
  color: 'primary',
  className: undefined,
  onClick: () => {},
  icon: 'clear',
  hide: false,
};

export default FloatingButton;
