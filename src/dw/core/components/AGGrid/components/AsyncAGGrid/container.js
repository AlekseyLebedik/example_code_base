import React from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import capitalize from 'lodash/capitalize';
import differenceBy from 'lodash/differenceBy';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { hasData } from 'dw/core/helpers/object';
import AsyncAGGridStatelessComponent from './presentational';

class AsyncAGGrid extends React.Component {
  state = {
    inputValue: '',
    loading: false,
    nextPageToken: null,
    columnsExtended: false,
    extraFields: [],
  };

  componentDidMount() {
    this.isGridMounted = true;
  }

  componentWillUnmount() {
    this.isGridMounted = false;
  }

  onGridReady = params => {
    const { onGridReady, location, autoSizeColumns, useQuickFilter } =
      this.props;
    if (onGridReady)
      onGridReady({
        ...params,
        setWarning: this.setWarning,
        toggleLoading: this.toggleLoading,
      });
    this.gridApi = params.api;
    this.params = params;
    const queryParams = queryString.parse(location.search);
    const { q: query } = queryParams;
    if (query && useQuickFilter) {
      this.onFilterChange(query);
    }
    if (!autoSizeColumns) {
      params.api.sizeColumnsToFit();
    }
    if (!this.state.loading) {
      setTimeout(() => this.asyncLoading(true), 0);
    }
    const storageColumnKey = this.getStorageColumnKey();
    if (storageColumnKey) {
      const columnState = JSON.parse(localStorage.getItem(storageColumnKey));
      if (columnState) {
        params.columnApi.setColumnState(columnState);
      }
    }
  };

  onFilterChange = value => {
    this.setState({ inputValue: value, nextPageToken: null }, () => {
      if (this.props.fetchWithSearch) {
        this.asyncLoading(true);
      }
    });
    this.gridApi.setQuickFilter(value);
    const queryParams = queryString.parse(this.props.location.search);
    if (value.length > 0) {
      queryParams.q = value;
    } else {
      queryParams.q = undefined;
    }
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: queryString.stringify(queryParams),
    });
  };

  onBodyScroll = () => {
    if (!this.gridApi || this.state.loading || !this.state.nextPageToken)
      return;
    if (
      this.gridApi.getModel().rowsToDisplay.length - 1 ===
      this.gridApi.getLastDisplayedRow()
    ) {
      this.asyncLoading();
    }
  };

  setState(...args) {
    if (this.isGridMounted) super.setState(...args);
  }

  asyncLoading = firstPage => {
    const api = this.gridApi;
    if (firstPage) api.showLoadingOverlay();
    this.toggleLoading(true, () => {
      this.props.onLoadData(firstPage ? null : this.state.nextPageToken, {
        successCallback: this.successCallback,
        failCallback: this.failCallback,
        q:
          (this.props.fetchWithSearch &&
            this.state.inputValue !== '' &&
            this.state.inputValue) ||
          undefined,
      });
    });
  };

  extendColumnDefs = rows => {
    if (!hasData(rows)) return;

    const { columnDefs } = this.props;
    const defaultFields = columnDefs.map(column => column.field);
    const resultFields = Object.keys(rows[0]);
    const missedFields = difference(resultFields, defaultFields);
    if (hasData(missedFields)) {
      const extraFields = missedFields.map(field => ({
        headerName: capitalize(field),
        field,
      }));
      this.gridApi.setColumnDefs([...columnDefs, ...extraFields]);
      this.setState({
        columnsExtended: true,
        extraFields,
      });
    }
  };

  successCallback = (rows, nextPageToken) => {
    const api = this.gridApi;
    const result = api.applyTransaction({
      add: this.props.dataFormatter(this.filterNewRows(rows)),
    });
    this.setState({ nextPageToken }, () => {
      this.toggleLoading(false);
      this.updateRowsCount(this.state.nextPageToken);
      if (!this.props.autoSizeColumns) {
        setTimeout(() => api.sizeColumnsToFit(), 50);
      } else {
        setTimeout(() => this.props.autoSizeColumns(this.params), 50);
      }
    });
    const { extendColumnsFromResult } = this.props;
    const { columnsExtended } = this.state;
    if (extendColumnsFromResult && !columnsExtended) {
      this.extendColumnDefs(rows);
    }
    return result;
  };

  failCallback = () => {
    this.gridApi.hideOverlay();
    this.toggleLoading(false);
    this.setState({ nextPageToken: null }, () =>
      this.updateRowsCount(this.state.nextPageToken)
    );
  };

  toggleLoading = (visible, afterFunc = () => {}) => {
    this.setState({ loading: visible }, () => {
      const loadingStatusBarComponent = this.gridApi.getStatusPanel(
        'loadingStatusBarComponent'
      );
      if (loadingStatusBarComponent) {
        let componentInstance = loadingStatusBarComponent;
        if (loadingStatusBarComponent.getCellRendererInstances) {
          componentInstance =
            loadingStatusBarComponent.getCellRendererInstances();
        }
        componentInstance.setVisible(visible);
      }
      afterFunc();
    });
  };

  setWarning = msg => {
    const warningStatusBarComponent = this.gridApi.getStatusPanel(
      'warningStatusBarComponent'
    );
    if (warningStatusBarComponent) {
      let componentInstance = warningStatusBarComponent;
      if (warningStatusBarComponent.getCellRendererInstances) {
        componentInstance =
          warningStatusBarComponent.getCellRendererInstances();
      }
      componentInstance.setWarning(msg);
    }
  };

  updateRowsCount = () => {
    const rowsCountStatusBarComponent = this.gridApi.getStatusPanel(
      'rowsCountStatusBarComponent'
    );
    if (rowsCountStatusBarComponent) {
      let componentInstance = rowsCountStatusBarComponent;
      if (rowsCountStatusBarComponent.getCellRendererInstances) {
        componentInstance =
          rowsCountStatusBarComponent.getCellRendererInstances();
      }
      if (componentInstance.updateRowsCount)
        componentInstance.updateRowsCount(this.state.nextPageToken);
    }
  };

  filterNewRows = rows => {
    let filteredRows = rows;
    const { getRowId, differenceByTag } = this.props.gridOptions;
    const rowData = [];
    if ((this.props.fetchWithSearch && getRowId) || differenceByTag) {
      this.gridApi.forEachNode(node => rowData.push(node.data));
    }

    if (differenceByTag) {
      filteredRows =
        rowData.length > 0
          ? differenceBy(rows, rowData, differenceByTag)
          : filteredRows;
    }
    if (this.props.fetchWithSearch && getRowId) {
      if (rowData.length > 0) {
        filteredRows = filteredRows.filter(
          r =>
            !rowData.some(
              row => getRowId({ data: row }) === getRowId({ data: r })
            )
        );
      }
    }
    return filteredRows;
  };

  getStorageColumnKey = () => {
    const { saveColumnStateName } = this.props;
    return saveColumnStateName
      ? `asyncAGGridColumns_${saveColumnStateName}`
      : null;
  };

  onColumnMoved = params => {
    const storageColumnKey = this.getStorageColumnKey();
    if (storageColumnKey) {
      const columnState = JSON.stringify(params.columnApi.getColumnState());
      localStorage.setItem(storageColumnKey, columnState);
    }
  };

  render() {
    const { context, gridOptions, autoSizeColumns, ...props } = this.props;
    const { extraFields } = this.state;
    const newGridOptions = {
      ...this.props.gridOptions,
      context: { ...context, ...gridOptions.context },
      onGridReady: this.onGridReady,
      onViewportChanged: this.onBodyScroll,
      onColumnMoved: this.onColumnMoved,
      onModelUpdated: params =>
        autoSizeColumns
          ? autoSizeColumns(params)
          : params.api.sizeColumnsToFit(),
    };
    return (
      <AsyncAGGridStatelessComponent
        {...props}
        extraFields={extraFields}
        onFilterChange={this.onFilterChange}
        inputValue={this.state.inputValue}
        gridOptions={newGridOptions}
      />
    );
  }
}

AsyncAGGrid.propTypes = {
  columnDefs: PropTypes.arrayOf(PropTypes.object),
  context: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onGridReady: PropTypes.func,
  nextPageToken: PropTypes.string,
  dataFormatter: PropTypes.func,
  fetchWithSearch: PropTypes.bool,
  gridOptions: PropTypes.object,
  autoSizeColumns: PropTypes.func,
  extendColumnsFromResult: PropTypes.bool,
  saveColumnStateName: PropTypes.string,
  useQuickFilter: PropTypes.bool,
};

AsyncAGGrid.defaultProps = {
  columnDefs: undefined,
  context: {},
  nextPageToken: undefined,
  onGridReady() {},
  dataFormatter: rows => rows,
  fetchWithSearch: false,
  autoSizeColumns: () => {},
  gridOptions: {},
  extendColumnsFromResult: false,
  saveColumnStateName: undefined,
  useQuickFilter: true,
};

export default withRouter(AsyncAGGrid);
