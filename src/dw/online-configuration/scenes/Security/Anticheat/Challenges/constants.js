const editFormFieldsOrder = [
  'recipientGroups',
  'validResponse',
  ['weight', 'gameModes', 'challengeGroup'],
  ['challengeCondition', 'challengeConditionValue'],
];

export const COLUMNS = [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'Id',
    width: '5%',
    type: 'number',
  },
  {
    key: 'functionId',
    dataIndex: 'functionId',
    title: 'Function Id',
    width: '7%',
    type: 'number',
  },
  {
    key: 'parameters',
    dataIndex: 'parameters',
    title: 'Parameters',
    width: '15%',
    type: 'string',
  },
  {
    key: 'validResponse',
    dataIndex: 'validResponse',
    title: 'Valid Response',
    width: '7%',
    type: 'string',
  },
  {
    key: 'challengeGroup',
    dataIndex: 'challengeGroup',
    title: 'Challenge Group',
    width: '7%',
    type: 'number',
  },
  {
    key: 'gameModes',
    dataIndex: 'gameModes',
    title: 'Game Modes',
    width: '7%',
    type: 'string',
    render: value => value.join(', '),
  },
  {
    key: 'challengeCondition',
    dataIndex: 'challengeCondition',
    title: 'Challenge Condition',
    width: '7%',
    type: 'string',
    choices: ['none', 'delay', 'interval', 'issueOnce'],
  },
  {
    key: 'challengeConditionValue',
    dataIndex: 'challengeConditionValue',
    title: 'Challenge Condition Value',
    width: '7%',
    type: 'number',
  },
  {
    key: 'recipientGroups',
    dataIndex: 'recipientGroupsFormatted',
    title: 'Recipient Groups',
    width: '15%',
    type: 'string',
    multiple: true,
  },
  {
    key: 'weight',
    dataIndex: 'weight',
    title: 'Weight',
    width: '7%',
    type: 'number',
  },
  {
    key: 'safetyLevel',
    dataIndex: 'safetyLevel',
    title: 'Safety Level',
    width: '7%',
    type: 'string',
  },
];

export const getEditColumns = (monitoringGroups = {}) => {
  const newColumns = [];
  editFormFieldsOrder.forEach(columns => {
    const columnNames = Array.isArray(columns) ? columns : [columns];
    newColumns.push(
      columnNames.map(columnName => {
        const column = {
          ...COLUMNS.find(c => c.key === columnName),
        };
        if (column.key === 'recipientGroups') {
          let choices = [];
          Object.entries(monitoringGroups).forEach(([groupId, name]) => {
            choices = [...choices, [groupId, name]];
            choices = [...choices, [`${groupId}*`, `${name}(unenforced)`]];
          });
          column.choices = [...choices];
        }
        return column;
      })
    );
  });
  return newColumns;
};
