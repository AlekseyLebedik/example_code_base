import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const AddVIPsButton = ({ onClick, toolTipClass, iconClassName }) => (
  <Tooltip
    title="Add VIP Gamertags"
    classes={{ tooltip: toolTipClass }}
    placement="bottom"
  >
    <IconButton
      color="inherit"
      onClick={onClick}
      data-cy="add-category-modal-button"
      id="add_button_lq"
    >
      <Icon className={iconClassName}>playlist_add</Icon>
    </IconButton>
  </Tooltip>
);
AddVIPsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  toolTipClass: PropTypes.string,
  iconClassName: PropTypes.string,
};

AddVIPsButton.defaultProps = {
  toolTipClass: '',
  iconClassName: '',
};

export default AddVIPsButton;
