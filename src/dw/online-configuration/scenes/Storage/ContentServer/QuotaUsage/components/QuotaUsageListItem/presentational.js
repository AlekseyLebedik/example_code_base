import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { Card } from 'antd';

const QuotaUsageListItemStateless = props => {
  const { userID, storageSpace, numFiles, onClick, selectedListItem } = props;
  const isSelectedClass =
    selectedListItem && selectedListItem.userID === userID ? 'selected' : '';

  return (
    <div className={`list-item quota-usage ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-col">
          <div className="main-content flex items-center">
            <Icon>perm_identity</Icon>
            {userID}
          </div>
          <div>Storage Space: {storageSpace}</div>
          <div>Files Number: {numFiles}</div>
        </div>
      </Card>
    </div>
  );
};

QuotaUsageListItemStateless.propTypes = {
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  storageSpace: PropTypes.number.isRequired,
  numFiles: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedListItem: PropTypes.object,
};
QuotaUsageListItemStateless.defaultProps = {
  selectedListItem: undefined,
};

export default QuotaUsageListItemStateless;
