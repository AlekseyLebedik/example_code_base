import UserLink from 'dw/online-configuration/components/UserLink';

export const COLUMNS = [
  {
    title: 'UserId',
    dataIndex: 'userId',
    key: 'userId',
    width: '15%',
  },
  {
    title: 'UserName',
    dataIndex: 'userName',
    key: 'userName',
    width: '13%',
    render: (value, record) => UserLink(record),
  },
  {
    title: 'MonitoredGroup',
    dataIndex: 'monitoredGroup',
    key: 'monitoredGroup',
    width: '14%',
  },
  {
    title: '#Failures',
    dataIndex: 'failures',
    key: 'failures',
    type: 'number',
    width: '9%',
  },
  {
    title: '(incl. #Unanswered)',
    dataIndex: 'unanswered',
    key: 'unanswered',
    type: 'number',
    width: '10%',
  },
  {
    title: '(incl. #Punishments)',
    dataIndex: 'punishments',
    key: 'punishments',
    type: 'number',
    width: '10%',
  },
  {
    title: 'Correct',
    dataIndex: 'correct',
    key: 'correct',
    type: 'number',
    width: '9%',
  },
  {
    title: 'Unexpected',
    dataIndex: 'unexpected',
    key: 'unexpected',
    type: 'number',
    width: '10%',
  },
  {
    title: '%Correct',
    dataIndex: 'percentCorrect',
    key: 'percentCorrect',
    type: 'number',
    width: '10%',
  },
];
