import { getConfig, toNumber } from './helpers';

/**
 * Authorization Provider parameters
 */
export const AUTH_CLIENT = getConfig(
  window.APP_CONFIG_AUTH_CLIENT,
  process.env.REACT_APP_AUTH_CLIENT
);

export const DEFAULT_AUTH_CLIENT = 'react';
export const ACCESS_TOKEN_SESSION_KEY = 'devzone-auth-access-token';
export const AUTH_STATE_SESSION_KEY = 'devzone-auth-state';

/** Solved the problem with the generation of the title CORVIZE GET REQUEST pages */

/**
 * Base URL for the API endpoints.
 */
const origin = getConfig(
  window.APP_CONFIG_API_HOST,
  process.env.REACT_APP_API_HOST
);

export const API_BASE_URL = `${origin}/api/v2`;
export const BASE_URL = `${origin}`;
export const GRAPHQL_URL = `${origin}/graphql/`;

/**
 * Base URL for the Auth Service Provider.
 */
export const AUTH_SERVICE_PROVIDER_HOST = getConfig(
  window.APP_CONFIG_AUTH_SERVICE_PROVIDER_HOST,
  process.env.REACT_APP_AUTH_SERVICE_PROVIDER_HOST
);

/**
 * Base URL for the Devzone Legacy application associated with this Devzone Studio application.
 * Used to allow a rudimentary 'version switch' where users can visit the same title in the old
 * application.
 */
export const LEGACY_HOST = getConfig(
  window.APP_CONFIG_LEGACY_HOST,
  process.env.REACT_APP_LEGACY_HOST
);

/**
 *  Add veriable for checking generated title pages
 */

export const ALLOW_BROWSER_TITLE_CHANGE = getConfig(
  window.ALLOW_BROWSER_TITLE_CHANGE,
  process.env.REACT_APP_ALLOW_BROWSER_TITLE_CHANGE
);
/**
 * Base URL to display Devzone Studio related links in Navigation Menu.
 * Leave blank if Devzone Studio is the host application rendering Navigation Bar.
 */
export const DEVZONE_STUDIO_HOST =
  getConfig(
    window.APP_CONFIG_DEVZONE_STUDIO_HOST,
    process.env.REACT_APP_DEVZONE_STUDIO_HOST
  ) || '';

/**
 * Base URL to display Coreviz related links in Navigation Menu.
 * Leave blank if Coreviz is the host application rendering Navigation Bar.
 */
export const COREVIZ_HOST =
  getConfig(
    window.APP_CONFIG_COREVIZ_HOST,
    process.env.REACT_APP_COREVIZ_HOST
  ) || '';

/**
 * Google Analytics ID
 */
export const GA_PROPERTY_ID = getConfig(
  window.APP_CONFIG_GA_PROPERTY_ID,
  process.env.REACT_APP_GA_PROPERTY_ID
);

/**
 * Guest Applications Config
 */

export const GUEST_APPS =
  getConfig(
    window.GUEST_APPS,
    process.env.REACT_APP_GUEST_APPS,
    v => v && v.split(',')
  ) || [];

export const ALLOW_LOCAL_GUEST_APP = getConfig(
  window.ALLOW_LOCAL_GUEST_APP,
  process.env.REACT_APP_ALLOW_LOCAL_GUEST_APP
);

/**
 * Loactions of Guest Apps
 */
export const GUEST_APP_LOCATIONS = GUEST_APPS.reduce(
  (acc, guestApp) => ({
    ...acc,
    [guestApp]: getConfig(
      window[`APP_${guestApp}_LOCATION`],
      process.env[`REACT_APP_${guestApp}_LOCATION`]
    ),
  }),
  {}
);

/**
 * Loactions of Guest Apps local bundle to use on QA
 */
export const GUEST_APP_LOCAL_LOCATIONS = ALLOW_LOCAL_GUEST_APP
  ? GUEST_APPS.reduce(
      (acc, guestApp) => ({
        ...acc,
        [guestApp]: getConfig(
          window[`LOCAL_${guestApp}_LOCATION`],
          process.env[`REACT_APP_LOCAL_${guestApp}_LOCATION`]
        ),
      }),
      {}
    )
  : {};

/**
 * Global Request Timeout
 */
export const REQUEST_TIMEOUT = getConfig(
  window.APP_CONFIG_REQUEST_TIMEOUT,
  process.env.REACT_REQUEST_TIMEOUT,
  toNumber
);

/**
 * Global Poll Interval
 * default: 5 seconds
 */
export const GLOBAL_POLL_INTERVAL =
  getConfig(
    window.APP_CONFIG_GLOBAL_POLL_INTERVAL,
    process.env.REACT_GLOBAL_POLL_INTERVAL,
    toNumber
  ) || 5000;

/**
 * Application version.
 */
export const VERSION = process.env.REACT_APP_VERSION;

export const SUPPORT_EMAIL = 'support@support.demonware.net';
export const SUPPORT_SLACK = {
  channel: '#dw-devzone',
  url: 'https://demonware.slack.com/archives/C01PNGF5C00',
};

/**
 * Define a list of graphs that we want to exclude for a given title
 * { 5000: ['graph1', 'graph2'], 5001: ['graph1', 'graph2'] }
 */
export const GRAPH_EXCLUSIONS = getConfig(
  window.APP_CONFIG_GRAPH_EXCLUSIONS,
  {}
);

/**
 * Expected an object like below:
 * { "ONLINE_CONFIGURATION_SESSION_VIEWER_PLAYLIST_ID_MAPPING": { type: "project", value: [1] }}
 */
export const CONFIG_FEATURE_FLAGS = getConfig(
  window.APP_CONFIG_FEATURE_FLAGS,
  {}
);

/**
 * Expected an object like below:
 * { "MY_COOL_CONFIG_OPTION": { type: "title", entityIds: [1], value: "MY COOL VALUE" }}
 */
export const CONFIG_OPTIONS = getConfig(window.APP_CONFIG_CONFIG_OPTIONS, {});

export const PUBLISHER_OBJECTS_PARTIAL_SEARCH = getConfig(
  window.PUBLISHER_OBJECTS_PARTIAL_SEARCH,
  []
);

/**
 * License key Ag Grid.
 */
// we will replace this at build time in CI
export const AG_LICENSE_KEY = 'process.env.REACT_APP_AG_GRID_LICENSE_KEY';

/**
 * Coreviz chart ids to be embedded in Online Configuration
 */
export const EMBEDDED_COREVIZ_CHART_IDS = getConfig(
  window.EMBEDDED_COREVIZ_CHART_IDS,
  []
);

/**
 * Linked Accounts Lookup Timeout
 * default: 5 seconds
 */
export const LINKED_ACCOUNTS_LOOKUP_TIMEOUT =
  getConfig(
    window.APP_CONFIG_LINKED_ACCOUNTS_LOOKUP_TIMEOUT,
    process.env.REACT_LINKED_ACCOUNTS_LOOKUP_TIMEOUT,
    toNumber
  ) || 5000;

/**
 * Server logs, limit the number of records to export.
 */
export const EXPORT_LOGS_COUNT = 10000;

/**
 * GVS: MAX_STRING_LENGTH
 * default: 512
 */
export const GVS_MAX_STRING_LENGTH =
  getConfig(
    window.APP_CONFIG_GVS_MAX_STRING_LENGTH,
    process.env.REACT_GVS_MAX_STRING_LENGTH,
    toNumber
  ) || 1024;
