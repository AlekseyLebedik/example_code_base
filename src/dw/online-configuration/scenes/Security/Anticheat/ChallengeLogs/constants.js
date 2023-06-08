import UserLink from 'dw/online-configuration/components/UserLink';

export const COLUMNS = [
  {
    label: 'log ID',
    key: 'logId',
    type: 'number',
  },
  {
    label: 'timestamp',
    key: 'timestamp',
    type: 'datetime',
    search: false,
  },
  {
    label: 'timestamp greater than or equal',
    key: 'timestamp__gte',
    type: 'datetime',
    searchOnly: true,
  },
  {
    label: 'timestamp less than',
    key: 'timestamp__lt',
    type: 'datetime',
    searchOnly: true,
  },
  {
    label: 'user ID',
    key: 'userId',
    type: 'number',
  },
  {
    label: 'user name',
    key: 'userName',
    formatter: (value, record) => UserLink(record),
  },
  {
    label: 'monitored group ID',
    key: 'monitoredGroupId',
    type: 'number',
  },
  {
    label: 'monitored group',
    key: 'monitoredGroup',
  },
  {
    label: 'connection ID',
    key: 'connectionId',
    type: 'number',
  },
  {
    label: 'challenge ID',
    key: 'challengeId',
    type: 'number',
  },
  {
    label: 'response',
    key: 'response',
  },
  {
    label: 'response status',
    key: 'responseStatus',
  },
  {
    label: 'punished',
    key: 'punished',
    type: 'bool',
  },
  {
    label: 'log message',
    key: 'logMessage',
    search: false,
  },
];
