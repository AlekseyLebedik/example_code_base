import React from 'react';
import AsyncComponent from 'dw/core/components/AsyncComponent';

import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import Error404 from 'dw/core/components/Error404';

const AsyncPublisherObjectsPage = AsyncComponent(() =>
  import('./PublisherObjects')
);
const AsyncUserObjectsPage = AsyncComponent(() => import('./UserObjects'));

const AsyncUserObjectsStatsPage = AsyncComponent(() =>
  import('./UserObjectStats')
);

const AsyncPooledObjectsPage = AsyncComponent(() =>
  import('./UserPooledObjects')
);

const AsyncObjectGroupsPage = AsyncComponent(() => import('./ObjectGroups'));

const objectStoreEntries = [
  {
    name: 'object-store',
    title: 'ObjectStore',
    hasChilds: true,
    availabilityCheck: SERVICE_NAMES.OBJECT_STORE,
    hideIfNotAvailable: true,
  },
  {
    name: 'publisher-objects',
    title: 'Publisher Objects',
    routePath: 'object-store/publisher/:category?',
    navPath: 'object-store/publisher',
    parent: 'object-store',
    component: AsyncPublisherObjectsPage,
  },
  {
    name: 'user-objects',
    title: 'User Objects',
    routePath: 'object-store/user/:id?',
    navPath: 'object-store/user',
    parent: 'object-store',
    component: AsyncUserObjectsPage,
  },
  {
    name: 'object-stats',
    title: 'Objects Stats',
    routePath: 'object-store/object-stats/:id?',
    navPath: 'object-store/object-stats',
    parent: 'object-store',
    featureCheck: fs.OBJECT_STORE_STATS,
    component: () => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.OBJECT_STORE_STATS]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <AsyncUserObjectsStatsPage />
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'pooled-objects',
    title: 'Pooled Objects',
    routePath: 'object-store/pooled-objects/:id?',
    navPath: 'object-store/pooled-objects',
    parent: 'object-store',
    hideIfNotAvailable: true,
    featureCheck: fs.OBJECT_STORE_POOLED_OBJECTS,
    component: () => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.OBJECT_STORE_POOLED_OBJECTS]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <AsyncPooledObjectsPage />
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'object-groups',
    title: 'Object Groups',
    routePath: 'object-store/groups/:id?',
    navPath: 'object-store/groups',
    parent: 'object-store',
    component: AsyncObjectGroupsPage,
    availabilityCheck: SERVICE_NAMES.GROUPS,
  },
];

export default objectStoreEntries;
