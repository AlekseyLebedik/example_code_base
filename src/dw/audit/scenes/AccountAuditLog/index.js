import React from 'react';

import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { VIEW_ACCOUNTS_AUDIT_LOGS_PII_DETAILS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import Loading from 'dw/core/components/Loading';
import { withRouter } from 'react-router-dom';
import Error404 from 'dw/core/components/Error404';
import AccountAuditLogsContainer from 'dw/audit/components/AccountAuditLogsContainer';

const AccountAuditLogs = () => {
  const [loading, error, result] = usePermissions(
    [VIEW_ACCOUNTS_AUDIT_LOGS_PII_DETAILS],
    `titleenv.*`
  );

  if (loading) {
    return <Loading />;
  }

  const canViewAccountAuditLog = result?.data?.permission;

  return canViewAccountAuditLog || error ? (
    <AccountAuditLogsContainer />
  ) : (
    <Error404 redirectTo="/" />
  );
};

export default withRouter(AccountAuditLogs);
