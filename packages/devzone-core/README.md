# Table of Contents

- [Overview](#overview)

- [Install](#install)

- [AppWrapper](#appwrapper)

- [Core Information (store)](#core-information-store)

- [ContextProvider](#contextprovider)

- [NavigationBar](#navigationbar)

- [FeatureSwitchesCheck](#featureswitchescheck)

- [PermissionCheck Selector](#permissioncheck-selector)

# Overview

**devzone-core** contains the core set of components needed to run Devzone, including the Navbar.

Additionally it can be used by partner applications to embed the Devzone Navbar and required components such as permissions & feature flags.

- **AppWrapper**: fetches core info from Devzone API and puts it into `ContextProvider`. Also renders `GlobalProgress` and `GlobalSnackBar` components;

- **ContextProvider**: provides `user`, `switches`, `permissions` and `contentType` info through React.Context in a way compatible with `redux`;

- **NavigationBar**: awesome Devzone Studio's navigation bar which can be used in partner's applications.

- **FeatureSwitchesCheck**: allows to hide or show some parts of application depending on FeatureFlags / Switches.

- **PermissionCheck**: selector which allows to hide or show some parts of application depending on user's permissions

# Install

The package is available through the Demownare Artifactory NPM repository. To setup add the following to your `.yarnrc`

**.yarnrc**

```
"@demonware:registry" "https://artifactory.ihs.demonware.net/api/npm/demonware-npm/"
```

To install the package simply run

```bash
yarn add @demonware/devzone-core
```

For more details on how to setup see: https://artifactory.ihs.demonware.net/webapp/#/artifacts/browse/tree/General/demonware-npm-release-local

# AppWrapper

The preffered way to integrate with the core package and NavigationBar is to use `AppWrapper`.
This will handle all user / feature / permissions requirements via the Devzone API.

**IMPORTANT NOTE:** In case of using `AppWrapper` your application should be already authenticated
and API `accessToken` should be correctly placed into the `sessionStorage`
using [auth.utils.storeOAuthToken](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/auth/utils.js#L18)

The **devzone-core** provides auth utilities to authenticate against Devzone API:

**App.js**

```js
const App = props =>
  <h1>My cool application!!!</h1>
)

export default App;
```

**index.js**

```js
import { redirectIfUnauthenticated } from '@demonware/devzone-core/auth';
import { AppWrapper } from '@demonware/devzone-core';
import App from './App';

const WrappedApp = props => (
  <AppWrapper>
    <App />
  </AppWrapper>
);
export default WrappedApp;

// Is the user authenticated? Or should we redirect to the login page?
redirectIfUnauthenticated()
  .then(({ isSilentAuth }) => {
    if (isSilentAuth) {
      /* eslint-disable-next-line */
      console.log('Silent Authentication callback.');
      return;
    }

    ReactDOM.render(<WrappedApp />, document.getElementById('root'));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('Redirecting to Authentication Provider...');
  });
```

## Using Devzone API as data provider

By default all core information is fetched from the Devzone API.
`AppWrapper` calls it automatically and puts the data to the [ContextProvider](#contextprovider).

**App.js**

```js
import { connect } from '@demonware/devzone-core';

const App = props =>
  <div>{props.username}</div>
)

const mapStateToProps = state => ({
  username: state.user.profile.username,
})

export default connect(mapStateToProps)(App);
```

**index.js**

```js
import { AppWrapper } from '@demonware/devzone-core';
import App from './App';

const WrappedApp = props => (
  <AppWrapper>
    <App />
  </AppWrapper>
);
export default WrappedApp;
```

## Override data fetch with redux-saga

Data fetching can be overridden by using `redux-saga`.

Define your own implementation of the [rootSaga](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/sagas.js#L10)
with calls to your own API and pass it as prop to the AppWrapper.

**index.js**

```js
import { AppWrapper } from '@demonware/devzone-core';
import myOwnRootSaga from './saga';
import App from './App';

const WrappedApp = props => (
  <AppWrapper rootSaga={myOwnRootSaga}>
    <App />
  </AppWrapper>
);
export default WrappedApp;
```

# Core Information (store)

The data needed to correctly display Navigation Bar with all the features, permissions and avilable services:

- **user.projects**

- **user.profile**

- **switches**

- **permissions**

- **contentType** (needed to check permissions)

```json
{
  "user": {
    "projects": [
      {
        "name": "End2End Test Project",
        "id": 1,
        "contentTypeId": 57,
        "titles": [
          {
            "id": 5681,
            "name": "E2E Test Title",
            "platform": "PC-Steam",
            "environments": [
              {
                "id": 128,
                "shortType": "cert",
                "type": "Certification",
                "usesAE": false,
                "usesMarketplace": false,
                "usesObjectStore": true,
                "usesABTesting": false,
                "usesGroups": true,
                "usesLegacyStore": false,
                "usesAsyncMMP": false,
                "usesAccountsManagement": false,
                "contentTypeId": 52,
                "options": {
                  "is_multicontext": true,
                  "legacy_storage_enabled": false,
                  "async_matchmaking_enabled": false
                }
              },
              ...
            ]
          },
          ...
        ],
        "companies": [
          {
            "name": "D Company",
            "type": "Studio",
            "id": 1004
          },
          ...
        ]
      },
      ...
    ],
    "profile": {
      "id": 16,
      "name": "User Name",
      "userName": "username",
      "isStaff": true,
      "isHijacked": false,
      "defaultTitleEnv": {
        "id": 127,
        "titleId": 5681,
        "shortType": "dev"
      },
      "timezone": null,
      "permissions": [],
      "allObjectPermissions": [
        {
          "contentTypeId": 51,
          "objectPk": "11",
          "permission": "view_title_env"
        },
        ...
      ],
      "favoriteSections": [
        {
          "id": 46,
          "key": "acc",
          "profile_id": 69
        },
        ...
      ],
      "settings": {
        "em_last_visit_event_12869": {
          "discussion": 0
        },
        ...
      }
    }
  },
  "permissions": {
    "fetchFailed": false,
    "memberships": [
      {
        "id": 1539,
        "isActive": true,
        "isAdmin": false,
        "companyId": 11,
        "companyName": "Demonware",
        "groups": [],
        "permissions": []
      },
      ...
    ],
    "loading": false
  },
  "switches": {
    "ABTESTING.DELETE_SEGMENT": true,
    "AUTH.OKTA-LOGIN": false,
    "AUTHZ.BACKGROUND_CHECK": true,
    "AUTHZ.FOREGROUND_CHECK": false,
    "AUTHZ.SYNC_PERMISSIONS": true,
    "GRAPHS.IMAGES.S3": true,
    "GROUPS_UPLOAD_PLAYERS": true,
    "LDAP_AUTH_ENABLED": true,
    "LOOT_GEN_ENABLED": false,
    "PLAYER_INVENTORY_ENABLED": true,
    "PLAYER_ACHIEVEMENTS_ENABLED": true,
    "PLAYPANTS_GUEST_APP_ENABLED": true,
    "TA_ONLINE_ENABLED": true,
    "MA_ONLINE_ENABLED": true,
    "FORGE_ENABLED": true,
    "READ_IMP_FILES_FROM_S3": true,
    "REPORTING_PLATFORMS_USE_3_COLUMNS": true,
    "REPORTING_UNIT_ENABLED": true,
    "TOURNAMENT_SESSION_VIEWER": false,
    "TRACING.AUTHZ.ACTIVE": true,
    "TRACING.DEVICE42.ACTIVE": true,
    "TRACING.EXTERNAL.ACTIVE": true,
    "TRACING.MMP_WS.ACTIVE": true,
    "TRACING.PERMISSIONS.ACTIVE": true,
    "TRACING.SPECIAL_USER": true,
    "TRACING.TASKS.ACTIVE": true,
  },
  "contentType": {
    "data": [
      {
        "id": 147,
        "appLabel": "coreviz",
        "model": "chart",
        "Links": {
          "self": {
            "href": "https://devzone-api-gateway-qa.demonware.net/api/v3/charts/"
          }
        }
      },
      {
        "id": 146,
        "appLabel": "coreviz",
        "model": "dashboard",
        "Links": {
          "self": {
            "href": "https://devzone-api-gateway-qa.demonware.net/api/v3/dashboards/"
          }
        }
      },
      {
        "id": 51,
        "appLabel": "src",
        "model": "company",
        "Links": {
          "self": {
            "href": "https://devzone-api-gateway-qa.demonware.net/api/v3/companies/"
          }
        }
      },
      {
        "id": 57,
        "appLabel": "src",
        "model": "project",
        "Links": {
          "self": {
            "href": "https://devzone-api-gateway-qa.demonware.net/api/v3/projects/"
          }
        }
      },
      {
        "id": 52,
        "appLabel": "src",
        "model": "titleenv",
        "Links": {
          "self": {
            "href": "https://devzone-api-gateway-qa.demonware.net/api/v3/title-envs/"
          }
        }
      }
    ],
    "nextPageToken": null,
    "loading": false
  },
  "navigationBar": {
    "currentTitleEnv": {
      "id": 10,
      "type": "Development",
      "shortType": "dev"
    },
    "currentProject": {}
  },
  "Core": {
    "GlobalProgress": {
      "loading": 0
    },
    "GlobalSnackBar": {
      "messages": []
    }
  }
}
```

# ContextProvider

ContextProvider is the low level API used to manage core data.
It implements a redux like store through `React.Context` and allows to access to this information from any component in a tree.

The [AppWrapper](#appwrapper) uses this component internally.

There are two ways of accessing the information:

## ContextConsumer

**App.js**

```js
import { ContextConsumer } from '@demonware/devzone-core';

const App = props => (
  <ContextConsumer.Consumer>
    {({ store }) => <div>{store.user.profile.username}</div>}
  </ContextConsumer.Consumer>
);

export default App;
```

**index.js**

```js
import { ContextProvider } from '@demonware/devzone-core';
import App from './App';

const WrappedApp = props => (
  <ContextProvider>
    <App />
  </ContextProvider>
);
export default WrappedApp;
```

## connect HOC

There is `connect` helper which allows to get the needed info from a store in a redux way

**App.js**

```js
import { connect } from '@demonware/devzone-core';

const App = props =>
  <div>{props.username}</div>
)

const mapStateToProps = state => ({
  username: state.user.profile.username,
})

export default connect(mapStateToProps)(App);
```

**index.js**

```js
import { ContextProvider } from '@demonware/devzone-core';
import App from './App';

const WrappedApp = props => (
  <ContextProvider>
    <App />
  </ContextProvider>
);
export default WrappedApp;
```

## Manual data fetching

To **MANUALLY** put information into store you need to `dispatch` appropriate success actions:

- [user](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/modules/user/index.js#L241)

- [permissions](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/modules/permissions/index.js#L25)

- [switches](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/modules/switches/index.js#L30)

- [contentType](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/modules/contentType/actions.js)

**App.js**

```js
import { useEffect} from 'react';
import axios from 'axios';
import { connect } from '@demonware/devzone-core';
import * as GenericActions from '@demonware/devzone-core/helpers/actions';
import { actions as userActions } from '@demonware/devzone-core/modules/user';
import { actions as switchesActions } from '@demonware/devzone-core/modules/switches';
import { actions as permissionsActions } from '@demonware/devzone-core/modules/permissions';
import { CONTENT_TYPES_PREFIX } from '@demonware/devzone-core/modules/contentType';

const FetchData = props =>
  useEffect(() => { // componentDidMount alternative
    const getProfile = async () => {
      const { data } = await axios.get(<user-profile-endpoint>);
      props.fetchUserProfileSuccess(data);
    }
    getProfile();

    const getProjects = async () => {
      const { data } = await axios.get(<user-projects-endpoint>);
      props.fetchUserProjectsSuccess(data);
    }
    getProjects();

    const getSwitches = async () => {
      const { data } = await axios.get(<switches-endpoint>);
      props.fetchFeatureSwitchesSuccess(data);
    }
    getSwitches();

    const getPermissions = async () => {
      const { data } = await axios.get(<user-memberships-endpoint>);
      props.fetchUserMembershipsSuccess(data);
    }
    getPermissions();

    const getContentType = async () => {
      const { data } = await axios.get(<content-types-endpoint>);
      props.fetchContentTypeSuccess(data);
    }
    getContentType();
  }, [])
)

const mapDispatchToProps = dispatch => ({
  fetchUserProfileSuccess: data => dispatch(userActions.fetchUserProfileSuccess(data)),
  fetchUserProjectsSuccess: data => dispatch(userActions.fetchUserProjectsSuccess(data)),
  fetchFeatureSwitchesSuccess: data => dispatch(switchesActions.fetchFeatureSwitchesSuccess(data)),
  fetchUserMembershipsSuccess: data => dispatch(permissionsActions.fetchUserMembershipsSuccess(data)),
  fetchContentTypeSuccess: data => dispatch(GenericActions.fetchSuccess(CONTENT_TYPES_PREFIX, data)),
})

export default connect(null, mapDispatchToProps)(App);
```

**index.js**

```js
import { ContextProvider } from '@demonware/devzone-core';
import App from './App';
import FetchData from './FetchData';

const WrappedApp = props => (
  <ContextProvider>
    <FetchData />
    <App />
  </ContextProvider>
);
export default WrappedApp;
```

# NavigationBar

**App.js**

```js
import { AppWrapper, NavigationBar } from '@demonware/devzone-core';
import MyCoolComponent from './component';

const AppContainer = props => (
  <AppWrapper>
    <NavigationBar />
    <App />
  </AppWrapper>
);

const App = props => (
  <div>
    My cool Application with awesome NavigationBar
    <MyCoolComponent />
  </div>
);

export default AppContainer;
```

The parts of application could put some content into `NavigationBar`.
For the example above `MyCoolComponent` puts `This text would be rendered inside NavigationBar component` into the `NavigationBar`.
Everything else would be rendered within `App`.

**component.js**

```js
import { NavbarChildContainer } from '@demonware/devzone-core/NavigationBar';

const MyCoolComponent = () => (
  <div>
    <NavbarChildContainer>
      This text would be rendered inside NavigationBar component
    </NavbarChildContainer>
    Everything else would be rendered as usual !!!
  </div>
);

export default MyCoolComponent;
```

# FeatureSwitchesCheck

## Use with FeatureSwitchesCheck component

**component.js**

```js
import FeatureSwitchesCheck from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureChecks';

const UploadButton = () => (
  <FeatureSwitchesCheck
    featureSwitches={[fs.GROUPS_UPLOAD_PLAYERS]}
    isStaffAllowed={false}
  >
    <button value="Upload" />
  </FeatureSwitchesCheck>
);

export default UploadButton;
```

## Using selector

**component.js**

```js
import { connect } from '@demonware/devzone-core';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureChecks';

const UploadButton = ({myFeatureEnabled}) => (
  {myFeatureEnabled && (
    <button value="Upload" />
  )}
)

const mapStateToProps = state => ({
  myFeatureEnabled: hasFeaturesEnabledFuncSelector(state)(
    [fs.GROUPS_UPLOAD_PLAYERS]
  ),
})

export default connect(mapStateToProps)(UploadButton)
```

# PermissionCheck selector

**component.js**

```js
import { connect } from '@demonware/devzone-core';
import { makeHasObjectPermissionSelector } from '@demonware/devzone-core/access/PermissionCheck/selectors';
import * as P from '@demonware/devzone-core/access/PermissionCheck/permissions';

const UploadButton = ({hasObjectPermission}) => (
    {hasObjectPermission(project, P.PLAYPANTS_PROJECT_ADMIN) && (
      <button value="Upload" />
    )}
)


const stateToProps = state => {
  const hasObjectPermissionSelector = makeHasObjectPermissionSelector();
  return {
    ...
    hasObjectPermission: hasObjectPermissionSelector(state),
  };
};

export default connect(mapStateToProps)(UploadButton)
```

**Important**: The object passed to the permission check function **must** have a `contentTypeId` attribute.

