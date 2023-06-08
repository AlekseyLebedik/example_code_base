import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import defaultTheme from '@demonware/devzone-core/themes';

import { LicenseManager } from 'ag-grid-enterprise';
import { AG_LICENSE_KEY } from 'dw/config';

import { makeUnit } from 'dw/core/helpers/unit';
import WaitFor from 'dw/core/components/WaitFor';
import {
  currentUserSelector,
  projectsSelector,
} from './components/App/selectors';
import RedirectToDefault from './components/App/components/Navigation/RedirectToDefault';
import { PROJECT_PATH } from './components/App/components/Navigation/routes';

import createStore from './store';
import scenesSagas from './scenes/sagas';
import componentsSagas from './components/sagas';

import App from './components/App';

LicenseManager.setLicenseKey(AG_LICENSE_KEY);

const { UserReplica, PermissionsReplica, SwitchesReplica, ContentTypeReplica } =
  window.Replicas;

const generateClassName = createGenerateClassName({ seed: 'em' });

export default makeUnit(
  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={defaultTheme}>
      <UserReplica.ConnectedReplica />
      <PermissionsReplica.ConnectedReplica />
      <SwitchesReplica.ConnectedReplica />
      <ContentTypeReplica.ConnectedReplica />
      <WaitFor selectors={[currentUserSelector, projectsSelector]}>
        <Switch>
          <Redirect
            from={`${PROJECT_PATH}/:env/events/:eventId/:tab?/:tabId?`}
            to={`${PROJECT_PATH}/events/:eventId/:tab?/:tabId?`}
          />
          <Route path={PROJECT_PATH} component={App} />
          <Route component={RedirectToDefault} />
        </Switch>
      </WaitFor>
    </MuiThemeProvider>
  </StylesProvider>,
  createStore,
  {
    sagas: [...scenesSagas, ...componentsSagas],
  }
);
