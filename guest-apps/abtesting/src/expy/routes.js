import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncExpy = AsyncComponent(() =>
  import(/* webpackChunkName: "Expy" */ 'expy/index')
);

const AsyncExpyCreate = AsyncComponent(() =>
  import(/* webpackChunkName: "Expy Create" */ './scenes/Create')
);

const AsyncExpyEdit = AsyncComponent(() =>
  import(/* webpackChunkName: "Expy Edit" */ './scenes/Edit')
);

const AsyncExpyClone = AsyncComponent(() =>
  import(/* webpackChunkName: "Expy Clone" */ './scenes/Clone')
);

export const ROUTES = {
  expyEdit: {
    name: 'expy-edit',
    title: 'Expy Edit',
    path: '/abtesting/expy/edit/:testId',
    component: AsyncExpyEdit,
    mainRoute: false,
  },
  expyClone: {
    name: 'expy-clone',
    title: 'Expy Clone',
    path: '/abtesting/expy/clone/:testId',
    component: AsyncExpyClone,
    mainRoute: false,
  },
  expyCreate: {
    name: 'expy-create',
    title: 'Expy Create',
    path: '/abtesting/expy/create',
    component: AsyncExpyCreate,
    mainRoute: false,
  },
  expy: {
    name: 'expy',
    title: 'Expy',
    path: [
      '/abtesting/expy/test-catalog',
      '/abtesting/expy/test-catalog/:testId',
    ],
    mainRoute: false,
    component: AsyncExpy,
  },
};
