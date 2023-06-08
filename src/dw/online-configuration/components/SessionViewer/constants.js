import React from 'react';
import PropTypes from 'prop-types';
import {
  formatBoolAgGrid,
  valueOrNotAvailable,
} from 'dw/core/helpers/formatters';
import {
  getNowTimestamp,
  getNowSubstracting,
  DATE_TIME_FORMATS,
} from 'dw/core/helpers/date-time';
import PLAYLIST_NAME_MAPPING from 'dw/core/helpers/playlist-name-mapping';

import ConfigFeatureFlags from 'dw/core/components/ConfigFeatureFlags';
import { OC_SV_PLAYLIST_ID_MAPPING } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import RouteLink from 'dw/online-configuration/components/RouteLink';
import PlayerName from './components/PlayerName';

export const ACTION_TYPE_PREFIX = 'COMPONENTS.SESSION_VIEWER';

export const DISPLAY_ROWS = 15;
export const ROW_HEIGHT = 28;
export const OFFSET = 92;

const renderServerUserId = ({
  value,
  data: { thunderpantsUrl, listenServerInfo },
}) => {
  if (thunderpantsUrl) {
    return (
      <a href={thunderpantsUrl} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  }
  if (listenServerInfo) {
    const { hostPlayerId: playerId, hostName } = listenServerInfo;
    const start = getNowSubstracting(2, 'hours');
    const end = getNowTimestamp();
    return (
      <RouteLink
        routeName="mmp-trace"
        linkName={hostName || playerId}
        linkParams={{ playerId, start, end }}
        target="blank"
      />
    );
  }
  return value;
};
renderServerUserId.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.object.isRequired,
};
renderServerUserId.defaultProps = {
  value: null,
};

const renderLobbyID = ({ value, data: { lobbyURL } }) => (
  <a href={lobbyURL} target="_blank" rel="noopener noreferrer">
    {value}
  </a>
);
renderLobbyID.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.object.isRequired,
};
renderLobbyID.defaultProps = {
  value: null,
};

const renderGameMode = ({ value, data: { playlistId } }) => (
  <ConfigFeatureFlags
    configFeatureFlags={OC_SV_PLAYLIST_ID_MAPPING}
    noAccessComponent={() =>
      valueOrNotAvailable(value, `Playlist ${playlistId}`)
    }
  >
    {valueOrNotAvailable(
      value,
      PLAYLIST_NAME_MAPPING[playlistId] || `Playlist ${playlistId}`
    )}
  </ConfigFeatureFlags>
);
renderGameMode.propTypes = {
  value: PropTypes.string,
  data: PropTypes.object.isRequired,
};
renderGameMode.defaultProps = {
  value: undefined,
};

const renderPlayerId = params => {
  const { playerId } = params.data;
  const start = getNowSubstracting(2, 'hours');
  const end = getNowTimestamp();
  return (
    <RouteLink
      className="telemetry-link"
      routeName="mmp-trace"
      linkName={playerId}
      linkParams={{ playerId, start, end }}
      target="blank"
    />
  );
};

const renderPlayerName = params => {
  const { playerId } = params.data;
  return <PlayerName playerId={playerId} />;
};

export const COLUMNS = [
  {
    headerName: 'Lobby ID',
    field: 'id',
    minWidth: 219,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { innerRenderer: 'LobbyID' },
  },
  {
    headerName: 'Server User Id',
    field: 'serverUserId',
    cellRenderer: 'ServerUserId',
    minWidth: 180,
  },
  {
    headerName: 'Is Lobby Open',
    valueGetter: params => formatBoolAgGrid(params.data?.isLobbyOpen),
    cellStyle: params =>
      params.data && params.data.isLobbyOpen === false
        ? {
            color: 'red',
          }
        : {},
    minWidth: 180,
  },
  {
    headerName: 'Build Name',
    field: 'buildName',
    minWidth: 300,
  },
  {
    headerName: 'Min Players',
    field: 'minPlayers',
    maxWidth: 150,
  },
  {
    headerName: 'Round ID',
    field: 'roundId',
  },
  {
    headerName: 'Players / Max Players',
    valueGetter: params => {
      const players = !params.data?.currentPlayerState
        ? 0
        : Object.keys(params.data?.currentPlayerState).length;
      const maxPlayers = !params.data?.maxPlayers ? 0 : params.data.maxPlayers;
      return `${players} / ${maxPlayers}`;
    },
    minWidth: 150,
  },
  {
    headerName: 'Need For Dedicated Server',
    field: 'needForDedicatedServer',
    minWidth: 260,
  },
  {
    headerName: 'Is Merge Src',
    valueGetter: params => formatBoolAgGrid(params.data?.isMergeSrc),
    minWidth: 160,
  },
  {
    headerName: 'Game Mode',
    field: 'gameMode',
    cellRenderer: 'GameMode',
    minWidth: 220,
  },
  {
    headerName: 'Game Has Started',
    valueGetter: params => formatBoolAgGrid(params.data?.gameHasStarted),
    minWidth: 140,
  },
  {
    headerName: 'Can Start',
    valueGetter: params => formatBoolAgGrid(params.data?.canStart),
    minWidth: 170,
  },
  {
    headerName: 'Game Map',
    field: 'gameMap',
    minWidth: 130,
  },
  {
    headerName: 'Game Id',
    field: 'gameId',
    minWidth: 240,
  },
  {
    headerName: 'Created At',
    valueFormatter: ({ value, context: { formatDateTime } }) =>
      /**
       * createAt is returned by the API in milliseconds. This level of
       * granularity should be preserved.
       *
       * Since formatDateTime takes seconds, when we make the conversion we
       * also convert createdAt in float to preserve the milliseconds.
       */
      formatDateTime(
        (1.0 * value) / 1000,
        DATE_TIME_FORMATS.DEFAULT_WITH_SECONDS
      ),
    field: 'createdAt',
    minWidth: 240,
  },
  {
    headerName: 'Games Is In Progress',
    valueGetter: params => formatBoolAgGrid(params.data?.gamesIsInProgress),
    minWidth: 200,
  },
  {
    headerName: 'MM Restrict',
    field: 'restrict',
    minWidth: 250,
  },
];

export const DETAIL_COLUMNS = [
  {
    headerName: 'Player ID',
    field: 'playerId',
    filter: 'agTextColumnFilter',
    cellRenderer: 'PlayerId',
  },
  {
    headerName: 'Player Name',
    field: 'playerName',
    filter: 'agTextColumnFilter',
    cellRenderer: 'PlayerName',
  },
  {
    headerName: 'State',
    filter: 'agTextColumnFilter',
    field: 'state',
  },
  {
    headerName: 'Team',
    filter: 'agTextColumnFilter',
    field: 'team',
  },
];

export const renderers = {
  ServerUserId: renderServerUserId,
  LobbyID: renderLobbyID,
  GameMode: renderGameMode,
  PlayerId: renderPlayerId,
  PlayerName: renderPlayerName,
};

export const PLAYER_STATUS = {
  0: 'MEMBER_STATUS_UNACKNOWLEDGED',
  1: 'MEMBER_STATUS_MAY_CONNECT',
  2: 'MEMBER_STATUS_CONNECTED',
  3: 'MEMBER_STATUS_WONT_CONNECT',
};
