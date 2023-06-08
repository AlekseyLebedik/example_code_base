import React from 'react';

import PropTypes from 'prop-types';
import AGGrid from 'dw/core/components/AGGrid';
import Link from 'dw/core/components/Link';

import { columnDefs } from './constants';
import detailCellRenderer from './detailCellRenderer';
import customHeaderRenderer from './customHeaderRenderer';

const UuidRenderer = params => {
  const accountIds = params?.value?.split('|') || [];
  const { url, accountsServiceConfigId } = params?.context;

  if (accountIds.length > 1) {
    const [accountID, secAccountID] = accountIds.map(v => v.trim());
    return (
      <div>
        <Link
          to={`${url}${accountID}?serviceConfigID=${accountsServiceConfigId}`}
        >
          {accountID}
        </Link>{' '}
        |{' '}
        <Link
          to={`${url}${secAccountID}?serviceConfigID=${accountsServiceConfigId}`}
        >
          {secAccountID}
        </Link>
      </div>
    );
  }
  return (
    <Link
      to={`${url}${params?.value}?serviceConfigID=${accountsServiceConfigId}`}
    >
      {params?.value}
    </Link>
  );
};

const AggridComponent = ({ context, rowData, handleOnGridReady }) => (
  <AGGrid
    columnDefs={columnDefs}
    onGridReady={handleOnGridReady}
    rowData={rowData}
    context={context}
    detailCellRendererFramework={detailCellRenderer}
    gridOptions={{
      components: {
        customHeader: customHeaderRenderer,
        uuidRenderer: UuidRenderer,
      },
      valueCache: true,
      detailRowHeight: 210,
      animateRows: true,
      defaultColDef: {
        autoHeight: false,
        minWidth: 200,
      },
      masterDetail: true,
      rowHeight: 60,
      isRowMaster: params => !params?.umbrella_id,
      detailCellRendererParams: {
        detailGridOptions: {
          suppressNoRowsOverlay: true,
        },
      },
    }}
  />
);

AggridComponent.propTypes = {
  rowData: PropTypes.array.isRequired,
  context: PropTypes.object.isRequired,
  handleOnGridReady: PropTypes.func.isRequired,
};

export default AggridComponent;
