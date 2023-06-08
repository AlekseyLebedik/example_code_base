import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import UploadButton from './components/UploadButton';
import localStyles from '../../index.module.css';
import { acceptStyle } from './constants';

const UploadFileStateless = props => {
  const { onDrop, uploadDisabled, customComponent } = props;
  return props.type === 'button' ? (
    <UploadButton {...props} />
  ) : (
    <Dropzone
      data-cy="fileInputDropzone"
      disableClick
      onDrop={onDrop}
      acceptStyle={acceptStyle}
      multiple={false}
      disabled={uploadDisabled}
      className={localStyles.agGridLayout}
    >
      {customComponent}
    </Dropzone>
  );
};

UploadFileStateless.propTypes = {
  type: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  uploadDisabled: PropTypes.bool.isRequired,
  customComponent: PropTypes.object,
};

UploadFileStateless.defaultProps = {
  customComponent: null,
};

export default UploadFileStateless;
