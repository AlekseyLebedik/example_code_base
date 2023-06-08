import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Icon from '@material-ui/core/Icon';

import './presentational.css';

const PooledFileListItemStateless = props => {
  const {
    fileID,
    fileName,
    fileSize,
    uploadedBy,
    updateTime,
    onClick,
    selectedPooledFile,
  } = props;
  const isSelectedClass =
    selectedPooledFile && Number(selectedPooledFile.fileID) === fileID
      ? 'selected'
      : '';

  return (
    <div className={`list-item pooled-file ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex">
          <div className="flex flex-col flex-grow">
            <div className="main-content">
              {fileID} <strong className="word-break">{fileName}</strong>
            </div>
            <div className="flex items-center">
              <Icon>perm_identity</Icon>
              {uploadedBy}
            </div>
            <div>File Size: {fileSize}</div>
          </div>
          <div className="update-time">{updateTime}</div>
        </div>
      </Card>
    </div>
  );
};

PooledFileListItemStateless.propTypes = {
  fileID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  uploadedBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  updateTime: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedPooledFile: PropTypes.object,
};
PooledFileListItemStateless.defaultProps = {
  selectedPooledFile: undefined,
};

export default PooledFileListItemStateless;
