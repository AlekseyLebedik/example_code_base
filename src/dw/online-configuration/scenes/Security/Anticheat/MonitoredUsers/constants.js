import React from 'react';

import UserLink from 'dw/online-configuration/components/UserLink';

export const COLUMNS = [
  {
    key: 'userId',
    title: 'User Id',
    dataIndex: 'userId',
    width: '35%',
    render: (text, record) => <UserLink userId={record.userId} />,
  },
  {
    key: 'userName',
    title: 'User Name',
    dataIndex: 'userName',
    width: '35%',
  },
  {
    key: 'monitoringGroup',
    title: 'Monitoring Group',
    dataIndex: 'monitoringGroup',
    width: '30%',
  },
];
