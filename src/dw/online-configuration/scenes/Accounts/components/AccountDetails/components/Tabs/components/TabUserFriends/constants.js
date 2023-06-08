import { YesNoFromBool } from 'dw/core/helpers/api-data-parser';

export const COLUMNS = [
  {
    title: 'FriendName',
    dataIndex: 'friendName',
    key: 'friendName',
    width: '28%',
  },
  {
    title: 'Pending',
    dataIndex: 'pending',
    key: 'pending',
    width: '16%',
    render: value => YesNoFromBool(value),
  },
  {
    title: 'UpdateTime',
    key: 'updateTime',
    dataIndex: 'updateTime',
    type: 'datetime',
    width: '28%',
  },
];

export const PAGINATION = {
  pageSize: 5,
};

export const SEARCH_DEFAULT_FIELD = {
  key: 'friendId',
  label: 'Friend ID',
  type: 'number',
  desc: 'Provide a numeric value, i.e 1234567890',
  multi: true,
};
export const SEARCH_ADVANCED_FIELDS = [
  { key: 'pending', label: 'Pending', type: 'bool' },
];
