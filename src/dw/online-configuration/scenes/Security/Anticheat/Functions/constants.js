export const COLUMNS = [
  {
    key: 'functionId',
    dataIndex: 'functionId',
    title: 'Function Id',
    width: '20%',
    type: 'number',
  },
  {
    key: 'functionName',
    dataIndex: 'functionName',
    title: 'Function Name',
    width: '35%',
    type: 'string',
  },
  {
    key: 'argumentNames',
    dataIndex: 'argumentNames',
    title: 'Argument Names',
    width: '45%',
    type: 'string',
    render: value => (value ? value.join(', ') : ''),
  },
];
