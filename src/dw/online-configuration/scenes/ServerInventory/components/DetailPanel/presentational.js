import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

import Empty from 'dw/core/components/Empty';
import Loading from 'dw/core/components/Loading';
import * as SERVER_STATES from './server-states';
import ServerStateChart from '../ServerStateChart';
import ServerList from '../ServerList';
import styles from './presentational.module.css';

const ToolbarDetail = withStyles({
  root: {
    minHeight: '57px',
  },
})(Toolbar);
const DetailPanel = ({
  servers,
  serverState,
  loading,
  empty,
  emptyText,
  disableList,
  displayChart,
  onServerStateChange,
  onViewListClick,
  onViewChartClick,
}) => {
  let renderList;
  if (displayChart || disableList) renderList = <ServerStateChart />;
  else if (loading) renderList = <Loading />;
  else if (empty)
    renderList = <Empty emptyText={emptyText} className={styles.detailsText} />;
  else renderList = <ServerList servers={servers} />;

  return (
    <div className={styles.detailsContainer}>
      <ToolbarDetail>
        {!displayChart && !disableList && (
          <Tabs
            value={serverState}
            classes={{ indicator: styles.indicator }}
            onChange={onServerStateChange}
          >
            <Tab
              classes={{
                root: classnames({
                  [styles.selectedTab]: serverState === SERVER_STATES.IDLE,
                }),
              }}
              value={SERVER_STATES.IDLE}
              label={
                <span className={styles.tabLabel}>{SERVER_STATES.IDLE}</span>
              }
            />
            <Tab
              classes={{
                root: classnames({
                  [styles.selectedTab]: serverState === SERVER_STATES.ALLOCATED,
                }),
              }}
              value={SERVER_STATES.ALLOCATED}
              label={
                <span className={styles.tabLabel}>
                  {SERVER_STATES.ALLOCATED}
                </span>
              }
            />
          </Tabs>
        )}
        <div className={styles.grow} />
        <Tooltip
          title={
            disableList
              ? 'List View is disabled for production titles'
              : 'Show List View'
          }
        >
          <div>
            <IconButton onClick={onViewListClick} disabled={disableList}>
              <Icon>view_list</Icon>
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Show Chart View">
          <IconButton onClick={onViewChartClick}>
            <Icon>pie_chart</Icon>
          </IconButton>
        </Tooltip>
      </ToolbarDetail>
      {renderList}
    </div>
  );
};

DetailPanel.propTypes = {
  servers: PropTypes.arrayOf(ServerList),
  serverState: PropTypes.oneOf([SERVER_STATES.IDLE, SERVER_STATES.ALLOCATED]),
  loading: PropTypes.bool,
  emptyText: PropTypes.string,
  empty: PropTypes.bool,
  disableList: PropTypes.bool,
  displayChart: PropTypes.bool,
  onServerStateChange: PropTypes.func,
  onViewListClick: PropTypes.func,
  onViewChartClick: PropTypes.func,
};

DetailPanel.defaultProps = {
  servers: [],
  serverState: SERVER_STATES.IDLE,
  loading: false,
  empty: false,
  emptyText: null,
  disableList: false,
  displayChart: false,
  onServerStateChange: null,
  onViewListClick: null,
  onViewChartClick: null,
};

export default DetailPanel;
