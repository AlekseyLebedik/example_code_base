export const COLUMNS = [
  {
    key: 'eventId',
    dataIndex: 'eventId',
    title: 'Id',
    width: '10%',
    type: 'number',
  },
  {
    key: 'timestamp',
    dataIndex: 'timestamp',
    title: 'Timestamp',
    width: '15%',
    type: 'string',
  },
  {
    key: 'generatorId',
    dataIndex: 'generatorId',
    title: 'GeneratorId',
    width: '10%',
    type: 'number',
  },
  {
    key: 'challengeId',
    dataIndex: 'challengeId',
    title: 'ChallengeId',
    width: '10%',
    type: 'number',
  },
  {
    key: 'event',
    dataIndex: 'event',
    title: 'Event',
    width: '10%',
    type: 'string',
  },
  {
    key: 'eventData',
    dataIndex: 'eventData',
    title: 'eventData',
    width: '54%',
    type: 'string',
  },
];

export const defaultSearchField = {
  key: 'eventId',
  type: 'number',
};

export const advancedSearchFields = [
  {
    key: 'timestamp__gte',
    label: 'Timestamp greater than or equal',
    type: 'datetime',
  },
  {
    key: 'timestamp__lt',
    label: 'Timestamp less than',
    type: 'datetime',
  },
  {
    key: 'event',
    type: 'string',
  },
];

const orderColumns = ['eventID', 'timestamp', 'event'];

const directions = ['ASC', 'DESC'];

export const orderChoices = [
  { value: null, text: 'Default' },
  ...orderColumns.reduce((choices, column) => {
    directions.forEach(d =>
      choices.push({ value: `${column},${d}`, text: `${column} - ${d}` })
    );
    return choices;
  }, []),
];
