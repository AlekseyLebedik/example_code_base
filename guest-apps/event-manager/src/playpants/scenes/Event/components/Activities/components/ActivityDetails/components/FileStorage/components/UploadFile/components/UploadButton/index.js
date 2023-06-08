import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'dw/core/components/IconButton';
import styles from './index.module.css';

const UploadButton = props => {
  const { uploadDisabled, onFileUploadButton } = props;
  const ref = React.createRef();

  return (
    <>
      <IconButton
        className={styles.uploadButton}
        htmlFor="upload"
        disabled={uploadDisabled}
        iconProps={{ style: { fontSize: 35 } }}
        icon="cloud_upload"
        tooltip="Upload File"
        color="primary"
        onClick={() => {
          ref.current.click();
        }}
      />
      <input
        data-cy="fileInput"
        className={styles.uploadButtonDisplay}
        type="file"
        multiple={false}
        ref={ref}
        onChange={onFileUploadButton}
        onClick={e => {
          e.target.value = null;
        }}
      />
    </>
  );
};

UploadButton.propTypes = {
  uploadDisabled: PropTypes.bool.isRequired,
  onFileUploadButton: PropTypes.func.isRequired,
};

export default UploadButton;
