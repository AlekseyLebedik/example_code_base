import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import AGGrid from 'dw/core/components/AGGrid';
import { useConfigOption } from 'dw/online-configuration/hooks';

const GVSGrid = ({ components, onColumnVisible, ...props }) => {
  const configPlatforms = useConfigOption('GVS_PLATFORMS', []);
  const columnApi = useRef();
  const onGridReady = params => {
    columnApi.current = params.columnApi;
    if (props.onGridReady) props.onGridReady(params);

    const rawColumns = localStorage.getItem('GVS_COLUMNS');
    const columns = rawColumns ? JSON.parse(rawColumns) : null;
    if (columns) {
      columnApi.current.applyColumnState({
        state: columns,
        applyOrder: true,
      });
    }
  };
  const onColumnMoved = useCallback(
    e => {
      if (!columnApi.current) return;
      onColumnVisible(e);
      const columns = columnApi.current
        .getColumnState()
        .filter(({ colId }) => configPlatforms?.includes(colId))
        .map(({ colId, hide }) => ({ colId, hide }));
      localStorage.setItem('GVS_COLUMNS', JSON.stringify(columns));
    },
    [configPlatforms, onColumnVisible]
  );
  const gridOptions = useMemo(
    () => ({
      ...props.gridOptions,
      sideBar: {
        toolPanels: [
          {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressColumnFilter: true,
              suppressColumnSelectAll: true,
              suppressColumnExpandAll: true,
            },
          },
        ],
      },
      components,
    }),
    [components]
  );
  return (
    <AGGrid
      {...props}
      onGridReady={onGridReady}
      gridOptions={{
        ...gridOptions,
        alignRowCenter: true,
      }}
      onColumnMoved={onColumnMoved}
      onColumnVisible={onColumnMoved}
    />
  );
};
GVSGrid.propTypes = {
  gridOptions: PropTypes.object,
  components: PropTypes.object,
  onGridReady: PropTypes.func,
  onColumnVisible: PropTypes.func,
};
GVSGrid.defaultProps = {
  gridOptions: {},
  components: {},
  onGridReady() {},
  onColumnVisible() {},
};

export default GVSGrid;
