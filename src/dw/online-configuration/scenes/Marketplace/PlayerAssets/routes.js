// eslint-disable-next-line import/no-named-as-default
import AsyncComponent from 'dw/core/components/AsyncComponent';
import { tabs } from './constants';

const AsyncInventory = AsyncComponent(() =>
  import(/* webpackChunkName: "Inventory" */ './Inventory')
);
const AsyncAudit = AsyncComponent(() =>
  import(/* webpackChunkName: "Audit" */ './Audit')
);
const AsyncMange = AsyncComponent(() =>
  import(/* webpackChunkName: "Manage" */ './Manage')
);

export const ROUTES = [
  {
    title: 'Inventory',
    key: tabs.inventory,
    path: tabs.inventory,
    component: AsyncInventory,
    mainRoute: true,
    default: true,
  },
  {
    title: 'Audit',
    key: tabs.audit,
    path: tabs.audit,
    component: AsyncAudit,
    mainRoute: true,
  },
  {
    title: 'Manage',
    key: tabs.manage,
    path: tabs.manage,
    component: AsyncMange,
    mainRoute: true,
  },
];
