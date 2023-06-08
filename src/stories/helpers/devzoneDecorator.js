import React from 'react';
import { Router } from 'react-router-dom';
import history from 'dw/core/helpers/history';

import { MuiThemeProvider } from '@material-ui/core/styles';
import themes from '@demonware/devzone-core/themes';
import 'normalize.css';
import 'material-design-lite/material.min.css';
import 'dw/devzone/index.css';
import '@demonware/devzone-core/themes/default.css';

// All the components are going to be inside an MuiThemeProvider
export default story => (
  <MuiThemeProvider theme={themes}>
    <Router history={history}>{story()}</Router>
  </MuiThemeProvider>
);
