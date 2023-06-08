import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import queryString from 'query-string';
import { getReactBaseURL } from 'dw/online-configuration/selectors';
import { connect } from 'dw/core/helpers/component';

import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { uuid } from 'dw/core/helpers/uuid';

import { canDownloadFileGroupSize } from './helpers';
import {
  fetchPublisherObjects,
  fetchPublisherCategories,
  fetchPublisherGroups,
  addCategory,
  promotePublisherObject,
  deletePublisherObjects,
  downloadPublisherObject,
  downloadMultiPublisherObjects,
  uploadPublisherObject,
  propagatePublisherObjects,
} from './actions';
import {
  publisherObjectsSelector,
  mergedDataSelector,
  publisherCategoriesSelector,
  currentSizeSelector,
  publisherNextPageTokenSelector,
  publisherGroupSelector,
  publisherObjectsLoadingSelector,
  dataFormatterSelector,
} from './selectors';
import PublisherObjectsStateless from './publisherObjects';

class PublisherObjects extends Component {
  static propTypes = {
    category: PropTypes.string,
    fetchCategories: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    onDeleteObjects: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onMultiDownloadAsZip: PropTypes.func.isRequired,
    onPropagatePublisherObjects: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
    promotePubGroups: PropTypes.func.isRequired,
    publisherObjects: PropTypes.arrayOf(PropTypes.object),
    selectedRowKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    publisherObjects: [],
    category: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      refreshKey: null,
    };
  }

  componentDidMount() {
    const { fetchCategories, fetchGroups } = this.props;

    const { name } = queryString.parse(this.props.history.location.search);
    this.onChangeFileName(name);
    fetchCategories();
    fetchGroups();
  }

  onSelectionChanged = () => this.forceUpdate();

  onChangeFileName = fileName => {
    this.setState({ fileName });
  };

  onSearchFileName = fileName => {
    this.onChangeFileName(fileName);
    const { match, history } = this.props;
    const path = generatePath(match.path, {
      ...match.params,
      category: undefined,
    });
    if (fileName) {
      history.push(`${path}?name=${fileName}`);
    } else {
      history.push(path);
    }
  };

  onDeleteSelectedObjects = () => {
    const selectedRowKeys = this.gridApi.getSelectedRows().map(obj => ({
      name: obj.name,
      objectID: obj.objectID,
      groupID: obj.groupID,
    }));
    this.props.onDeleteObjects(selectedRowKeys, null, {
      successCallback: this.refreshTable,
    });
    this.gridApi.deselectAll();
  };

  onGridReady = params => {
    this.gridApi = params.api;
    const filterModel = JSON.parse(
      localStorage.getItem('PublisherObjectsFilterModel')
    );
    if (filterModel) {
      this.gridApi.setFilterModel(filterModel);
    }
  };

  onFilterChanged = () => {
    localStorage.setItem(
      'PublisherObjectsFilterModel',
      JSON.stringify(this.gridApi.getFilterModel())
    );
  };

  onFilterTextBoxChange = value => {
    this.gridApi.setQuickFilter(value);
  };

  onCleanCategory = () => {
    this.onChangeFileName();

    const { match, history } = this.props;
    const path = generatePath(match.path, {
      ...match.params,
      category: undefined,
    });
    history.push(path);
  };

  onPropagateObjects = values =>
    new Promise((resolve, reject) =>
      this.props.onPropagatePublisherObjects(values, resolve, reject)
    );

  deselectAll = () => this.gridApi.deselectAll();

  uploadFile = (values, allObjectsCheck, displayProgress) => {
    this.props.onUploadFile(values, allObjectsCheck, displayProgress, {
      successCallback: this.refreshTable,
    });
  };

  promotePubGroups = (groupID, name, allObjectsCheck) => {
    this.props.promotePubGroups(groupID, name, allObjectsCheck, {
      successCallback: this.refreshTable,
    });
  };

  refreshTable = () => this.setState({ refreshKey: uuid() });

  onMultiObjectDownload = () => {
    const selectedRows = this.selectedRows();
    if (selectedRows.length < 3) {
      selectedRows.forEach(({ groupID, name }) =>
        this.props.onDownload(name, groupID)
      );
    } else {
      const fileNames = selectedRows.map(f => f.name).join(',');
      const canDownload = canDownloadFileGroupSize(selectedRows);
      this.props.onMultiDownloadAsZip(
        { file_names: fileNames, download: true },
        canDownload
      );
    }
  };

  publishersObjectsCount() {
    return this.props.publisherObjects && this.props.publisherObjects.length;
  }

  selectedRows() {
    if (this.gridApi) {
      return this.gridApi.getSelectedRows();
    }
    return [];
  }

  render() {
    return (
      <PublisherObjectsStateless
        {...this.props}
        onSelect={this.onSelectionChanged}
        onCleanCategory={this.onCleanCategory}
        onGridReady={this.onGridReady}
        onFilterChanged={this.onFilterChanged}
        onCategoryChange={this.onCategoryChange}
        onFilterTextBoxChange={this.onFilterTextBoxChange}
        onChangeFileName={this.onChangeFileName}
        onSearchFileName={this.onSearchFileName}
        fileName={this.state.fileName}
        selectedRows={this.selectedRows()}
        onDeselectAll={this.onDeselectAll}
        publishersObjectsCount={this.publishersObjectsCount()}
        onDeleteSelectedObjects={this.onDeleteSelectedObjects}
        onPropagateObjects={this.onPropagateObjects}
        onPropagateSubmitSuccess={this.deselectAll}
        refreshKey={this.state.refreshKey}
        refreshTable={this.refreshTable}
        onUploadFile={this.uploadFile}
        promotePubGroups={this.promotePubGroups}
        onMultiObjectDownload={this.onMultiObjectDownload}
      />
    );
  }
}

const stateToProps = (state, props) => {
  const { category } = props.match.params;
  return {
    category,
    publisherObjects: publisherObjectsSelector(state),
    publisherObjectUrl: getReactBaseURL(state),
    mergedData: mergedDataSelector(state),
    dataFormatter: dataFormatterSelector(state),
    categories: publisherCategoriesSelector(state),
    groups: publisherGroupSelector(state),
    nextPageToken: publisherNextPageTokenSelector(state),
    currentSize: currentSizeSelector(state),
    selectedRowKeys: selectedRowKeysSelector(state),
    formatDateTime: formatDateTimeSelector(state),
    loading: publisherObjectsLoadingSelector(state),
  };
};

const dispatchToProps = {
  onLoad: fetchPublisherObjects,
  onAddCategory: addCategory,
  promotePubGroups: promotePublisherObject,
  onDownload: downloadPublisherObject,
  onMultiDownloadAsZip: downloadMultiPublisherObjects,
  onDeleteObjects: deletePublisherObjects,
  fetchCategories: fetchPublisherCategories,
  fetchGroups: fetchPublisherGroups,
  onUploadFile: uploadPublisherObject,
  onPropagatePublisherObjects: propagatePublisherObjects,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  onDownload: (name, groupID, contentURL, acl) =>
    dispatchProps.onDownload(name, groupID, contentURL, acl),
  onLoadData: (nextPageToken, params) =>
    dispatchProps.onLoad({ ...params, nextPageToken }),
});

export default connect(
  stateToProps,
  dispatchToProps,
  PublisherObjects,
  mergeProps
);
