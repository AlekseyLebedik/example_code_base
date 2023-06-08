import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';

import { ENVIRONMENT_SHORTTYPES } from 'playpants/scenes/Event/components/Activities/constants';
import { useDidUpdateEffect } from 'playpants/hooks';

import FileStorageStateless from './presentational';
import * as actions from './actions';
import { filesSelector } from './selectors';
import { columnDefs as initColumns } from './constants';

export const FileStorage = props => {
  // STATE
  const [gridApi, setGridApi] = useState(null);
  const [newestFileDetails, setNewestFileDetails] = useState({});
  const [inProgress, setInProgress] = useState(false);
  const [newContexts, setNewContexts] = useState(false);

  // Update the selected activity attributes with new file info
  const onActivityUpdate = () => {
    const { selectedActivity, files, onUpdate } = props;
    onUpdate({
      ...selectedActivity,
      activity: {
        files: Object.keys(files).map(fileId => parseInt(fileId, 10)),
      },
    });
  };

  // Remove a file
  const onRemoveFile = e => {
    const id = Object.keys(props.files)[e.data.index];
    const callback = () => {
      // eslint-disable-next-line no-param-reassign
      delete props.files[id];
      onActivityUpdate();
    };
    props.removeFile(id, callback);
  };

  // save information about edited cell in table
  const onSaveCell = e => {
    const ids = Object.keys(props.files);
    const tempFile = props.files[ids[e.data.index]];

    tempFile[e.colDef.field] = e.newValue;
    props.updateFile(tempFile, tempFile.id);
    onActivityUpdate();
  };

  // download a file
  const onDownloadFile = e => {
    const rowNode = gridApi.getRowNode(e.data.index);
    if (rowNode.data.download === true) return;
    const id = Object.keys(props.files)[e.data.index];
    rowNode.setDataValue('download', true);
    const callback = () => rowNode.setDataValue('download', false);
    props.downloadFile(id, props.files[id].remoteFilename, callback);
  };

  // sets the columns defs for ag-grid
  const createColumnDefs = isInProgress => {
    const functionRefs = {
      onSaveCell,
    };

    return props.agGridProps
      .columnDefs(functionRefs)
      .concat(
        initColumns(onRemoveFile, onDownloadFile, props.disabled, isInProgress)
      );
  };

  // Column Definitions array
  const columnDefs = createColumnDefs(false);

  // resize columns in grid
  const resizeGrid = () => gridApi.sizeColumnsToFit();

  // load file details based on all files IDs for given selected activity
  const loadFiles = () => {
    const { fileDetailsFetch, selectedActivity, selectedTitle } = props;
    fileDetailsFetch(selectedActivity);
    if (selectedTitle)
      props.fetchContexts(
        selectedTitle.id,
        ENVIRONMENT_SHORTTYPES[props.eventData.env_type]
      );
  };

  // re-create the columns definitions
  const newCols = () => {
    gridApi.setColumnDefs(createColumnDefs(inProgress));
    resizeGrid();
  };

  const onGridReady = ({ api }) => {
    setGridApi(api);
    api.sizeColumnsToFit();
  };

  const getCollection = () => {
    const { files, selectedActivity } = props;

    // Add newest file to a copy of ID map
    const filesIdMap = isEmpty(newestFileDetails)
      ? { ...files }
      : { ...files, '-1': newestFileDetails };

    // Add each file ID to the file info
    Object.entries(filesIdMap).forEach(([key, val]) => {
      // eslint-disable-next-line no-param-reassign
      val.id = Number(key);
    });

    // Remove potential duplicate file
    const newFiles = uniqBy(Object.values(filesIdMap), file =>
      file.hasOwnProperty('X-Progress-ID') ? file['X-Progress-ID'] : file.id
    );

    const collection =
      selectedActivity.activity.files.length === 0 && isEmpty(newestFileDetails)
        ? []
        : newFiles.map((fileInfo, idx) => {
            const columnsObject = {};
            columnDefs.forEach(col => {
              if (
                fileInfo.id === -1 ||
                selectedActivity.activity.files.includes(fileInfo.id)
              )
                columnsObject[col.field] =
                  col.field === 'index' ? idx : fileInfo[col.field];
            });
            return columnsObject;
          });

    return collection;
  };

  const updateProgress = (progress, update) => {
    if (gridApi) {
      const newestIndex = props.selectedActivity.activity.files.length;
      const getRowNode = (i = newestIndex) => gridApi.getRowNode(i);
      // set current file progress on the table row
      if (update) {
        const row = getRowNode();
        row.setData({ ...row.data, download: true });
        row.setData({ ...row.data, progress });
      } else {
        // file finished uploading, set progress to 100% and enable download
        const newRow = getRowNode(newestIndex - 1);
        if (newRow !== undefined) {
          newRow.setDataValue('download', false);
          newRow.setDataValue('progress', 100);
        }
      }
    }
  };

  const failedProgress = () => updateProgress(-1, true);

  // EFFECTS

  // check if a new activity was selected
  useEffect(() => {
    loadFiles();
  }, []);

  // 'inProgress' changed.
  // check if file upload is in progress or disabled
  useDidUpdateEffect(() => {
    if (gridApi !== null) newCols();
    if (!inProgress) {
      onActivityUpdate();
      setNewestFileDetails({});
    }
  }, [inProgress]);

  // 'titles' changed.
  // check if user selected a title for this activity
  useDidUpdateEffect(() => {
    const { eventData, fetchContexts, selectedTitle } = props;
    if (selectedTitle)
      fetchContexts(
        selectedTitle.id,
        ENVIRONMENT_SHORTTYPES[eventData.env_type]
      );
    if (gridApi) gridApi.showNoRowsOverlay();
  }, [props.selectedActivity.title_envs[0]]);

  // 'gridApi' changed, on component mount.
  // when new contexts come in, set them, but only after grid is ready
  useEffect(() => {
    if (newContexts) {
      newCols();
      setNewContexts(false);
    }
  }, [gridApi]);

  // 'gridApi' changed, on component update
  // adds window resize event listener when grid is ready, and sets removal function
  useDidUpdateEffect(() => {
    window.addEventListener('resize', resizeGrid);
    return () => window.removeEventListener('resize', resizeGrid);
  }, [gridApi]);

  // 'contexts' changed
  // Contexts have changed because new activity has been selected
  useDidUpdateEffect(() => setNewContexts(true), [props.contextsData]);

  const newProps = {
    ...props,
    columnDefs,
    failedProgress,
    getCollection,
    inProgress,
    onGridReady,
    resizeGrid,
    setInProgress,
    setNewestFileDetails,
    updateProgress,
    uploadDisabled:
      props.disabled ||
      props.selectedActivity.title_envs.length === 0 ||
      inProgress,
  };

  return <FileStorageStateless {...newProps} />;
};

FileStorage.propTypes = {
  eventId: PropTypes.number.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  downloadFile: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  fileDetailsFetch: PropTypes.func.isRequired,
  files: PropTypes.object.isRequired,
  agGridProps: PropTypes.object.isRequired,
  fetchContexts: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  contextsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTitle: PropTypes.object,
};

FileStorage.defaultProps = {
  selectedTitle: undefined,
};

const mapStateToProps = state => ({
  files: filesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContexts: bindActionCreators(actions.fetchFileStorageContexts, dispatch),
  uploadFileAction: bindActionCreators(actions.uploadFileAction, dispatch),
  uploadProgressFetch: bindActionCreators(
    actions.uploadProgressFetch,
    dispatch
  ),
  downloadFile: bindActionCreators(actions.downloadFile, dispatch),
  removeFile: bindActionCreators(actions.removeFile, dispatch),
  updateFile: bindActionCreators(actions.updateFile, dispatch),
  fileDetailsFetch: bindActionCreators(actions.fileDetailsFetch, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileStorage);
