import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncAuditLogs = AsyncComponent(() =>
  import(/* webpackChunkName: "AuditLogs" */ 'dw/audit/scenes/AuditLogs/')
);

const AsyncAccountAuditLog = AsyncComponent(() =>
  import(/* webpackChunkName: "AuditLogs" */ 'dw/audit/scenes/AccountAuditLog')
);

export const ROUTES = [
  {
    name: 'AuditLogs',
    title: 'AuditLogs',
    path: '/audit/audit-logs',
    component: AsyncAuditLogs,
    mainRoute: true,
    default: true,
  },
  {
    name: 'AccountsAuditLog',
    title: 'AccountsAuditLog',
    path: '/audit/account-audit-logs/:id?',
    navPath: '/audit/account-audit-logs',
    routePath: '/audit/account-audit-logs/:id?',
    component: AsyncAccountAuditLog,
    mainRoute: true,
  },
];

export const getRoutePath = key => {
  const route = ROUTES.find(r => r.key === key);
  return route ? route.path : undefined;
};
