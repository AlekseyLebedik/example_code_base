import React from 'react';
import RouteLink from 'dw/online-configuration/components/RouteLink';
import { getNowTimestamp, getNowSubstracting } from 'dw/core/helpers/date-time';

const renderPlayerId = (_, record) => {
  const { playerId } = record;
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

export const COLUMNS = [
  {
    title: 'Player Id',
    dataIndex: 'playerId',
    render: renderPlayerId,
    type: 'string',
    width: '25%',
  },
  {
    title: 'Player Name',
    dataIndex: 'playerName',
    key: 'playerName',
    type: 'string',
    width: '25%',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    type: 'string',
    width: '35%',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    type: 'number',
    width: '15%',
  },
];

export const PLAYER_STATUS = {
  0: 'MEMBER_STATUS_UNACKNOWLEDGED',
  1: 'MEMBER_STATUS_MAY_CONNECT',
  2: 'MEMBER_STATUS_CONNECTED',
  3: 'MEMBER_STATUS_WONT_CONNECT',
};
