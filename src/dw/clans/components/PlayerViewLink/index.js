import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ToolTip from '@material-ui/core/Tooltip';
import { PLAYER_PROPTYPE } from 'dw/clans/constants';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
    width: 'inherit',
    textOverflow: 'ellipsis',
    display: 'list-item',
    overflow: 'hidden',
  },
}));

const PlayerViewLink = ({ accountsServiceConfigId, user, text }) => {
  const classes = useStyles();
  return (
    <ToolTip title="Open user in Player View">
      <Link
        className={classes.link}
        to={`/player/accounts/${user.userID}?serviceConfigID=${accountsServiceConfigId}`}
      >
        {text}
      </Link>
    </ToolTip>
  );
};

PlayerViewLink.propTypes = {
  accountsServiceConfigId: PropTypes.string,
  text: PropTypes.string.isRequired,
  user: PLAYER_PROPTYPE.isRequired,
};
PlayerViewLink.defaultProps = {
  accountsServiceConfigId: '',
};

export default PlayerViewLink;
