import React from 'react';

import AsyncComponent from 'dw/core/components/AsyncComponent';

import Expandable from './components/Expandable';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

export const COLUMNS = [
  {
    key: 'generatorId',
    dataIndex: 'generatorId',
    title: 'Id',
    width: '7%',
    type: 'number',
  },
  {
    key: 'state',
    dataIndex: 'state',
    title: 'State',
    width: '10%',
    type: 'string',
    render: value => (
      <span className={`generator-state ${value.toLowerCase()}`}>{value}</span>
    ),
  },
  {
    key: 'config',
    dataIndex: 'config',
    title: 'Config',
    width: '21%',
    type: 'string',
    render: value => (
      <Expandable>
        <Monaco
          height={250}
          options={{
            folding: false,
            fontSize: 12,
            lineNumbers: false,
            minimap: { enabled: false },
            readOnly: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
          language="json"
          value={value}
        />
      </Expandable>
    ),
  },
  {
    key: 'lastRun',
    dataIndex: 'lastRun',
    title: 'LastRun',
    width: '17%',
    type: 'string',
  },
  {
    key: 'nextRun',
    dataIndex: 'nextRun',
    title: 'NextRun',
    width: '17%',
    type: 'string',
  },
  {
    key: 'history',
    dataIndex: 'history',
    title: 'History',
    width: '10%',
    type: 'string',
  },
];
