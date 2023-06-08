import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const DeleteButton = ({ onClick, title, toolTipClass }) => (
  <Tooltip
    key="tooltip"
    placement="left"
    title={title}
    classes={{ tooltip: toolTipClass }}
  >
    <IconButton onClick={onClick} aria-label="delete" id="deleteAll">
      <Icon fontSize="small">delete</Icon>
    </IconButton>
  </Tooltip>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toolTipClass: PropTypes.string,
};

DeleteButton.defaultProps = {
  toolTipClass: '',
};

export default DeleteButton;
