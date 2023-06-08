import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncSchedule = AsyncComponent(() =>
  // eslint-disable-next-line import/no-cycle
  import(/* webpackChunkName: "Schedule" */ 'playpants/scenes/Schedule')
);
const AsyncEvent = AsyncComponent(() =>
  import(/* webpackChunkName: "Event" */ 'playpants/scenes/Event')
);
const AsyncProjectSettings = AsyncComponent(() =>
  import(
    /* webpackChunkName: "ProjectSettings" */ 'playpants/scenes/ProjectSettings'
  )
);
const AsyncTemplates = AsyncComponent(() =>
  import(/* webpackChunkName: "Templates" */ 'playpants/scenes/Templates')
);
const AsyncGroupStories = AsyncComponent(() =>
  import(/* webpackChunkName: "GroupStories" */ 'playpants/scenes/GroupStories')
);

export const BASE_PATH = 'event-manager';
export const PROJECT_PATH = `/${BASE_PATH}/:projectId`;

export const ROUTES = (
  permissions,
  hasCurrentProjectSettings,
  isConfigured
) => [
  {
    name: 'Events',
    routePath: 'events',
    component: AsyncSchedule,
    default: true,
    exact: true,
  },
  {
    name: 'Event',
    routePath: 'events/:eventId/:tab?/:tabId?',
    component: AsyncEvent,
  },
  ...(permissions.adminPermission
    ? [
        {
          name: 'Admin',
          routePath: 'project-settings/:category?/:subcategory?/:id?',
          component: AsyncProjectSettings,
        },
      ]
    : []),
  ...(permissions.adminPermission && hasCurrentProjectSettings
    ? [
        {
          name: 'Templates',
          routePath: 'templates/:eventId?/:tab?/:tabId?',
          component: AsyncTemplates,
        },
      ]
    : []),
  ...(hasCurrentProjectSettings && isConfigured.stories
    ? [
        {
          name: 'Stories',
          routePath: 'stories/:storyId?',
          component: AsyncGroupStories,
        },
      ]
    : []),
];
