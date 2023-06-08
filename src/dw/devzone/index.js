// Disabled because we want to import theming and global CSS first
/* eslint-disable import/first */

import 'normalize.css';
import '@demonware/devzone-core/themes/default.css';
import defaultTheme from '@demonware/devzone-core/themes';

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import { LicenseManager } from 'ag-grid-enterprise';

// eslint-disable-next-line
import * as monacoEditor from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

import {
  createGenerateClassName,
  StylesProvider,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import history from 'dw/core/helpers/history';
import { redirectIfUnauthenticated } from '@demonware/devzone-core/auth';
import { AppWrapper } from '@demonware/devzone-core';
import { rootSaga } from '@demonware/devzone-core/helpers/sagas';
import { GA_PROPERTY_ID, AG_LICENSE_KEY } from 'dw/config';

import Devzone from './unit';

import 'dw/core/helpers/polyfills';

LicenseManager.setLicenseKey(AG_LICENSE_KEY);

window.monacoEditor = monacoEditor;
window.MonacoEditor = MonacoEditor;

function setupGA() {
  ReactGA.initialize(GA_PROPERTY_ID, { siteSpeedSampleRate: 100 });

  // Track initial page load
  ReactGA.pageview(window.location.pathname + window.location.search);

  // Track every page change
  history.listen(location =>
    ReactGA.pageview(location.pathname + location.search)
  );
}

const generateClassName = createGenerateClassName({ productionPrefix: 'dz' });

// Is the user authenticated? Or should we redirect to the login page?
redirectIfUnauthenticated(history)
  .then(({ isSilentAuth }) => {
    if (isSilentAuth) {
      /* eslint-disable-next-line */
      console.log('Silent Authentication callback.');
      return;
    }

    setupGA();

    ReactDOM.render(
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={defaultTheme}>
          <AppWrapper rootSaga={rootSaga}>
            <Router history={history}>
              <Devzone />
            </Router>
          </AppWrapper>
        </MuiThemeProvider>
      </StylesProvider>,
      document.getElementById('root')
    );
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('Redirecting to Authentication Provider...');
  });
