import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Icon from '@material-ui/core/Icon';

const QuotaAllowanceListItemStateless = props => {
  const { userID, maxStorageSpace, onClick, selectedListItem } = props;
  const isSelectedClass =
    selectedListItem && selectedListItem.userID === userID ? 'selected' : '';

  return (
    <div className={`list-item quota-allowance ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-col">
          <div className="main-content flex items-center">
            <Icon>perm_identity</Icon>
            {userID}
          </div>
          <div>Max Storage Space: {maxStorageSpace}</div>
        </div>
      </Card>
    </div>
  );
};

QuotaAllowanceListItemStateless.propTypes = {
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  maxStorageSpace: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedListItem: PropTypes.object,
};
QuotaAllowanceListItemStateless.defaultProps = {
  selectedListItem: undefined,
};

export default QuotaAllowanceListItemStateless;
