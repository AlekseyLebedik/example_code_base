import React from 'react';
import { Col, Row } from 'antd';

export const IS_MAJOR_UPDATE_HELP = (
  <Row style={{ textAlign: 'left' }}>
    <Col span={24}>
      The Publisher Variables API does not have any logic to automatically
    </Col>
    <Col span={24}>
      determine whether the major or minor version was incremented.
    </Col>
    <Col span={24}>
      This parameter is included to the Push Message notification to the clients
    </Col>
    <Col span={24}>
      on Variable Set updates. It allows to define special behaviour in
    </Col>
    <Col span={24}>
      <i>onPushMessageHandler</i> for a <i>major</i> update e.g. redownload all
      configs, etc.
    </Col>
  </Row>
);

export const UPDATE_VARIABLES_SET_FORM_NAME = 'UpdateVariablesSet';
