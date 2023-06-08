import React from 'react';
import RouteTabs from 'dw/core/components/RouteTabs';
import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncLogsByTime = AsyncComponent(() => import('./components/LogsByTime'));
const AsyncLogsByUser = AsyncComponent(() => import('./components/LogsByUser'));

export const routes = [
  {
    key: 'by-time',
    label: 'Whitelist Logs by Update Time',
    component: AsyncLogsByTime,
  },
  {
    key: 'by-user',
    label: 'Whitelist Logs by UserID',
    component: AsyncLogsByUser,
    param: ':userID',
  },
];

export const renderRoutes = (baseUrl, active) => {
  const activeKey = active || routes[0].key;
  const value = routes.findIndex(r => r.key === activeKey);
  return <RouteTabs baseUrl={baseUrl} value={value} routesList={routes} />;
};
