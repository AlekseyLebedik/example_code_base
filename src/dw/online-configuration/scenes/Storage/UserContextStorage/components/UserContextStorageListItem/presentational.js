import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Icon from '@material-ui/core/Icon';

import './presentational.css';

const UserContextStorageListItemStateless = props => {
  const {
    fileID,
    fileName,
    fileSize,
    userID,
    updateTime,
    onClick,
    selectedFile,
  } = props;
  const isSelectedClass =
    selectedFile && selectedFile.fileID === fileID ? 'selected' : '';

  return (
    <div className={`list-item user-context-storage ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-row">
          <div className="flex flex-col flex-grow">
            <div className="main-content">
              {fileID} <strong>{fileName}</strong>
            </div>
            <div className="flex items-center">
              <Icon>perm_identity</Icon>
              <div>{userID}</div>
            </div>
            <div>File Size: {fileSize}</div>
          </div>
          <div className="update-time">{updateTime}</div>
        </div>
      </Card>
    </div>
  );
};
UserContextStorageListItemStateless.propTypes = {
  fileID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  updateTime: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedFile: PropTypes.object,
};
UserContextStorageListItemStateless.defaultProps = {
  selectedFile: undefined,
};

export default UserContextStorageListItemStateless;
