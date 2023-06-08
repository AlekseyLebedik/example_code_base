import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';

import './presentational.css';

const StoreListItemStateless = props => {
  const { label, created, isActive, onClick, selectedStore } = props;
  const isSelectedClass =
    selectedStore && selectedStore.label === label ? 'selected' : '';

  return (
    <div className={`list-item store ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <Row>
          <Col span={12} className="store-label main-content">
            {label}
          </Col>
          <Col span={12} className="right">
            <div className={isActive ? `active-store` : ''}>
              {isActive ? '' : 'Not'} Active
            </div>
            <div>{created}</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

StoreListItemStateless.propTypes = {
  label: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedStore: PropTypes.object.isRequired,
};

export default StoreListItemStateless;
