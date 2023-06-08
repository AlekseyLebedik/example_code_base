import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const BulkDeleteVIPsButton = ({ onClick, toolTipClass, iconClassName }) => (
  <Tooltip
    title="Remove VIP Gamertags"
    classes={{ tooltip: toolTipClass }}
    placement="bottom"
  >
    <IconButton
      color="inherit"
      onClick={onClick}
      data-cy="deleteButton"
      id="delete_button_lq"
    >
      <Icon className={iconClassName}>delete</Icon>
    </IconButton>
  </Tooltip>
);
BulkDeleteVIPsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconClassName: PropTypes.string,
  toolTipClass: PropTypes.string,
};

BulkDeleteVIPsButton.defaultProps = {
  iconClassName: '',
  toolTipClass: '',
};

export default BulkDeleteVIPsButton;
