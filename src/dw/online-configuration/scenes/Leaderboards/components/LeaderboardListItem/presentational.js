import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { Card } from 'antd';

import './presentational.css';

const LeaderboardListItemStateless = props => {
  const { item, onClick, selectedLeaderboard, renderCheckbox } = props;
  const { id, name, resetStatus, rowscount } = item;
  const isSelectedClass =
    selectedLeaderboard && selectedLeaderboard.id === id ? 'selected' : '';
  let status = '';
  if (resetStatus.length > 0) {
    status = <div>{resetStatus}</div>;
  } else {
    const label =
      resetStatus.label === 'success' ? (
        <span className="success">{resetStatus.label}</span>
      ) : (
        resetStatus.label
      );
    status = (
      <Tooltip title={resetStatus.msg}>
        <div>{label}</div>
      </Tooltip>
    );
  }

  return (
    <div className={`list-item leaderboard ${isSelectedClass}`}>
      <Card onClick={onClick} className={isSelectedClass}>
        <div className="flex flex-row items-center">
          {renderCheckbox && (
            <div className="checkbox-cell">{renderCheckbox(item)}</div>
          )}
          <div className="left-content flex flex-col">
            <div className="main-content">{name}</div>
            <div>Number of rows: ~{rowscount}</div>
          </div>
          <div className="reset-status">
            Reset status <br />
            {status}
          </div>
        </div>
      </Card>
    </div>
  );
};

LeaderboardListItemStateless.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    resetStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    rowscount: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedLeaderboard: PropTypes.object,
  renderCheckbox: PropTypes.func,
};

LeaderboardListItemStateless.defaultProps = {
  selectedLeaderboard: null,
  renderCheckbox: null,
};

export default LeaderboardListItemStateless;
