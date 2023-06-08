import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import KeyValue from 'dw/core/components/KeyValue';

import SectionTitle from 'dw/core/components/SectionTitle';
import './index.css';

const CallDetails = props => {
  if (!props.selectedCall) return null;

  const { selectedCall, onClickViewLogs } = props;

  const Maincomponent = () => (
    <div className="details__container call">
      <SectionTitle extraContent={<div className="section-title" />} />
      <Row className="body">
        <Col span={24}>
          <KeyValue item={selectedCall} size={5} />
          <Row>
            <Col span={10} className="label">
              View Logs
            </Col>
            <Col span={14} className="value">
              <a
                className="view-logs"
                onClick={() => onClickViewLogs(selectedCall.transactionId)}
              >
                View Logs &gt;&gt;
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

  const emptyComponent = (
    <div className="call-details__empty-container">
      Select a call to see more details
    </div>
  );

  return !selectedCall ? emptyComponent : Maincomponent();
};

CallDetails.propTypes = {
  selectedCall: PropTypes.shape({
    errorCode: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
    errorName: PropTypes.string,
    lsgError: PropTypes.object,
    serviceName: PropTypes.string,
    startTime: PropTypes.string,
    transactionId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default CallDetails;
