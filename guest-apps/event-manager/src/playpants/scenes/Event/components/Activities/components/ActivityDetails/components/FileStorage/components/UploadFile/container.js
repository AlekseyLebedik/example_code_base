import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import { getNowTimestamp } from 'playpants/helpers/dateTime';
import { formatFileSize } from 'dw/core/helpers/formatters';
import UploadFileStateless from './presentational';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

const UploadFile = props => {
  const {
    selectedActivity,
    contextsData,
    uploadFileAction,
    uploadProgress,
    uploadProgressFetch,
    setInProgress,
    setNewestFileDetails,
    updateProgress,
    failedProgress,
    inProgress,
  } = props;

  const [xProgressID, setXProgressID] = useState(0);

  // Initial Vars used for updating file progress
  let lock = false;
  let runAgain = true;
  let previousTimeout = 1000;

  // UPLOAD PROGRESS/TIMER
  // Called each time we want to get new upload progress
  // used by `upload` function. shouldn't need to be used directly
  const progressTimer = progressID => {
    // callback when current upload progress call finishes
    const callback = response => {
      if (response === 'success') {
        previousTimeout = 1000;
      } else if (runAgain) {
        previousTimeout *= 2;
        setTimeout(progressTimer, previousTimeout, progressID);
      }
    };

    if (!lock) {
      previousTimeout = 1000;
      uploadProgressFetch(progressID, callback);
    }
  };

  // Upload Progress API call, then call progressTimer again if needed
  useEffect(() => {
    if (
      uploadProgress.hasOwnProperty(xProgressID) &&
      uploadProgress[xProgressID] !== '' &&
      inProgress
    ) {
      let val = 0;
      const progressObject = uploadProgress[xProgressID];
      if (!isEmpty(progressObject)) {
        const { received, size } = progressObject;
        val = (received / size) * 100;
        if (val < 100) {
          updateProgress(val, true);
          // potentially call upload progress again
          if (!lock) setTimeout(progressTimer, 1000, xProgressID);
        }
      }
    }
  }, [uploadProgress]);

  let callback;
  /*  -- @params 
      file: required parameter. the single file you want to upload (for multi-file, 
        iterate through an array of files yourself, calling this function each time)

      -- @return
      returns the metadata of the file that was just uploaded

      -- Look at PublisherStorage for example. It is recommended to use it similarly, such as disabling/enabling upload,
      logic for before progress starts and after progress ends, and logic for updating activity (appending new file IDs
      to the activity). The below function only uploads the file, and executes an optional function on every non-100% progress update.
      
      -- Functions downloadFile, removeFile, updateFile, and fileDetailsFetch go along very closely with this uploadFiles function.
      You can call those actions directly as necessary, they are passed down as props.
  */
  const uploadFile = file => {
    const progressID = getNowTimestamp();
    const fileDetails = {
      title: '',
      filename: file.name,
      remoteFilename: file.name,
      context: contextsData[0],
      comment: '',
      size: formatFileSize(file.size),
      progress: 0,
      download: false,
      'X-Progress-ID': progressID,
    };

    uploadFileAction(selectedActivity, fileDetails, file, callback);
    setXProgressID(progressID);
    progressTimer(progressID);
    return fileDetails;
  };

  // User uploads a file
  const onDrop = acceptedFiles => {
    if (acceptedFiles.length > 0) {
      acceptedFiles.forEach(file => {
        // set state to in-progress and re-render the  columns
        setInProgress(true);

        // callback when file upload finishes
        callback = response => {
          if (response === 'success') {
            // finish file upload, set inProgress to false and update the progress to 100%
            setInProgress(false);
            updateProgress(null, false);
          } else if (!lock) failedProgress();
          runAgain = false;
          lock = true;
        };
        // upload the file, with progress
        const fileDetails = uploadFile(file);
        setNewestFileDetails(fileDetails);
      });
    }
  };

  const onFileUploadButton = e => onDrop([...e.target.files]);

  const newProps = {
    ...props,
    onDrop,
    onFileUploadButton,
  };
  return <UploadFileStateless {...newProps} />;
};

UploadFile.propTypes = {
  selectedActivity: PropTypes.object.isRequired,
  contextsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  uploadFileAction: PropTypes.func.isRequired,
  uploadProgressFetch: PropTypes.func.isRequired,
  uploadProgress: PropTypes.object.isRequired,
  setInProgress: PropTypes.func.isRequired,
  setNewestFileDetails: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired,
  failedProgress: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  uploadProgress: selectors.uploadProgressSelector(state),
});

const mapDispatchToProps = dispatch => ({
  uploadFileAction: bindActionCreators(actions.uploadFileAction, dispatch),
  uploadProgressFetch: bindActionCreators(
    actions.uploadProgressFetch,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
