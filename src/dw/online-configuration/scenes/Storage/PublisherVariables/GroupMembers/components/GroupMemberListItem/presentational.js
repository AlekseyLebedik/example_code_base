import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';

const GroupMemberListItemStateless = props => {
  const { groupID, onClick, selectedListItem } = props;
  const isSelectedClass =
    selectedListItem && selectedListItem === groupID ? 'selected' : '';

  return (
    <div className={`list-item group-member ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <Row>
          <Col span={24}>
            Group ID: <strong>{groupID}</strong>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

GroupMemberListItemStateless.propTypes = {
  groupID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedListItem: PropTypes.number,
};

GroupMemberListItemStateless.defaultProps = {
  selectedListItem: null,
};

export default GroupMemberListItemStateless;
