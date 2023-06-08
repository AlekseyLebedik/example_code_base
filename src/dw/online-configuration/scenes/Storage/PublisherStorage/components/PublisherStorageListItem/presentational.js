import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';

import './presentational.css';

const PublisherStorageListItemStateless = props => {
  const {
    fileName,
    fileSize,
    fileChecksum,
    updateTime,
    fileID,
    onClick,
    selectedFile,
    renderCheckbox,
  } = props;
  const isSelectedClass =
    selectedFile && selectedFile.fileID === fileID ? 'selected' : '';

  const columnWidth = !renderCheckbox ? 24 : 21;

  return (
    <div className={`list-item publisher-storage ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <Row type="flex" justify="space-around" align="middle">
          {renderCheckbox && <Col span={3}>{renderCheckbox({ fileID })}</Col>}
          <Col span={columnWidth} className={`${!renderCheckbox && 'ml-6'}`}>
            <Row>
              <Col span={16}>
                <span className="file-name main-content">{fileName}</span>
                <br />
                {fileSize} bytes
              </Col>
              <Col span={8} className="update-time">
                {updateTime}
              </Col>
            </Row>
            <Row>
              <Col span={24}>{fileChecksum}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
PublisherStorageListItemStateless.propTypes = {
  fileID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fileName: PropTypes.string.isRequired,
  fileChecksum: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  updateTime: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedFile: PropTypes.object,
  renderCheckbox: PropTypes.bool,
};
PublisherStorageListItemStateless.defaultProps = {
  selectedFile: undefined,
  renderCheckbox: false,
};

export default PublisherStorageListItemStateless;
