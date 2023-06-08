import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncSchedule = AsyncComponent(() =>
  import(/* webpackChunkName: "Schedule" */ './scenes/Schedule')
);
const AsyncArchive = AsyncComponent(() =>
  import(/* webpackChunkName: "Archive" */ './scenes/Archive')
);
const AsyncKilled = AsyncComponent(() =>
  import(/* webpackChunkName: "Killed" */ './scenes/Killed')
);
const AsyncGroups = AsyncComponent(() =>
  import(/* webpackChunkName: "Groups" */ './scenes/ABTestGroups')
);
const AsyncCreate = AsyncComponent(() =>
  import(/* webpackChunkName: "Create" */ './scenes/ABTestForm')
);
const AsyncUpdate = AsyncComponent(() =>
  import(/* webpackChunkName: "Update" */ './scenes/Update')
);
const AsyncView = AsyncComponent(() =>
  import(/* webpackChunkName: "View" */ './scenes/View')
);

const AsyncPropagate = AsyncComponent(() =>
  import(/* webpackChunkName: "Propagate" */ './scenes/Propagate')
);

const AsyncClone = AsyncComponent(() =>
  import(/* webpackChunkName: "Clone" */ './scenes/Clone')
);

export const ROUTES = {
  schedule: {
    name: 'schedule',
    title: 'Schedule',
    path: '/abtesting/schedule',
    component: AsyncSchedule,
    mainRoute: true,
    default: true,
  },
  archive: {
    name: 'archive',
    title: 'Archive',
    path: '/abtesting/archive',
    component: AsyncArchive,
    mainRoute: true,
  },
  killed: {
    name: 'killed',
    title: 'Killed',
    path: '/abtesting/killed',
    component: AsyncKilled,
    mainRoute: true,
  },
  groups: {
    name: 'groups',
    title: 'Groups',
    path: '/abtesting/groups',
    routePath: '/abtesting/groups/:id?',
    component: AsyncGroups,
    mainRoute: true,
    searchable: false,
  },
  propagate: {
    name: 'propagate',
    title: 'Propagate',
    path: '/abtesting/propagate/:titleID?/:environment?/:id?',
    component: AsyncPropagate,
    mainRoute: false,
  },
  edit: {
    name: 'edit',
    title: 'Edit',
    path: '/abtesting/edit/:titleID?/:environment?/:id?',
    component: AsyncUpdate,
    mainRoute: false,
  },
  view: {
    name: 'view',
    title: 'View',
    path: '/abtesting/view/:titleID?/:environment?/:id?',
    component: AsyncView,
    mainRoute: false,
  },
  clone: {
    name: 'clone',
    title: 'Clone',
    path: '/abtesting/clone/:titleID?/:environment?/:id?',
    component: AsyncClone,
    mainRoute: false,
  },
  create: {
    name: 'create',
    title: 'Create',
    path: '/abtesting/create',
    component: AsyncCreate,
    mainRoute: false,
  },
};
