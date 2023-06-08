import React from 'react';
import PropTypes from 'prop-types';

import StatusTableField from 'abtesting/components/StatusTableField';
import ActionsPanel from 'abtesting/components/ActionsPanel';
import ClipboardTooltip from 'dw/core/components/ClipboardTooltip';
import ABTestViewLink from 'abtesting/components/ABTestViewLink';

const WrapOnLineBreaks = props => (
  <span style={{ whiteSpace: 'pre' }}>{props.value}</span>
);

WrapOnLineBreaks.propTypes = {
  value: PropTypes.string,
};
WrapOnLineBreaks.defaultProps = {
  value: '',
};

export const COLUMNS = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    type: 'string',
    width: '5%',
    noFiltering: true,
    render: value => (
      <ClipboardTooltip label="TestID" clipboardText={value}>
        <strong>...</strong>
        {value.slice(-4)}
      </ClipboardTooltip>
    ),
  },
  {
    title: 'Test Name',
    key: 'name',
    dataIndex: 'name',
    type: 'string',
    width: '14%',
    noFiltering: true,
    render: (_, test) => <ABTestViewLink test={test} />,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    type: 'string',
    width: '6%',
    noFiltering: true,
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    render: value => <WrapOnLineBreaks value={value} />,
    key: 'platform',
    type: 'string',
    width: '4%',
    noFiltering: true,
  },
  {
    title: 'Env',
    dataIndex: 'environment',
    key: 'environment',
    type: 'string',
    width: '4%',
    noFiltering: true,
  },
  {
    title: 'Source',
    dataIndex: 'source',
    render: value => <WrapOnLineBreaks value={value} />,
    key: 'source',
    type: 'string',
    width: '4%',
    noFiltering: true,
  },
  {
    title: 'Target',
    dataIndex: 'target',
    render: value => <WrapOnLineBreaks value={value} />,
    key: 'target',
    type: 'string',
    width: '4%',
    noFiltering: true,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    render: value => <WrapOnLineBreaks value={value} />,
    key: 'category',
    type: 'string',
    width: '5%',
    noFiltering: true,
  },
  {
    title: 'Test Period From',
    dataIndex: 'testPeriodStart',
    key: 'testPeriodStart',
    type: 'datetime',
    width: '5%',
    noFiltering: true,
  },
  {
    title: 'Test Period To',
    dataIndex: 'testPeriodEnd',
    key: 'testPeriodEnd',
    type: 'datetime',
    width: '5%',
    noFiltering: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: value => <StatusTableField status={value} />,
    key: 'status',
    type: 'string',
    width: '6%',
    noFiltering: true,
  },
  {
    title: 'Actions',
    render: (_, record) => <ActionsPanel record={record} />,
    key: 'action',
    width: '10%',
  },
];

// Used for initial sorting of the TestsList table component
export const sortedInfo = {
  columnKey: 'testPeriodStart',
  order: 'ascend',
};
