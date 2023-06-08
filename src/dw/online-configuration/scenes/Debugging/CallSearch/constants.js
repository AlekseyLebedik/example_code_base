export const COLUMNS = [
  { type: 'string', key: 'serviceName', label: 'Service / Task Name' },
  {
    type: 'date',
    key: 'startTime',
    label: 'Start Time (UTC)',
  },
  { type: 'number', key: 'errorCode', label: 'Error Code' },
  { type: 'string', key: 'errorName', label: 'Error Name' },
  { type: 'string', key: 'lsgError', label: 'LSG Error' },
  { type: 'number', key: 'userId', label: 'User ID' },
  { type: 'string', key: 'username', label: 'Username' },
  { type: 'string', key: 'transactionId', label: 'Transaction ID' },
];

export const defaultSearchField = COLUMNS.find(c => c.key === 'transactionId');

export const advancedSearchFields = COLUMNS.filter(
  c => c.key !== 'transactionId'
);
