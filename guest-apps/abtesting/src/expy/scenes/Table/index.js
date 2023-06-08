import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import Loading from 'dw/core/components/Loading';

import GridComponents from './support';

import { columnDefs, defaultColDef } from './columns';
import { fetchAllTests } from './helpers';

import { useStyles } from './styles';

const components = {
  statusRenderer: GridComponents.StatusRenderer,
  badgeRenderer: GridComponents.BadgeRenderer,
  dateRenderer: GridComponents.DateRenderer,
  approverRenderer: GridComponents.ApproverRenderer,
  statusFilter: GridComponents.StatusFilter,
  categoriesFilter: GridComponents.CategoriesFilter,
  inputFilter: GridComponents.InputFilter,
  titleFilter: GridComponents.TitleFilter,
  loadingCustomComponent: Loading,
};

const Table = () => {
  const classes = useStyles();
  const history = useHistory();
  const [gridApi, setGridApi] = useState();

  const tests = useSelector(state => state.Expy.tests.data);
  const isDrawerOpen = useSelector(state => state.Expy.drawer.isOpen);

  const dispatch = useDispatch();

  const onRowClicked = row =>
    history.push(`/abtesting/expy/test-catalog/${row.data.id}`);

  const onGridReady = params => {
    setGridApi(params.api);
    // params.api.showLoadingOverlay()
    dispatch(fetchAllTests());
    window.addEventListener('resize', () => params.api.sizeColumnsToFit());
  };

  // const isRowActive = (testId) => (activeTestId === testId.toString()) && isDrawerOpen;

  const onFirstDataRendered = params => params.api.sizeColumnsToFit();

  useEffect(() => {
    if (gridApi) setTimeout(() => gridApi.sizeColumnsToFit(), 250);
  }, [isDrawerOpen, gridApi]);

  return (
    <div className={cn('ag-theme-material', classes.tableContainer)}>
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        suppressClickEdit
        suppressCellFocus
        rowData={tests}
        onGridReady={onGridReady}
        onRowClicked={row => onRowClicked(row)}
        components={components}
        // loadingOverlayComponent="loadingCustomComponent"
        rowStyle={{ cursor: 'pointer' }}
        onFirstDataRendered={onFirstDataRendered}
        rowHeight={70}
        statusBar={{
          statusPanels: [
            {
              statusPanel: 'agTotalRowCountComponent',
              align: 'left',
            },
          ],
        }}
      />
    </div>
  );
};

export default Table;
