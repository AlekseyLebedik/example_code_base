import React from 'react';

export const COLUMNS = [
  {
    title: 'Achievement Name',
    dataIndex: 'name',
    key: 'name',
    type: 'string',
    width: '15%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    type: 'string',
    width: '8%',
  },
  {
    title: 'Activation Timestamp',
    key: 'activationTimestamp',
    dataIndex: 'activationTimestamp',
    type: 'datetime',
    width: '15%',
  },
  {
    title: 'Expiration Timestamp',
    key: 'expirationTimestamp',
    dataIndex: 'expirationTimestamp',
    type: 'datetime',
    width: '15%',
  },
  {
    title: 'Kind',
    key: 'kind',
    type: 'number',
    dataIndex: 'kind',
    width: '8%',
  },
  {
    title: 'Times',
    key: 'completionCount',
    type: 'number',
    dataIndex: 'completionCount',
    width: '8%',
  },
  {
    title: 'Progress',
    key: 'progress',
    type: 'number',
    dataIndex: 'progress',
    width: '8%',
  },
  {
    title: 'Progress Target',
    key: 'progressTarget',
    type: 'number',
    dataIndex: 'progressTarget',
    width: '10%',
  },
  {
    title: 'Multi-Progress',
    key: 'multiProgress',
    type: 'string',
    width: '21%',
    render: (text, record) =>
      record.multiProgress &&
      Object.entries(record.multiProgress).map(([name, progress]) => (
        <span key={name}>
          {name}: {progress.value} / {progress.target} |&nbsp;
          <br />
        </span>
      )),
  },
];
