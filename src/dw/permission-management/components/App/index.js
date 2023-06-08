import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import UnitLayout from 'dw/core/components/UnitLayout';
import CriticalError from 'dw/core/components/CriticalError';

import { ROUTES } from 'dw/permission-management/routes';
import { renderRoutesSimple } from 'dw/core/helpers/routes';

// eslint-disable-next-line import/no-named-as-default
import NavigationBar from 'dw/core/components/NavigationBar';

import styles from './index.module.css';

function App() {
  const navBarProps = {
    routes: ROUTES,
    classes: {
      navigationBarContainer: styles.container,
    },
  };
  return (
    <>
      <UnitLayout navBarProps={navBarProps} NavbarComponent={NavigationBar}>
        <CriticalError>
          <Switch>
            {renderRoutesSimple(ROUTES)}
            <Redirect to="/permission-management/users" />
          </Switch>
        </CriticalError>
      </UnitLayout>
    </>
  );
}

export default App;
