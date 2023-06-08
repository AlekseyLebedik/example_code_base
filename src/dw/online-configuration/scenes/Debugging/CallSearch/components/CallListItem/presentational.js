import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import './presentational.css';

const CallListItemStateless = props => {
  const {
    serviceName,
    startTime,
    errorName,
    username,
    transactionId,
    onClick,
    selectedCall,
  } = props;
  const isSelectedClass =
    selectedCall && selectedCall.transactionId === transactionId
      ? 'selected'
      : '';

  return (
    <div className={`list-item call ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <Row>
          <Col span={18} className="left">
            <div className="service-name main-content">{serviceName}</div>
            <div className="error-name">{errorName}</div>
            <div className="user-name">{username}</div>
            <div className="transaction-id">{transactionId}</div>
          </Col>
          <Col span={6} className="start-time">
            {startTime}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

CallListItemStateless.propTypes = {
  serviceName: PropTypes.string,
  startTime: PropTypes.string,
  errorName: PropTypes.string,
  transactionId: PropTypes.string,
  username: PropTypes.string,
  onClick: PropTypes.func,
  selectedCall: PropTypes.object,
};
CallListItemStateless.defaultProps = {
  serviceName: undefined,
  startTime: undefined,
  errorName: undefined,
  transactionId: undefined,
  username: undefined,
  onClick: () => {},
  selectedCall: {},
};

export default CallListItemStateless;
