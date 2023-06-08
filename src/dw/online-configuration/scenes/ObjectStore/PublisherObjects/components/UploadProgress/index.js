import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormError from 'dw/core/components/FormFields/FormError';

import { formatFileSize } from 'dw/core/helpers/formatters';
import { uploadingFilesSelector } from '../../selectors';
import { stopUploadProgress, reUploadObject } from '../../actions';

import styles from './index.module.css';

const UploadItem = ({
  closeFileUpload,
  file: { cancelSource, error, fileName, formData, progress, size },
  reUploadPublisherObject,
  successCallback,
}) => {
  const [overwriteChecked, setOverwriteChecked] = useState(false);
  const handleCloseDialog = () => closeFileUpload({}, fileName);
  return (
    <div className={styles.wrapperItem}>
      <div className={styles.progressGrid}>
        <div className={styles.progressBar}>
          <div style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.percentage}>{progress}%</span>
        {progress < 100 && (
          <Tooltip title="Cancel file upload">
            <IconButton
              className={styles.cancelButton}
              onClick={() => {
                cancelSource.cancel('File upload canceled by the user.');
                handleCloseDialog();
              }}
            >
              <Icon>highlight_off</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>

      <label className={styles.progressLabel}>
        {fileName} <em>({formatFileSize(size)})</em>
      </label>
      {error && (
        <>
          <FormError
            prefix="Failed to upload File: "
            meta={{ error: error && Object.values(error)[0] }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={overwriteChecked}
                disableRipple
                onChange={() => setOverwriteChecked(!overwriteChecked)}
              />
            }
            label="Confirm object overwrite"
          />
          <DialogActions classes={{ root: styles.dialogActions }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              color="primary"
              disabled={!overwriteChecked}
              onClick={() => {
                handleCloseDialog();
                const allObjects = true;
                const displayProgress = true;
                formData.set('confirmed', true);
                reUploadPublisherObject(
                  formData,
                  allObjects,
                  displayProgress,
                  successCallback
                );
              }}
            >
              Overwrite
            </Button>
          </DialogActions>
        </>
      )}
    </div>
  );
};

UploadItem.propTypes = {
  closeFileUpload: PropTypes.func.isRequired,
  file: PropTypes.shape({
    cancelSource: PropTypes.object.isRequired,
    fileName: PropTypes.string.isRequired,
    formData: PropTypes.object.isRequired,
    progress: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    error: PropTypes.object,
  }).isRequired,
  reUploadPublisherObject: PropTypes.func.isRequired,
  successCallback: PropTypes.func.isRequired,
};

const UploadProgress = ({
  closeFileUpload,
  reUploadPublisherObject,
  successCallback,
  uploadingFiles,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const uploadedFileAmount = uploadingFiles.length;

  return (
    uploadedFileAmount > 0 && (
      <div
        className={classnames(styles.dialog, {
          [styles.dialogCollapsed]: collapsed,
        })}
      >
        <Typography variant="h6" className={classnames(styles.uploadHeading)}>
          Uploading {uploadedFileAmount} File{uploadedFileAmount > 1 ? 's' : ''}
        </Typography>

        <IconButton
          className={styles.collapseButton}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon>{collapsed ? 'expand_less' : 'expand_more'}</Icon>
        </IconButton>
        <div
          className={classnames(styles.filesWrapper, {
            [styles.collapsed]: collapsed,
          })}
        >
          {uploadingFiles.map(file => (
            <UploadItem
              closeFileUpload={closeFileUpload}
              file={file}
              key={file.fileName}
              reUploadPublisherObject={reUploadPublisherObject}
              successCallback={successCallback}
            />
          ))}
        </div>
      </div>
    )
  );
};

UploadProgress.propTypes = {
  closeFileUpload: PropTypes.func.isRequired,
  reUploadPublisherObject: PropTypes.func.isRequired,
  uploadingFiles: PropTypes.arrayOf(
    PropTypes.shape({
      error: PropTypes.object,
      fileName: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
    })
  ).isRequired,
  successCallback: PropTypes.func,
};

UploadProgress.defaultProps = {
  successCallback: () => {},
};

const stateToProps = state => ({
  uploadingFiles: uploadingFilesSelector(state),
});

const dispatchToProps = dispatch => ({
  closeFileUpload: bindActionCreators(stopUploadProgress, dispatch),
  reUploadPublisherObject: bindActionCreators(reUploadObject, dispatch),
});

export default connect(stateToProps, dispatchToProps)(UploadProgress);
