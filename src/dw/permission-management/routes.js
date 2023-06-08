import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncUsers = AsyncComponent(() =>
  import(
    /* webpackChunkName: "Users" */ 'dw/permission-management/scenes/Users/'
  )
);

const AsyncCompanies = AsyncComponent(() =>
  import(
    /* webpackChunkName: "Companies" */ 'dw/permission-management/scenes/Companies/'
  )
);

const AsyncGroups = AsyncComponent(() =>
  import(
    /* webpackChunkName: "Groups" */ 'dw/permission-management/scenes/Groups/'
  )
);

export const ROUTES = {
  users: {
    name: 'users',
    title: 'Users',
    path: '/permission-management/users/:id?',
    navPath: '/permission-management/users',
    routePath: '/permission-management/users/:id?',
    component: AsyncUsers,
    mainRoute: true,
    default: true,
  },
  groups: {
    name: 'groups',
    title: 'Groups',
    path: '/permission-management/groups/:id?',
    navPath: '/permission-management/groups',
    routePath: '/permission-management/groups/:id?',
    component: AsyncGroups,
    mainRoute: true,
  },
  companies: {
    name: 'companies',
    title: 'Companies',
    path: '/permission-management/companies/:id?',
    navPath: '/permission-management/companies',
    routePath: '/permission-management/companies/:id?',
    hideIfNotAvailable: true,
    component: AsyncCompanies,
    mainRoute: true,
  },
};

export const getRoutePath = key => {
  const route = Object.values(ROUTES).find(r => r.name === key);
  return route ? route.path : undefined;
};
