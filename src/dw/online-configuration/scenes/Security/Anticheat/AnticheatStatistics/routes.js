import React from 'react';
import RouteTabs from 'dw/core/components/RouteTabs';
import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncStatisticsByDate = AsyncComponent(() =>
  import('./components/StatisticsByDate')
);
const AsyncStatisticsByChallenge = AsyncComponent(() =>
  import('./components/StatisticsByChallenge')
);

const AsyncStatisticsByUser = AsyncComponent(() =>
  import('./components/StatisticsByUser')
);

export const routes = [
  {
    key: 'by-date',
    label: 'Ordered by Date',
    component: AsyncStatisticsByDate,
    param: ':userID',
  },
  {
    key: 'by-challenge',
    label: 'Ordered by Challenge',
    component: AsyncStatisticsByChallenge,
    param: ':userID',
  },
  {
    key: 'by-user',
    label: 'Ordered by User',
    component: AsyncStatisticsByUser,
  },
];

export const renderRoutes = (baseUrl, active) => {
  const activeKey = active || routes[0].key;
  const value = routes.findIndex(r => r.key === activeKey);
  return <RouteTabs baseUrl={baseUrl} value={value} routesList={routes} />;
};
