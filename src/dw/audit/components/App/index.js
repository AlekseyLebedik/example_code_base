import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import {
  VIEW_AUDIT_LOG,
  VIEW_AUDIT_LOG_ADMIN,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import Loading from 'dw/core/components/Loading';

import UnitLayout from 'dw/core/components/UnitLayout';

import CriticalError from 'dw/core/components/CriticalError';

import { ROUTES } from 'dw/audit/routes';
import { renderRoutesSimple } from 'dw/core/helpers/routes';
import Error404 from 'dw/core/components/Error404';

const App = () => {
  const [loading, error, result] = usePermissions(
    [VIEW_AUDIT_LOG, VIEW_AUDIT_LOG_ADMIN],
    `titleenv.*`
  );

  if (loading) {
    return <Loading />;
  }
  const navBarProps = {
    routes: ROUTES,
  };
  const canViewAuditLog = result?.data?.permission;

  return canViewAuditLog || error ? (
    <>
      <UnitLayout navBarProps={navBarProps}>
        <CriticalError>
          <Switch>
            {renderRoutesSimple(ROUTES)}
            <Redirect to="/audit/audit-logs" />
          </Switch>
        </CriticalError>
      </UnitLayout>
    </>
  ) : (
    <Error404 redirectTo="/" />
  );
};

export default App;
