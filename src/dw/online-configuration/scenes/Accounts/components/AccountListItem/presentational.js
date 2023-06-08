import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import './presentational.css';

const AccountListItemStateless = props => {
  const { userName, reputation, userID, onClick, selectedAccount } = props;
  const isSelectedClass =
    selectedAccount && selectedAccount.userID === userID ? 'selected' : '';

  return (
    <div className={`list-item account ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <div className="user-name main-content">{userName}</div>
            <div className="reputation">Reputation: {reputation}</div>
          </div>
          <div id="userId">{userID}</div>
        </div>
      </Card>
    </div>
  );
};

AccountListItemStateless.propTypes = {
  userName: PropTypes.string,
  reputation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  selectedAccount: PropTypes.object,
};

AccountListItemStateless.defaultProps = {
  userName: undefined,
  reputation: undefined,
  userID: undefined,
  onClick: undefined,
  selectedAccount: undefined,
};

export default AccountListItemStateless;
