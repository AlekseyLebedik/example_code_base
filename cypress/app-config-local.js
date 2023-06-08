window.APP_CONFIG_API_HOST = 'http://backend';
window.APP_CONFIG_AUTH_SERVICE_PROVIDER_HOST = 'http://backend';
window.APP_CONFIG_LEGACY_HOST = 'http://backend';
window.APP_CONFIG_AUTH_CLIENT = 'react-e2e-local';

window.GUEST_APPS = 'EVENT_MANAGER';
window.APP_EVENT_MANAGER_LOCATION = 'http://event-manager.local';

window.APP_CONFIG_FEATURE_FLAGS = {
  OPS4_SPECIFIC_FEATURES_ENABLED: {
    type: 'project',
    value: [1],
  },
  GAMEMODES_CHART_ENABLED: {
    type: 'project',
    value: [2],
  },
  PUBLISHER_OBJECTS_PARTIAL_SEARCH: {
    type: 'title',
    value: [1, 3, 5682, 5681],
  },
};
