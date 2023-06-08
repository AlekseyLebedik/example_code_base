import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { Row, Col, Card } from 'antd';

import './presentational.css';

const ChallengeLogListItemStateless = props => {
  const {
    logId,
    userName,
    challengeId,
    responseStatus,
    monitoredGroup,
    timestamp,
    onClick,
    selectedChallengeLog,
  } = props;
  const isSelectedClass =
    selectedChallengeLog && selectedChallengeLog.logId === logId
      ? 'selected'
      : '';

  return (
    <div className={`list-item challenge-log ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <Row>
          <Col span={18} className="log-info">
            <Row>
              <Col span={24} className="log-name main-content">
                logID: <strong>{logId}</strong>
              </Col>
              <Col span={24} className="log-owner">
                <Icon>perm_identity</Icon>
                {`${userName} ${monitoredGroup}`}
              </Col>
              <Col span={24} className="log-size">
                ChallengeID: {challengeId}
              </Col>
            </Row>
          </Col>
          <Col span={6} className="update-time">
            {responseStatus}
            <br />
            {timestamp}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

ChallengeLogListItemStateless.propTypes = {
  logId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  challengeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  userName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  monitoredGroup: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  responseStatus: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  selectedChallengeLog: PropTypes.object,
};
ChallengeLogListItemStateless.defaultProps = {
  selectedChallengeLog: undefined,
};

export default ChallengeLogListItemStateless;
