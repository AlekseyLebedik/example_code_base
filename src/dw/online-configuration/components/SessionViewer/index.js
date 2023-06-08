import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import Table from 'dw/core/components/TableHydrated';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import ExpandedRow from './components/ExpandedRow';
import { COLUMNS as COLUMNS_LEGACY } from './constantsLegacy';
import {
  COLUMNS,
  DETAIL_COLUMNS,
  DISPLAY_ROWS,
  ROW_HEIGHT,
  OFFSET,
  renderers,
} from './constants';
import { makeDetailsSelector } from './selectors';

import styles from './index.module.css';

class DetailSection extends React.Component {
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  };

  render() {
    return (
      <div className={styles.container}>
        <FeatureSwitchesCheck
          featureSwitches={fs.SESSION_VIEWER_USE_AGGRID} // isStaffAllowed={false}
          noAccessComponent={() => (
            <Table
              id="lobbies-table"
              data={this.props.lobbies}
              getKey={lobby => lobby.id}
              scroll={{
                x: 2400,
              }}
              expandedRowRender={record => (
                <ExpandedRow
                  record={{
                    currentPlayerState: record.currentPlayerState,
                    teams: record.teams,
                  }}
                />
              )}
              columns={COLUMNS_LEGACY.filter(
                c => !this.props.excludeColumns.includes(c.dataIndex)
              )}
              className="table-lobbies"
              formatDateTime={this.props.formatDateTime}
            />
          )}
        >
          <AgGridReact
            columnDefs={COLUMNS.filter(
              c => !this.props.excludeColumns.includes(c.field)
            )}
            rowData={this.props.lobbies}
            components={renderers}
            onGridReady={this.onGridReady}
            context={{
              formatDateTime: this.props.formatDateTime,
            }}
            masterDetail
            defaultColDef={{
              filter: 'agTextColumnFilter',
              sortable: true,
              floatingFilter: true,
            }}
            suppressContextMenu
            suppressDragLeaveHidesColumns
            detailCellRendererParams={{
              suppressRefresh: true,
              getDetailRowData: ({ data: lobby, successCallback }) => {
                const data = this.props.detailsSelector(lobby);
                successCallback(data);
              },
              detailGridOptions: {
                defaultColDef: {
                  menuTabs: ['filterMenuTab'],
                },
                components: {
                  PlayerId: renderers.PlayerId,
                  PlayerName: renderers.PlayerName,
                },
                columnDefs: DETAIL_COLUMNS,
                onFirstDataRendered: params => {
                  params.api.sizeColumnsToFit();
                },
              },
            }}
            getRowHeight={params => {
              if (params.node && params.node.detail) {
                const data = params.data.currentPlayerState
                  ? Object.keys(params.data.currentPlayerState)
                  : [];
                const allDetailRowHeight =
                  Math.min(data.length, DISPLAY_ROWS) * ROW_HEIGHT;
                return allDetailRowHeight + OFFSET;
              }

              return ROW_HEIGHT;
            }}
          />
        </FeatureSwitchesCheck>
      </div>
    );
  }
}

DetailSection.propTypes = {
  lobbies: PropTypes.arrayOf(PropTypes.object).isRequired,
  formatDateTime: PropTypes.func.isRequired,
  excludeColumns: PropTypes.arrayOf(PropTypes.string),
  detailsSelector: PropTypes.func.isRequired,
};

DetailSection.defaultProps = {
  excludeColumns: [],
};

export default connect(state => ({
  detailsSelector: makeDetailsSelector(state),
}))(DetailSection);
