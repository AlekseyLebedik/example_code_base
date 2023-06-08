import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncMembers = AsyncComponent(() =>
  import(/* webpackChunkName: "Members" */ 'dw/clans/scenes/Members')
);

export const ROUTES = {
  members: {
    name: 'members',
    title: 'Members',
    path: '/clans/members',
    component: AsyncMembers,
    mainRoute: true,
    default: true,
  },
};
