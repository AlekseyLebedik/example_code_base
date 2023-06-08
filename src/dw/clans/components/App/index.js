import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { CLANS_VIEW_CLAN } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import UnitLayout from 'dw/core/components/UnitLayout';
import CriticalError from 'dw/core/components/CriticalError';
import Loading from 'dw/core/components/Loading';

import { ROUTES } from 'dw/clans/routes';
import { renderRoutesSimple } from 'dw/core/helpers/routes';
import NavbarComponent from 'dw/core/components/NavigationBar';
import Error404 from 'dw/core/components/Error404';

import styles from './index.module.css';

function App() {
  const [loading, error, result] = usePermissions(
    [CLANS_VIEW_CLAN],
    `titleenv.*`
  );

  if (loading) {
    return <Loading />;
  }
  const navBarProps = {
    routes: ROUTES,
    classes: { navigationBarContainer: styles.container },
  };
  const canViewClans = result?.data?.permission;

  return canViewClans || error ? (
    <>
      <UnitLayout navBarProps={navBarProps} NavbarComponent={NavbarComponent}>
        <CriticalError>
          <Switch>
            {renderRoutesSimple(ROUTES)}
            <Redirect to="/clans/members" />
          </Switch>
        </CriticalError>
      </UnitLayout>
    </>
  ) : (
    <Error404 redirectTo="/" />
  );
}

export default App;
