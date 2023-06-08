import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import UnitLayout from 'dw/core/components/UnitLayout';
import CriticalError from 'dw/core/components/CriticalError';
import Loading from 'dw/core/components/Loading';

import { ROUTES } from 'dw/player-tooling/routes';
import { renderRoutesSimple } from 'dw/core/helpers/routes';
import { VIEW_PLAYER_CENTRIC_TOOLING } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';

// eslint-disable-next-line import/no-named-as-default
import NavigationBar from 'dw/core/components/NavigationBar';
import Error404 from 'dw/core/components/Error404';

import styles from './index.module.css';

function App() {
  const [loading, , result] = usePermissions(
    VIEW_PLAYER_CENTRIC_TOOLING,
    'company.all'
  );
  const navBarProps = {
    routes: ROUTES,
    classes: {
      navigationBarContainer: styles.container,
    },
  };
  const hasViewPermission = result?.data?.permission ?? false;
  if (loading) return <Loading />;
  return hasViewPermission ? (
    <>
      <UnitLayout navBarProps={navBarProps} NavbarComponent={NavigationBar}>
        <CriticalError>
          <Switch>
            {renderRoutesSimple(ROUTES)}
            <Redirect to="/player/accounts" />
          </Switch>
        </CriticalError>
      </UnitLayout>
    </>
  ) : (
    <Error404 redirectTo="/" />
  );
}

export default App;
