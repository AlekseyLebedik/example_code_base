import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tabs } from 'antd';

import AsyncComponent from 'dw/core/components/AsyncComponent';
import { TAB_KEYS } from './constants';
import './presentational.css';

// Don't code-split the default tab since we need it immediatly. Code-splitting
// it will actualy make the loading time worst.
import TabUserDetails from './components/TabUserDetails';

const AsyncTabUserTeams = AsyncComponent(() =>
  import('./components/TabUserTeams')
);
const AsyncTabUserFriends = AsyncComponent(() =>
  import('./components/TabUserFriends')
);
const AsyncTabUserKeys = AsyncComponent(() =>
  import('./components/TabUserKeys')
);

const { TabPane } = Tabs;

const TabsComponent = props => {
  const { onChange, userTeamsState, hasUserTeamsDisabled } = props;

  return (
    <div className={classNames('tabs-container', 'tabs-container-reworked')}>
      <Tabs
        defaultActiveKey={TAB_KEYS.USER_DETAILS}
        onChange={onChange}
        tabBarExtraContent={props.tabBarExtraContent}
      >
        <TabPane tab="User Profile" key={TAB_KEYS.USER_DETAILS}>
          <TabUserDetails />
        </TabPane>
        <TabPane tab="User Keys" key={TAB_KEYS.USER_KEYS}>
          <AsyncTabUserKeys />
        </TabPane>
        {!hasUserTeamsDisabled && (
          <TabPane tab="User Teams" key={TAB_KEYS.USER_TEAMS}>
            <AsyncTabUserTeams tabState={userTeamsState} />
          </TabPane>
        )}
        <TabPane tab="User Friends" key={TAB_KEYS.USER_FRIENDS}>
          <AsyncTabUserFriends />
        </TabPane>
      </Tabs>
    </div>
  );
};

TabsComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  userTeamsState: PropTypes.object,
  hasUserTeamsDisabled: PropTypes.bool,
  tabBarExtraContent: PropTypes.node,
};

TabsComponent.defaultProps = {
  userTeamsState: null,
  hasUserTeamsDisabled: false,
  tabBarExtraContent: undefined,
};

export default TabsComponent;
