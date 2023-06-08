export const COLUMNS = [
  {
    title: 'Timestamp',
    key: 'timestamp',
    dataIndex: 'timestamp',
    type: 'datetime',
  },
  {
    title: 'Connection ID',
    dataIndex: 'con',
    key: 'con',
    type: 'string',
  },
  {
    title: 'Transaction ID',
    dataIndex: 'tr',
    key: 'tr',
    type: 'string',
  },
  {
    title: 'User ID',
    dataIndex: 'uid',
    key: 'uid',
    type: 'string',
  },
  {
    title: 'Username',
    dataIndex: 'usr',
    key: 'usr',
    type: 'string',
  },
];

export const SEARCH_DEFAULT_FIELD = {
  key: 'transId',
  label: 'Transaction ID',
  type: 'number',
  desc: 'Provide a numeric value, i.e 1234567890',
};
export const SEARCH_ADVANCED_FIELDS = [
  {
    key: 'userId',
    label: 'User ID',
    type: 'number',
    desc: 'Provide a numeric value, i.e 1234567890',
  },
  { key: 'userName', label: 'User Name', type: 'string', desc: '' },
  {
    key: 'connId',
    label: 'Connection ID',
    type: 'number',
    desc: 'Provide a numeric value, i.e 1234567890',
  },
  {
    key: 'message',
    label: 'Message',
    type: 'string',
    desc: 'Provide text to be searched in Message',
  },
  {
    key: 'startDate',
    label: 'Start Date',
    type: 'datetime',
  },
  {
    key: 'endDate',
    label: 'End Date',
    type: 'datetime',
  },
];
