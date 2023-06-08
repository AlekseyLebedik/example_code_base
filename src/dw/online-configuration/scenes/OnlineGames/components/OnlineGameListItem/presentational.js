import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import './presentational.css';

const OnlineGameListItemStateless = props => {
  const {
    userID,
    updateTime,
    sessionID,
    securityID,
    onClick,
    selectedOnlineGame,
  } = props;
  const username = props.username || props.userName;
  const isSelectedClass =
    selectedOnlineGame &&
    selectedOnlineGame.sessionID === sessionID &&
    selectedOnlineGame.securityID === securityID
      ? 'selected'
      : '';

  return (
    <div className={`list-item online-game ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-row items-baseline">
          <div className="left-content">
            <div className="user-name main-content">{username || userID}</div>
            <div>{sessionID || securityID}</div>
          </div>
          <div className="update-time">{updateTime}</div>
        </div>
      </Card>
    </div>
  );
};

OnlineGameListItemStateless.propTypes = {
  username: PropTypes.string,
  userName: PropTypes.string,
  userID: PropTypes.string.isRequired,
  updateTime: PropTypes.string.isRequired,
  sessionID: PropTypes.string,
  securityID: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  selectedOnlineGame: PropTypes.object,
};

OnlineGameListItemStateless.defaultProps = {
  username: null,
  userName: null,
  sessionID: undefined,
  securityID: undefined,
  selectedOnlineGame: null,
};

export default OnlineGameListItemStateless;
