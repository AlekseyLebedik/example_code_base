import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import { formatDateTimeSelector } from 'playpants/helpers/dateTime';
import { prettyPrint } from 'playpants/helpers/json';
import { ENVIRONMENT_SHORTTYPES } from 'playpants/scenes/Event/components/Activities/constants';
import { formatPubObjectFormData } from './helpers';

import * as selectors from './selectors';
import * as actions from './actions';

import PublisherObjectsStateless from './presentational';

// consistently auto sizes columns to maintain an even layout
const useAutoSizeGrid = gridColumnApi => {
  const autoSizeAll = () => {
    const columnIds =
      gridColumnApi?.getAllColumns()?.map(({ colId }) => colId) || [];
    gridColumnApi.autoSizeColumns(columnIds);
  };

  useEffect(() => {
    if (gridColumnApi) autoSizeAll();
  }, [gridColumnApi]);
};

const PublisherObjects = ({
  clearState,
  fileObjects,
  deleteObject,
  downloadObject,
  eventData,
  fetchCategories,
  fetchGroups,
  selectedTitle: { id: selectedTitleId },
  uploadObject,
  ...props
}) => {
  const envType = ENVIRONMENT_SHORTTYPES[eventData.env_type];
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridColumnApi, setColumnApi] = useState();
  const [refreshKey, setRefreshKey] = useState();
  useAutoSizeGrid(gridColumnApi);
  const {
    contextList,
    defaultContextOptions,
    eventId,
    isServiceConfigured,
    onUpdate,
    selectedActivity,
    showContext,
  } = props;
  const {
    id: activityId,
    activity: { files },
  } = selectedActivity;

  useEffect(() => {
    setRefreshKey(fileObjects.length);
  }, [fileObjects]);

  // fetch group and category data from Object Store if a title is selected
  useEffect(() => {
    if (showContext) {
      if (!isEmpty(contextList)) {
        if (selectedActivity.context) {
          const selectedContext = contextList.find(
            context => selectedActivity.context === context.id
          );
          if (selectedContext) {
            const params = { context: selectedContext.name };
            fetchCategories(selectedTitleId, envType, params);
            fetchGroups(selectedTitleId, envType, params);
          }
        } else if (
          selectedTitleId &&
          !contextList.find(context => context.userSelectable)
        ) {
          const { title, any, other } = defaultContextOptions;
          const defaultContext = title || any || other;
          onUpdate({ ...selectedActivity, context: defaultContext.id });
        }
      }
    } else if (selectedTitleId) {
      fetchCategories(selectedTitleId, envType, {});
      fetchGroups(selectedTitleId, envType, {});
    }

    return () => clearState();
  }, [selectedTitleId, selectedActivity.context, contextList]);

  // set selectedRows from state to objects returned from grid api onSelect
  const onSelect = ({ api }) => setSelectedRows(api.getSelectedRows());

  // deletes each selected file individually from File Storage
  const deleteFilesFromStorage = () =>
    selectedRows.map(obj => {
      const index = findIndex(fileObjects, o => o.name === obj.name);
      const fileId = files[index];
      deleteObject(fileId);
      return index;
    });

  const filterRemovedIndexes = (arr, removedIndexes) =>
    arr.filter((_, i) => !removedIndexes.includes(i));

  // return selectedActivity with removed indexes filtered from activity
  const removeFilesFromActivity = removedIndexes => ({
    ...selectedActivity,
    activity: {
      files: filterRemovedIndexes(files, removedIndexes),
      objects: filterRemovedIndexes(fileObjects, removedIndexes).map(object =>
        prettyPrint(object)
      ),
    },
  });

  // gets indexes of deleted files and then updates activity with files removed
  const deleteSelected = () => {
    const removedIndexes = deleteFilesFromStorage();
    const newActivity = removeFilesFromActivity(removedIndexes);
    onUpdate(newActivity);
  };

  // sets columnApi to local state and adds filterModel if in localStorage
  const onGridReady = ({ api, columnApi }) => {
    setColumnApi(columnApi);
    const filterModel = JSON.parse(
      localStorage.getItem('PublisherObjectsFilterModel')
    );
    if (filterModel) {
      api.setFilterModel(filterModel);
    }
  };

  // gets fileId from name / group returned to download from File Storage
  const onDownload = (fileName, group) => {
    const index = fileObjects.findIndex(
      obj => obj.name === fileName && obj.groupID === group
    );
    const fileId = files[index];
    downloadObject(fileId, fileName);
  };

  // gets formatted formData from helper function to send to File Storage
  const onUpload = data => {
    const formData = formatPubObjectFormData(data, activityId);
    uploadObject(eventId, selectedActivity, formData);
  };

  return (
    <PublisherObjectsStateless
      {...props}
      deleteSelected={deleteSelected}
      envType={envType}
      isServiceConfigured={isServiceConfigured}
      onDownload={onDownload}
      onGridReady={onGridReady}
      onLoadData={(_, params) => {
        params.successCallback(fileObjects);
      }}
      onSelect={onSelect}
      onUpload={onUpload}
      refreshKey={refreshKey}
      selectedRows={selectedRows}
      selectedTitleId={selectedTitleId}
    />
  );
};

PublisherObjects.propTypes = {
  clearState: PropTypes.func.isRequired,
  contextList: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultContextOptions: PropTypes.object.isRequired,
  deleteObject: PropTypes.func.isRequired,
  downloadObject: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  isServiceConfigured: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  selectedTitle: PropTypes.object,
  showContext: PropTypes.bool.isRequired,
  uploadObject: PropTypes.func.isRequired,
};
PublisherObjects.defaultProps = {
  selectedTitle: {},
};

const makeMapStateToProps = () => {
  const fileObjectsSelector = selectors.makePublisherObjectsSelector();
  const mapStateToProps = (state, props) => ({
    categories: selectors.publisherCategoriesSelector(state),
    dataFormatter: selectors.dataFormatterSelector(state),
    fileObjects: fileObjectsSelector(state, props),
    formatDateTime: formatDateTimeSelector(state),
    groups: selectors.publisherGroupSelector(state),
    loading: selectors.publisherObjectsLoadingSelector(state),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  clearState: bindActionCreators(actions.clearState, dispatch),
  deleteObject: bindActionCreators(actions.deleteObject, dispatch),
  downloadObject: bindActionCreators(actions.downloadObject, dispatch),
  fetchCategories: bindActionCreators(actions.fetchCategories, dispatch),
  fetchGroups: bindActionCreators(actions.fetchGroups, dispatch),
  uploadObject: bindActionCreators(actions.uploadObject, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PublisherObjects);
