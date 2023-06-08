import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncDemonwareAdmin = AsyncComponent(() =>
  import(/* webpackChunkName: "admin" */ 'dw/devzone-docs/scenes/admin/')
);

const AsyncDevzoneUser = AsyncComponent(() =>
  import(/* webpackChunkName: "user" */ 'dw/devzone-docs/scenes/user/')
);

const AsyncDevzoneGameDeveloper = AsyncComponent(() =>
  import(
    /* webpackChunkName: "gameDeveloper" */ 'dw/devzone-docs/scenes/gameDeveloper/'
  )
);

const AsyncDevzoneDeveloper = AsyncComponent(() =>
  import(
    /* webpackChunkName: "devzoneDeveloper" */ 'dw/devzone-docs/scenes/devzoneDeveloper/'
  )
);

const AsyncReleaseNotes = AsyncComponent(() =>
  import(
    /* webpackChunkName: "releaseNotes" */ 'dw/devzone-docs/scenes/releaseNotes/'
  )
);

const AsyncUpcomingFeatures = AsyncComponent(() =>
  import(
    /* webpackChunkName: "upcomingfeatures" */ 'dw/devzone-docs/scenes/upcomingFeatures/'
  )
);

export const ROUTES = {
  admin: {
    name: 'demonware-admin',
    title: 'Demonware Admin',
    path: '/docs/demonware/admin/:id?',
    navPath: '/docs/demonware/admin',
    routePath: '/docs/demonware/admin/:id?',
    component: AsyncDemonwareAdmin,
    mainRoute: true,
    default: true,
  },
  user: {
    name: 'devzone-users',
    title: 'Devzone Users',
    path: '/docs/devzone/users/:id?',
    navPath: '/docs/devzone/users',
    routePath: '/docs/devzone/users/:id?',
    component: AsyncDevzoneUser,
  },
  gameDeveloper: {
    name: 'devzone-game-developers',
    title: 'Game Developers',
    path: '/docs/devzone/game-developers/:id?',
    navPath: '/docs/devzone/game-developers',
    routePath: '/docs/devzone/game-developers/:id?',
    hideIfNotAvailable: true,
    component: AsyncDevzoneGameDeveloper,
  },
  devzoneDeveloper: {
    name: 'devzone-developer',
    title: 'Devzone Developer',
    path: '/docs/devzone/devzone-developers/:id?',
    navPath: '/docs/devzone/devzone-developers',
    routePath: '/docs/devzone/devzone-developers/:id?',
    hideIfNotAvailable: true,
    component: AsyncDevzoneDeveloper,
  },
  releaseNotes: {
    name: 'release-notes',
    title: 'Release Notes',
    path: '/docs/devzone/release-notes/:id?',
    navPath: '/docs/devzone/release-notes',
    routePath: '/docs/devzone/release-notes/:id?',
    hideIfNotAvailable: true,
    component: AsyncReleaseNotes,
  },
  upcomingFeatures: {
    name: 'upcoming-features',
    title: 'Upcoming Features',
    path: '/docs/devzone/upcoming-features/:id?',
    navPath: '/docs/devzone/upcoming-features',
    routePath: '/docs/devzone/upcoming-features/:id?',
    hideIfNotAvailable: true,
    component: AsyncUpcomingFeatures,
  },
};

export const getRoutePath = key => {
  const route = Object.values(ROUTES).find(r => r.name === key);
  return route ? route.path : undefined;
};
