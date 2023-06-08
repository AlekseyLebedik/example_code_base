import React from 'react';
import PropTypes from 'prop-types';

import PlayerViewLink from 'dw/clans/components/PlayerViewLink';
import { PLAYER_PROPTYPE } from 'dw/clans/constants';

const PlayerCellRenderer = ({
  value: player,
  context: { accountsServiceConfigId },
}) => {
  return player ? (
    <PlayerViewLink
      accountsServiceConfigId={accountsServiceConfigId}
      user={player}
      text={
        player.username
          ? `${player.username} | ${player.userID}`
          : player.userID
      }
    />
  ) : null;
};

PlayerCellRenderer.propTypes = {
  value: PLAYER_PROPTYPE.isRequired,
  context: PropTypes.object.isRequired,
};

export default PlayerCellRenderer;
