export const COLUMNS = [
  { key: 'service', label: 'Service', width: 7, advanced: true },
  { key: 'clientType', label: 'Client Type', width: 3, advanced: true },
  { key: 'task', label: 'Task', width: 7 },
  { key: 'allow', label: 'Allow', width: 3, advanced: true, type: 'bool' },
  { key: 'source', label: 'Source', width: 3, advanced: true },
  { key: 'delete', width: 1 },
];

export const SEARCH_DEFAULT_FIELD = COLUMNS[2];

export const SEARCH_ADVANCED_FIELDS = COLUMNS.filter(c => c.advanced);
