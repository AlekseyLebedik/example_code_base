import React from 'react';

export const COLUMNS = [
  {
    title: 'Status',
    render: text => <span className={`imp-status-${text}`}>{text}</span>,
    dataIndex: 'status',
    key: 'status',
    type: 'string',
    width: '10%',
  },
  {
    title: 'Revision',
    dataIndex: 'id',
    key: 'id',
    type: 'number',
    width: '10%',
  },
  {
    title: 'IMP Version',
    dataIndex: 'version',
    key: 'version',
    type: 'string',
    width: '12%',
  },
  {
    title: 'MD5 Checksum',
    dataIndex: 'md5sum',
    key: 'md5sum',
    type: 'string',
    width: '24%',
  },
  {
    title: 'Validation',
    dataIndex: 'validationStatus',
    key: 'validationStatus',
    type: 'string',
    width: '16%',
  },
  {
    title: 'Applied by',
    dataIndex: 'user.username',
    key: 'username',
    type: 'string',
    width: '12%',
  },
  {
    title: 'Created At',
    dataIndex: 'dateCreated',
    type: 'datetime',
    width: '16%',
  },
];

export const UPLOAD_IMP_FILE_MODAL_TITLE = 'Upload File To IMP History';
