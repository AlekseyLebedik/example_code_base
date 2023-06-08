import React from 'react';
import { Switch } from 'react-router-dom';

import UnitLayout from 'dw/core/components/UnitLayout';

import { ROUTES } from 'dw/devzone-docs/routes';
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
        <Switch>{renderRoutesSimple(ROUTES)}</Switch>
      </UnitLayout>
    </>
  );
}

export default App;
