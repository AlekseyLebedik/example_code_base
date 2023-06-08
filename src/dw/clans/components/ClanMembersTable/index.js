import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { ClansContext } from 'dw/clans/components/ClansProvider';
import AGGrid from 'dw/core/components/AGGrid';
import { MEMBERS_PROP, PLAYER_PROPTYPE } from 'dw/clans/constants';
import components from './cellRenderers';

const useStyles = makeStyles({
  table: {
    border: 'solid #e2e2e2 1px',
    '& .ag-header-row': { backgroundColor: '#e2e2e2' },
    '& .ag-status-bar': { height: 32 },
    '& .ag-status-name-value': { paddingTop: 8, paddingBottom: 8 },
    '& .ag-floating-top': { zIndex: '10' },
    '& .ag-floating-top, .ag-floating-top-viewport, .ag-cell': {
      overflow: 'visible !important',
    },
    '& .checkbox-disabled': {
      lineHeight: '1.5 !important',
    },
    '& .checkbox-enabled': {
      lineHeight: '1.5 !important',
    },
    '& .ag-cell-value': {
      overflow: 'visible !important',
    },
    '& .ag-row': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

const ClanMembersTable = ({
  apiRef,
  columnDefs,
  columnProps,
  getRowId,
  formatDateTime,
  handleSelectMember,
  isRowSelectable,
  pinnedTopRowData,
  rowData,
}) => {
  const classes = useStyles();
  const { accountsServiceConfigId } = useContext(ClansContext);

  const onGridReady = useCallback(({ api }) => {
    // eslint-disable-next-line no-param-reassign
    apiRef.current = api;
    apiRef.current.setPinnedTopRowData(pinnedTopRowData);
  }, []);

  return (
    <AGGrid
      animateRows
      autoSizeColumns={false}
      className={classes.table}
      columnDefs={columnDefs}
      context={{ formatDateTime, accountsServiceConfigId }}
      gridOptions={{
        defaultColDef: {
          suppressCellFlash: true,
          ...columnProps,
        },
        getRowStyle: params => {
          if (params.node.rowPinned) return { color: 'grey' };
          return {};
        },
        components,
        headerHeight: 32,
        isRowSelectable,
        sideBar: null,
        suppressCellFocus: true,
        getRowId,
      }}
      onGridReady={onGridReady}
      onRowSelected={handleSelectMember}
      rowData={rowData}
    />
  );
};

ClanMembersTable.propTypes = {
  apiRef: PropTypes.object.isRequired,
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnProps: PropTypes.object,
  formatDateTime: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
  handleSelectMember: PropTypes.func.isRequired,
  isRowSelectable: PropTypes.func,
  pinnedTopRowData: PropTypes.arrayOf(
    PropTypes.shape({
      player: PLAYER_PROPTYPE.isRequired,
      role: PropTypes.string.isRequired,
    })
  ),
  rowData: MEMBERS_PROP.isRequired,
};
ClanMembersTable.defaultProps = {
  columnProps: {},
  isRowSelectable: () => true,
  pinnedTopRowData: undefined,
};

export default ClanMembersTable;
