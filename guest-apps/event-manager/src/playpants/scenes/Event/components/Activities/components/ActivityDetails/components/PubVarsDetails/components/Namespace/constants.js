/* eslint-disable react/prop-types */
import React from 'react';
import CustomVariableRenderer from '../CustomVariableRenderer';
import clearVariableRenderer from '../ClearVariableRenderer';

import {
  variableTooltip,
  liveValueTooltip,
  oldValueTooltip,
  newValueTooltip,
} from '../../constants';

export const NAMESPACE_COLUMN_DEFS = (disabled, clearVariable) => [
  {
    field: 'variable',
    filter: 'agTextColumnFilter',
    headerName: 'Variable',
    cellRenderer: ({ value, context }) => (
      <CustomVariableRenderer
        value={value}
        activitySettings={context.activitySettings}
      />
    ),
    headerTooltip: variableTooltip,
  },
  {
    field: 'liveValue',
    filter: 'agTextColumnFilter',
    headerName: 'Live Value',
    headerTooltip: liveValueTooltip,
  },
  {
    field: 'oldValue',
    filter: 'agTextColumnFilter',
    headerName: 'Old Value',
    headerTooltip: oldValueTooltip,
  },
  {
    cellStyle: params => ({
      'background-color':
        params.value && params.value !== '0' ? '#d7f6e8' : '#ffcdd2',
      'font-weight': params.value && params.value !== '0' ? '500' : 'normal',
    }),
    editable: !disabled,
    field: 'newValue',
    filter: 'agTextColumnFilter',
    headerName: 'New Value',
    headerTooltip: newValueTooltip,
  },
  {
    cellRenderer: clearVariableRenderer,
    cellRendererParams: {
      clearVariable,
    },
    field: 'action',
    filter: false,
    headerName: 'Action',
    hide: disabled,
    resizable: false,
    sortable: false,
    suppressMenu: true,
  },
];
