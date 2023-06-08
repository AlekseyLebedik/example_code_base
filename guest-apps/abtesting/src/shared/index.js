import React from 'react';

import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import devzoneTheme from '@demonware/devzone-core/themes';

import { LicenseManager } from 'ag-grid-enterprise';
import { AG_LICENSE_KEY } from 'dw/config';

import scenesSagas from 'abtesting/scenes/sagas';
import componentsSagas from 'abtesting/components/sagas';

import { makeUnit } from 'dw/core/helpers/unit';
import WaitFor from 'dw/core/components/WaitFor';
import { projectsSelector } from 'dw/core/helpers/title-env-selectors';
import createStore from './store';

import abTestingTheme from './theme';

import App from './components/App';

LicenseManager.setLicenseKey(AG_LICENSE_KEY);

const { UserReplica, PermissionsReplica, SwitchesReplica, ContentTypeReplica } =
  window.Replicas;

const generateClassName = createGenerateClassName({ seed: 'abtesting' });

export default makeUnit(
  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={devzoneTheme}>
      <UserReplica.ConnectedReplica />
      <PermissionsReplica.ConnectedReplica />
      <SwitchesReplica.ConnectedReplica />
      <ContentTypeReplica.ConnectedReplica />
      {/* Wait for the replicated data to be set in the store */}
      <WaitFor selectors={[projectsSelector]}>
        <MuiThemeProvider theme={abTestingTheme}>
          <App />
        </MuiThemeProvider>
      </WaitFor>
    </MuiThemeProvider>
  </StylesProvider>,
  createStore,
  {
    sagas: [...scenesSagas, ...componentsSagas],
  }
);
