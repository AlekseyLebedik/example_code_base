import React from 'react';

import { DATE_TIME_FORMATS } from 'dw/core/helpers/date-time';
import { sortTimestampSelector } from 'dw/online-configuration/scenes/selectors';

export const HOUR = 60 * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;

export const MEMBERSHIP_CHANGE = 'PLAYER_LOBBY_STATUS_MEMBERSHIP_CHANGE';

export const MEMBERSHIP_CHANGE_MAP = {
  UNDEFINED: {
    MAY_CONNECT: 'Player Accepted',
    CONNECTED: 'Player Connected',
  },
  MAY_CONNECT: {
    CONNECTED: 'Player Connected',
    WONT_CONNECT: "Player Won't Connect",
  },
  CONNECTED: { UNDEFINED: 'Player Left' },
};

export const EVENT_TYPE_MAP = {
  LOBBY_STATE_EVENT_PLAYER_GAME_START: 'Game Start',
  LOBBY_ADMISSION_CONSIDERED: 'Admission Considered',
  LOBBY_ADMISSION_ACCEPTED: 'Admission Accepted',
  LOBBY_ADMISSION_REJECTED: 'Admission Rejected',
  LOBBY_INITIALIZED: 'Initialised',
  LOBBY_DISBANDED: 'Disbanded',
  LOBBY_SHUTDOWN: 'Shutdown',
  LOBBY_FORMED_PLAYER_LEVEL: 'Formed Player Level',
  OptimizerInConfabPlayerRecord: 'Player Search',
  OptimizerPlayerResult: 'Player Result',
  dlog_matchmaking_search_summary_player_record: 'Search Summary',
};

const renderDateTimeCell = (ts, formatDateTime) => (
  <span>
    <div>{formatDateTime(ts, DATE_TIME_FORMATS.DATE_NO_YEAR)}</div>
    <div>{formatDateTime(ts, DATE_TIME_FORMATS.TIME_WITH_SECONDS)}</div>
  </span>
);

export const EVENTS_TABLE_COLUMNS = [
  {
    title: 'Event',
    key: 'id',
    width: '60%',
    type: 'eventtype',
  },
  {
    title: 'Time',
    key: 'timestamp_sec',
    render: (text, record, formatDateTime) =>
      renderDateTimeCell(
        record.timestamp_sec ||
          record.headers__timestamp ||
          record.telemetry__utc_timestamp_sent,
        formatDateTime
      ),
    sorter: (a, b) => sortTimestampSelector({ a, b }),
    sortOrder: 'ascend',
    width: '40%',
    type: 'datetime',
  },
];
