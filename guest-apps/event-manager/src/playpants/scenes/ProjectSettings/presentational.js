import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AdapterLink from '@demonware/devzone-core/components/RouteAdapterLink';
import RedirectHandler from 'playpants/components/RedirectHandler';
import {
  SETTINGS_TABS,
  PROJECT_SETTINGS_URL,
  RESP_REDIRECT_URL,
} from './constants';

import Responsibilities from './components/Responsibilities';
import EventManagerSettings from './components/EventManagerSettings';
import GamertagManagement from './components/GamertagManagement';

import { useStyles } from './theme';

const StatelessProjectSettings = props => {
  const classes = useStyles();
  const { baseUrl, hasCurrentProjectSettings, match } = props;
  const { category: selectedTab, subcategory: selectedSubTab } = match.params;
  return (
    <RedirectHandler
      matchParam={selectedTab}
      list={Object.keys(SETTINGS_TABS)}
      url={`${baseUrl}${RESP_REDIRECT_URL}`}
    >
      <>
        <Tabs value={selectedTab} indicatorColor="primary" textColor="primary">
          {Object.entries(SETTINGS_TABS)
            .filter(([t]) => hasCurrentProjectSettings || t === 'settings')
            .map(([key, label]) => (
              <Tab
                key={key}
                value={key}
                label={label}
                component={AdapterLink}
                to={`${baseUrl}${PROJECT_SETTINGS_URL}/${key}`}
              />
            ))}
        </Tabs>
        {selectedTab === 'responsibilities' && hasCurrentProjectSettings && (
          <Responsibilities
            {...props}
            classes={classes}
            selectedTab={selectedSubTab}
          />
        )}
        {selectedTab === 'gamertag-management' && hasCurrentProjectSettings && (
          <GamertagManagement
            {...props}
            classes={classes}
            selectedTab={selectedSubTab}
          />
        )}
        {selectedTab === 'settings' && (
          <EventManagerSettings
            {...props}
            classes={classes}
            selectedTab={selectedSubTab}
          />
        )}
      </>
    </RedirectHandler>
  );
};

StatelessProjectSettings.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  hasCurrentProjectSettings: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  selectedTab: PropTypes.string,
};

StatelessProjectSettings.defaultProps = {
  selectedTab: null,
};

export default StatelessProjectSettings;
