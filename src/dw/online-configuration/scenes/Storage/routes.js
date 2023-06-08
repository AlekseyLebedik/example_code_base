import AsyncComponent from 'dw/core/components/AsyncComponent';

import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

const AsyncPublisherStoragePage = AsyncComponent(() =>
  import('./PublisherStorage')
);
const AsyncUserFilesPage = AsyncComponent(() =>
  import('./ContentServer/UserFiles')
);
const AsyncQuotaAllowancePage = AsyncComponent(() =>
  import('./ContentServer/QuotaAllowance')
);
const AsyncQuotaUsagePage = AsyncComponent(() =>
  import('./ContentServer/QuotaUsage')
);
const AsyncPooledFilesPage = AsyncComponent(() =>
  import('./ContentServer/PooledFiles')
);
const AsyncUserContextStoragePage = AsyncComponent(() =>
  import('./UserContextStorage')
);
const AsyncVariablesSetsPage = AsyncComponent(() =>
  import('./PublisherVariables/VariablesSets')
);
const AsyncGroupMembersPage = AsyncComponent(() =>
  import('./PublisherVariables/GroupMembers')
);

const storageEntries = [
  {
    name: 'storage',
    title: 'Storage',
    hasChilds: true,
    availabilityCheck: SERVICE_NAMES.STORAGES,
    hideIfNotAvailable: true,
  },
  {
    name: 'publisher-storage',
    title: 'Publisher Storage',
    routePath: 'storage/publisher-storage/:id?',
    parent: 'storage',
    component: AsyncPublisherStoragePage,
  },
  {
    name: 'user-context-storage',
    title: 'User Context Storage',
    parent: 'storage',
    routePath: 'storage/user-context-storage',
    component: AsyncUserContextStoragePage,
  },
  {
    name: 'content-server',
    title: 'Content Server',
    routePath: 'storage/content-server',
    parent: 'storage',
    hasChilds: true,
  },
  {
    name: 'user-files',
    title: 'User Files',
    routePath: 'storage/content-server/user-files',
    parent: 'content-server',
    component: AsyncUserFilesPage,
  },
  {
    name: 'quota-allowance',
    title: 'Quota Allowance',
    routePath: 'storage/content-server/quota-allowance',
    parent: 'content-server',
    component: AsyncQuotaAllowancePage,
  },
  {
    name: 'quota-usage',
    title: 'Quota Usage',
    routePath: 'storage/content-server/quota-usage',
    parent: 'content-server',
    component: AsyncQuotaUsagePage,
  },
  {
    name: 'pooled-files',
    title: 'Pooled Files',
    navPath: 'storage/content-server/pooled-files',
    routePath: 'storage/content-server/pooled-files/:id?',
    parent: 'content-server',
    component: AsyncPooledFilesPage,
  },
  {
    name: 'publisher-variables',
    title: 'Publisher Variables',
    routePath: 'storage/publisher-variables',
    hasChilds: true,
    parent: 'storage',
  },
  {
    name: 'variables-sets',
    title: 'Variables Sets',
    routePath: 'storage/publisher-variables/variables-sets/:id?',
    parent: 'publisher-variables',
    component: AsyncVariablesSetsPage,
  },
  {
    name: 'group-members',
    title: 'Group Members',
    routePath: 'storage/publisher-variables/group-members',
    component: AsyncGroupMembersPage,
    parent: 'publisher-variables',
  },
];

export default storageEntries;
