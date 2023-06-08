import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Icon from '@material-ui/core/Icon';

import './presentational.css';

const UserFileListItemStateless = props => {
  const {
    fileID,
    fileName,
    fileSize,
    ownerID,
    updateTime,
    onClick,
    selectedUserFile,
  } = props;
  const isSelectedClass =
    selectedUserFile && selectedUserFile.fileID === fileID ? 'selected' : '';

  return (
    <div className={`list-item user-file ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex">
          <div className="flex flex-col flex-grow">
            <div className="main-content">
              {fileID} <strong>{fileName}</strong>
            </div>
            <div className="file-owner flex items-center">
              <Icon fontSize="small">perm_identity</Icon>
              {ownerID}
            </div>
            <div>File Size: {fileSize}</div>
          </div>
          <div className="update-time">{updateTime}</div>
        </div>
      </Card>
    </div>
  );
};

UserFileListItemStateless.propTypes = {
  fileID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  ownerID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  updateTime: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedUserFile: PropTypes.object,
};
UserFileListItemStateless.defaultProps = {
  selectedUserFile: undefined,
};

export default UserFileListItemStateless;
