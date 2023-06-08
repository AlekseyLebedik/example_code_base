import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AdapterLink from '@demonware/devzone-core/components/RouteAdapterLink';
import {
  SETTINGS_URL,
  SETTINGS_REDIRECT_URL,
  SETTINGS_SUB_TABS,
} from 'playpants/scenes/ProjectSettings/constants';
import RedirectHandler from 'playpants/components/RedirectHandler';

import ColorPicker from './components/ColorPicker';
import GlobalSettings from './components/GlobalSettings';
import EventsSettings from './components/EventsSettings';
import ActivitiesSettings from './components/ActivitiesSettings';
import NameMappingSettings from './components/NameMappingSettings';
import NotificationSettings from './components/NotificationSettings';

const EventManagerSettings = props => {
  const { activitySettings, baseUrl, permissions, selectedTab } = props;
  const hideActivitySettings =
    isEmpty(activitySettings) || !permissions.wipPermission;
  return (
    <RedirectHandler
      matchParam={selectedTab}
      list={Object.keys(SETTINGS_SUB_TABS)}
      url={`${baseUrl}${SETTINGS_REDIRECT_URL}`}
    >
      <>
        <Tabs value={selectedTab} indicatorColor="primary" textColor="primary">
          {Object.entries(SETTINGS_SUB_TABS)
            .filter(([key]) => {
              if (
                hideActivitySettings &&
                (key === 'activities' || key === 'name-mapping')
              ) {
                return false;
              }
              return (
                permissions.wipPermission ||
                (key !== 'events' && key !== 'activities')
              );
            })
            .map(([key, label]) => (
              <Tab
                key={key}
                value={key}
                label={label}
                component={AdapterLink}
                to={`${baseUrl}${SETTINGS_URL}/${key}`}
              />
            ))}
        </Tabs>
        {selectedTab === 'global' && <GlobalSettings {...props} />}
        {selectedTab === 'events' && permissions.wipPermission && (
          <EventsSettings {...props} />
        )}
        {selectedTab === 'activities' && !hideActivitySettings && (
          <ActivitiesSettings {...props} />
        )}
        {selectedTab === 'name-mapping' && !hideActivitySettings && (
          <NameMappingSettings {...props} />
        )}
        {selectedTab === 'notifications' && <NotificationSettings {...props} />}
        {selectedTab === 'colors' && <ColorPicker {...props} />}
      </>
    </RedirectHandler>
  );
};

EventManagerSettings.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseUrl: PropTypes.string.isRequired,
  permissions: PropTypes.object.isRequired,
  selectedTab: PropTypes.string,
};
EventManagerSettings.defaultProps = {
  selectedTab: null,
};

export default EventManagerSettings;
