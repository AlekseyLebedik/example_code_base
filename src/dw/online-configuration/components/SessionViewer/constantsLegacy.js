import React from 'react';
import { formatBool, valueOrNotAvailable } from 'dw/core/helpers/formatters';
import {
  getNowTimestamp,
  getNowSubstracting,
  DATE_TIME_FORMATS,
} from 'dw/core/helpers/date-time';
import PLAYLIST_NAME_MAPPING from 'dw/core/helpers/playlist-name-mapping';

import ConfigFeatureFlags from 'dw/core/components/ConfigFeatureFlags';
import { OC_SV_PLAYLIST_ID_MAPPING } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import RouteLink from 'dw/online-configuration/components/RouteLink';

const renderServerUserId = (_, record) => {
  if (record.thunderpantsUrl) {
    return (
      <a
        href={record.thunderpantsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {record.serverUserId}
      </a>
    );
  }
  if (record.listenServerInfo) {
    const { hostPlayerId: playerId, hostName } = record.listenServerInfo;
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
  return record.serverUserId;
};

export const COLUMNS = [
  {
    title: 'Lobby ID',
    dataIndex: 'id',
    key: 'id',
    type: 'number',
    width: 180,
    render: (text, record) => (
      <a href={record.lobbyURL} target="_blank" rel="noopener noreferrer">
        {record.id}
      </a>
    ),
  },
  {
    title: 'Server User Id',
    dataIndex: 'serverUserId',
    key: 'serverUserId',
    render: renderServerUserId,
    type: 'number',
    width: 180,
  },
  {
    title: 'Is Lobby Open',
    dataIndex: 'isLobbyOpen',
    render: (text, record) => (
      <span className={!record.isLobbyOpen ? 'lobby-closed' : ''}>
        {formatBool(record.isLobbyOpen)}
      </span>
    ),
    type: 'string',
    width: 180,
    className: 'scrollable-column',
  },
  {
    title: 'Build Name',
    dataIndex: 'buildName',
    key: 'buildName',
    type: 'string',
    width: 270,
    className: 'scrollable-column',
  },
  {
    title: 'Min Players',
    dataIndex: 'minPlayers',
    key: 'minPlayers',
    type: 'number',
    width: 240,
    className: 'scrollable-column',
  },
  {
    title: 'Players / Max Players',
    dataIndex: 'maxPlayers',
    render: (text, record) => {
      const players = !record.currentPlayerState
        ? 0
        : Object.keys(record.currentPlayerState).length;
      const maxPlayers = !record.maxPlayers ? 0 : record.maxPlayers;
      return `${players} / ${maxPlayers}`;
    },
    type: 'number',
    width: 280,
    className: 'scrollable-column',
  },
  {
    title: 'Need For Dedicated Server',
    dataIndex: 'needForDedicatedServer',
    key: 'needForDedicatedServer',
    type: 'string',
    width: 260,
    className: 'scrollable-column',
  },
  {
    title: 'Is Merge Src',
    dataIndex: 'isMergeSrc',
    key: 'isMergeSrc',
    render: (text, record) => formatBool(record.isMergeSrc),
    type: 'string',
    width: 160,
    className: 'scrollable-column',
  },
  {
    title: 'Game Mode',
    dataIndex: 'gameMode',
    render: (text, record) => (
      <ConfigFeatureFlags
        configFeatureFlags={OC_SV_PLAYLIST_ID_MAPPING}
        noAccessComponent={() =>
          valueOrNotAvailable(record.gameMode, `Playlist ${record.playlistId}`)
        }
      >
        {valueOrNotAvailable(
          record.gameMode,
          PLAYLIST_NAME_MAPPING[record.playlistId] ||
            `Playlist ${record.playlistId}`
        )}
      </ConfigFeatureFlags>
    ),
    type: 'string',
    width: 220,
    className: 'scrollable-column',
  },
  {
    title: 'Game Has Started',
    dataIndex: 'gameHasStarted',
    render: (text, record) => formatBool(record.gameHasStarted),
    type: 'string',
    width: 140,
    className: 'scrollable-column',
  },
  {
    title: 'Can Start',
    dataIndex: 'canStart',
    render: (text, record) => formatBool(record.canStart),
    type: 'string',
    width: 170,
    className: 'scrollable-column',
  },
  {
    title: 'Game Map',
    dataIndex: 'gameMap',
    key: 'gameMap',
    type: 'string',
    width: 130,
    className: 'scrollable-column',
  },
  {
    title: 'Game Id',
    dataIndex: 'gameId',
    key: 'gameId',
    type: 'number',
    width: 240,
    className: 'scrollable-column',
  },
  {
    title: 'Created At',
    render: (text, record, formatDateTime) =>
      /**
       * createAt is returned by the API in milliseconds. This level of
       * granularity should be preserved.
       *
       * Since formatDateTime takes seconds, when we make the conversion we
       * also convert createdAt in float to preserve the milliseconds.
       */
      formatDateTime(
        (1.0 * record.createdAt) / 1000,
        DATE_TIME_FORMATS.DEFAULT_WITH_SECONDS
      ),
    dataIndex: 'createdAt',
    type: 'datetime',
    width: 240,
    className: 'scrollable-column',
  },
  {
    title: 'Games Is In Progress',
    dataIndex: 'gamesIsInProgress',
    render: (text, record) => formatBool(record.gamesIsInProgress),
    type: 'string',
    width: 200,
    className: 'scrollable-column',
  },
  {
    title: 'MM Restrict',
    dataIndex: 'restrict',
    key: 'restrict',
    type: 'string',
    width: 250,
    className: 'scrollable-column',
  },
];
