import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import classNames from 'classnames';

import styles from './presentational.module.css';
import AGGridPresentational from './presentational';
import OptionsToolPanel from './components/OptionsToolPanel';

// run hook only on componentDidUpdate and not componentDidMount (prevents a hook from running on initial render)
const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};

const handleAutoSizeColumns = columnApi => {
  try {
    const allColumnIds = columnApi.getAllColumns()?.map(col => col.colId);
    columnApi.autoSizeColumns(allColumnIds, false);
  } catch (err) {
    // eslint-disable-next-line
    console.warn(`Error happen on grid resize ${err}`);
  }
};

const handleResizeGrid = (autoSizeColumns, autoSizeMaxWidth) => params => {
  setTimeout(() => {
    const api = params?.gridApi ? params?.gridApi : params?.api;
    if (autoSizeColumns) {
      handleAutoSizeColumns(params?.columnApi);
    } else {
      api.sizeColumnsToFit();
    }
    if (autoSizeMaxWidth && window.innerHeight > autoSizeMaxWidth) {
      api.sizeColumnsToFit();
    }
  }, 50);
};

const AGGrid = ({
  async,
  asyncGridProps,
  autoSizeColumns,
  autoSizeMaxWidth,
  className,
  context,
  dataCy,
  gridOptions,
  onColumnResized,
  onColumnVisible,
  onFirstDataRendered,
  onGridReady,
  onGridSizeChanged,
  rowData,
  ...props
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [manualGridOptions, setManualGridOptions] = useState({});
  const [hardRefresh, setHardRefresh] = useState(false);

  const resizeGrid = useCallback(() => {
    if (gridApi && columnApi) {
      handleResizeGrid(
        autoSizeColumns,
        autoSizeMaxWidth
      )({ gridApi, columnApi });
    }
  }, [gridApi, columnApi]);

  // 'gridApi' or 'columnApi' changed, on component update add
  // window resize event listener when grid is ready, and sets removal function
  useDidUpdateEffect(() => {
    resizeGrid();
    window.addEventListener('resize', resizeGrid);
    return () => window.removeEventListener('resize', resizeGrid);
  }, [gridApi, columnApi]);

  const handleOnGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    onGridReady(params);
  };

  const handleManualGridUpdate = (options, api) => {
    setManualGridOptions(options);
    setHardRefresh(true);
    api.destroy();
    setTimeout(() => setHardRefresh(false), 0);
  };

  // When a column is resized manually, re-calculate row heights
  const handleOnColumnResized = params => {
    if (
      params.type === 'columnResized' &&
      params.finished === true &&
      params.source !== 'autosizeColumns'
    ) {
      onColumnResized(params);
    }
  };

  // When a column is shown or hidden, re-calculate row heights
  const handleOnColumnVisible = params => {
    onColumnVisible(params);
  };

  const commonGridOptions = {
    onColumnResized: handleOnColumnResized,
    onColumnVisible: handleOnColumnVisible,
    onGridSizeChanged: handleOnColumnVisible,
    defaultColDef: merge(
      {},
      AGGrid.defaultProps.gridOptions.defaultColDef,
      gridOptions.defaultColDef
    ),
    defaultColGroupDef: merge(
      {},
      AGGrid.defaultProps.gridOptions.defaultColGroupDef,
      gridOptions.defaultColGroupDef
    ),
  };

  const nonAsyncGridProps = {
    onGridReady: handleOnGridReady,
    rowData,
    statusBar: merge(
      {
        statusPanels: [
          {
            statusPanel: 'agTotalRowCountComponent',
            align: 'left',
          },
          { statusPanel: 'agFilteredRowCountComponent' },
          { statusPanel: 'agSelectedRowCountComponent' },
        ],
      },
      gridOptions.statusBar
    ),
  };

  const mergedGridOptions = useMemo(() => {
    const result = merge(
      {},
      AGGrid.defaultProps.gridOptions,
      gridOptions,
      commonGridOptions,
      manualGridOptions
    );
    result.sideBar = gridOptions.sideBar || result.sideBar;
    return result;
  }, [gridOptions, commonGridOptions, manualGridOptions]);

  if (gridOptions.alignRowCenter)
    mergedGridOptions.rowClass = classNames(
      mergedGridOptions?.rowClass,
      styles.rowClassCenter
    );

  return (
    <AGGridPresentational
      async={async}
      asyncGridProps={{ ...asyncGridProps, onGridReady: handleOnGridReady }}
      className={className}
      context={{ ...context, handleManualGridUpdate }}
      dataCy={dataCy}
      gridOptions={mergedGridOptions}
      hardRefresh={hardRefresh}
      nonAsyncGridProps={nonAsyncGridProps}
      {...props}
    />
  );
};

AGGrid.propTypes = {
  // optional
  autoSizeColumns: PropTypes.bool,
  autoSizeMaxWidth: PropTypes.number,
  className: PropTypes.string,
  context: PropTypes.object,
  dataCy: PropTypes.string,
  gridOptions: PropTypes.shape({
    alignRowCenter: PropTypes.bool,
    animateRows: PropTypes.bool,
    autoGroupColumnDef: PropTypes.object,
    autoSizePadding: PropTypes.number,
    cacheQuickFilter: PropTypes.bool,
    defaultColDef: PropTypes.object,
    defaultColGroupDef: PropTypes.object,
    domLayout: PropTypes.oneOf(['normal', 'autoHeight', 'print']),
    enableCellTextSelection: PropTypes.bool,
    ensureDomOrder: PropTypes.bool,
    components: PropTypes.object,
    groupDefaultExpanded: PropTypes.number,
    groupRemoveSingleChildren: PropTypes.bool,
    groupSelectsChildren: PropTypes.bool,
    groupSelectsFiltered: PropTypes.bool,
    groupDisplayType: PropTypes.string,
    headerHeight: PropTypes.number,
    multiSortKey: PropTypes.oneOf(['ctrl', null]),
    overlayLoadingTemplate: PropTypes.string,
    pagination: PropTypes.bool,
    paginationPageSize: PropTypes.number,
    rowGroupPanelShow: PropTypes.oneOf(['never', 'always', 'onlyWhenGrouping']),
    rowClass: PropTypes.string,
    rowHeight: PropTypes.number,
    rowMultiSelectWithClick: PropTypes.bool,
    rowSelection: PropTypes.oneOf(['single', 'multiple']),
    sideBar: PropTypes.object,
    singleClickEdit: PropTypes.bool,
    statusBar: PropTypes.object,
    stopEditingWhenGridLosesFocus: PropTypes.bool,
    suppressCellFocus: PropTypes.bool,
    suppressClickEdit: PropTypes.bool,
    suppressColumnVirtualisation: PropTypes.bool,
    suppressContextMenu: PropTypes.bool,
    suppressDragLeaveHidesColumns: PropTypes.bool,
    suppressHeaderKeyboardEvent: PropTypes.bool,
    suppressKeyboardEvent: PropTypes.bool,
    suppressMenuHide: PropTypes.bool,
    suppressRowClickSelection: PropTypes.bool,
    suppressRowHoverHighlight: PropTypes.bool,
    suppressScrollOnNewData: PropTypes.bool,
  }),
  onCellClicked: PropTypes.func,
  onColumnResized: PropTypes.func,
  onColumnVisible: PropTypes.func,
  onFirstDataRendered: PropTypes.func,
  onGridReady: PropTypes.func,
  onGridSizeChanged: PropTypes.func,
  onRowSelected: PropTypes.func,
  // required
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  // required for async
  async: PropTypes.bool,
  // eslint-disable-next-line no-use-before-define
  asyncGridProps: PropTypes.shape(AsyncAGGrid.propTypes),
  // required for non-async
  rowData: PropTypes.arrayOf(PropTypes.object),
};
AGGrid.defaultProps = {
  // optional
  autoSizeColumns: true,
  autoSizeMaxWidth: 2000,
  className: undefined,
  context: {},
  dataCy: undefined,
  gridOptions: {
    alignRowCenter: false,
    animateRows: true,
    autoGroupColumnDef: {
      lockPosition: true,
      minWidth: 400,
      resizable: true,
      sortable: true,
    },
    autoSizePadding: 4,
    cacheQuickFilter: false,
    defaultColDef: {
      autoHeight: true,
      editable: false,
      enablePivot: true,
      enableRowGroup: true,
      enableValue: true,
      filter: 'agTextColumnFilter',
      flex: 1,
      maxWidth: 500,
      minWidth: 100,
      minHeight: 50,
      resizable: true,
      sortable: true,
      wrapText: true,
    },
    defaultColGroupDef: {
      resizable: true,
      autoWidth: true,
    },
    domLayout: 'normal',
    enableCellTextSelection: true,
    ensureDomOrder: true,
    components: { optionsToolPanel: OptionsToolPanel },
    groupDefaultExpanded: 0,
    groupRemoveSingleChildren: false,
    groupSelectsChildren: true,
    groupSelectsFiltered: true,
    groupDisplayType: null,
    headerHeight: 50,
    multiSortKey: null,
    overlayLoadingTemplate:
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
    pagination: false,
    paginationPageSize: 100,
    rowGroupPanelShow: 'never',
    rowClass: '',
    rowHeight: 50,
    rowMultiSelectWithClick: true,
    rowSelection: 'multiple',
    sideBar: {
      toolPanels: [
        {
          id: 'options',
          labelDefault: 'Options',
          labelKey: 'options',
          iconKey: 'menu',
          toolPanel: 'optionsToolPanel',
        },
        'columns',
        'filters',
      ],
    },
    singleClickEdit: false,
    statusBar: {},
    stopEditingWhenGridLosesFocus: false,
    suppressCellFocus: false,
    suppressClickEdit: false,
    suppressColumnVirtualisation: false,
    suppressContextMenu: false,
    suppressDragLeaveHidesColumns: true,
    suppressHeaderKeyboardEvent: true,
    suppressKeyboardEvent: false,
    suppressMenuHide: false,
    suppressRowClickSelection: false,
    suppressRowHoverHighlight: false,
    suppressScrollOnNewData: false,
  },
  onCellClicked: () => {},
  onColumnResized: () => {},
  onColumnVisible: () => {},
  onFirstDataRendered: () => {},
  onGridReady: () => {},
  onGridSizeChanged: () => {},
  onRowSelected: () => {},
  // required for async
  async: false,
  asyncGridProps: {},
  // required for non-async
  rowData: [],
};

export function AsyncAGGrid({
  ActionButtonComponent,
  actionButtonComponentProps,
  autoSizeColumns,
  autoSizeMaxWidth,
  dataFormatter,
  extendColumnsFromResult,
  fetchWithSearch,
  header,
  onLoadData,
  searchPlaceHolder,
  useQuickFilter,
  ...props
}) {
  const asyncGridProps = {
    ActionButtonComponent,
    actionButtonComponentProps,
    autoSizeColumns: autoSizeColumns
      ? handleResizeGrid(autoSizeColumns, autoSizeMaxWidth)
      : undefined,
    dataFormatter,
    extendColumnsFromResult,
    fetchWithSearch,
    header,
    onLoadData,
    searchPlaceHolder,
    useQuickFilter,
  };
  return (
    <AGGrid
      {...props}
      autoSizeMaxWidth={autoSizeMaxWidth}
      asyncGridProps={asyncGridProps}
      async
    />
  );
}

AsyncAGGrid.propTypes = {
  ActionButtonComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  actionButtonComponentProps: PropTypes.object,
  autoSizeColumns: PropTypes.bool,
  autoSizeMaxWidth: PropTypes.number,
  className: PropTypes.string,
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataCy: PropTypes.string,
  dataFormatter: PropTypes.func,
  extendColumnsFromResult: PropTypes.bool,
  fetchWithSearch: PropTypes.bool,
  header: PropTypes.string,
  onGridReady: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  searchPlaceHolder: PropTypes.string,
  useNewReusableAGGrid: PropTypes.bool,
  useQuickFilter: PropTypes.bool,
};
AsyncAGGrid.defaultProps = {
  ActionButtonComponent: undefined,
  actionButtonComponentProps: undefined,
  autoSizeColumns: AGGrid.defaultProps.autoSizeColumns,
  autoSizeMaxWidth: AGGrid.defaultProps.autoSizeMaxWidth,
  className: undefined,
  dataCy: undefined,
  dataFormatter: rows => rows,
  extendColumnsFromResult: false,
  fetchWithSearch: false,
  header: undefined,
  onGridReady: () => {},
  searchPlaceHolder: 'Search within the rows below',
  useNewReusableAGGrid: false,
  useQuickFilter: true,
};

export default AGGrid;
