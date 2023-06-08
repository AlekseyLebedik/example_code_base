import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const OpenModalButton = props => {
  const {
    onClick,
    icon,
    title,
    placement,
    wrapperClassName,
    iconButtonProps,
    ...other
  } = props;
  const { disabled } = iconButtonProps;
  const iconBtn = (
    <IconButton onClick={onClick} {...iconButtonProps}>
      <Icon>{icon}</Icon>
    </IconButton>
  );
  const result = disabled ? (
    iconBtn
  ) : (
    <Tooltip
      title={title}
      className={wrapperClassName}
      placement={placement}
      {...other}
    >
      {iconBtn}
    </Tooltip>
  );
  return result;
};

OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  placement: PropTypes.string,
  wrapperClassName: PropTypes.string,
  iconButtonProps: PropTypes.object,
};

OpenModalButton.defaultProps = {
  icon: 'add',
  title: 'Open modal panel',
  placement: 'bottom',
  wrapperClassName: '',
  iconButtonProps: {},
};

export default OpenModalButton;
