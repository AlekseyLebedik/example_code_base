import React from 'react';
import AsyncComponent from 'dw/core/components/AsyncComponent';
import GuestApp from 'dw/core/components/GuestApp';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';

const AsyncOnlineConfiguration = AsyncComponent(() =>
  import(
    /* webpackChunkName: "OnlineConfiguration" */ 'dw/online-configuration'
  )
);
const AsyncPermissionManagement = AsyncComponent(() =>
  import(
    /* webpackChunkName: "PermissionManagement" */ 'dw/permission-management'
  )
);
const AsyncPlayerTooling = AsyncComponent(() =>
  import(/* webpackChunkName: "PlayerTooling" */ 'dw/player-tooling')
);
const AsyncClans = AsyncComponent(() =>
  import(/* webpackChunkName: "Clans" */ 'dw/clans')
);
const AsyncAuditLogs = AsyncComponent(() =>
  import(/* webpackChunkName: "AuditLogs" */ 'dw/audit')
);
const AsyncDevzoneDocs = AsyncComponent(() =>
  import(/* webpackChunkName: "DevzoneDocs" */ 'dw/devzone-docs')
);

const ABTestingGuestApp = () => <GuestApp name="ABTESTING" />;

const EventManagerGuestApp = () => <GuestApp name="EVENT_MANAGER" />;
const TAOnlineGuestApp = () => <GuestApp name="TA_ONLINE" />;
const MAOnlineGuestApp = () => <GuestApp name="MA_ONLINE" />;
const ForgeGuestApp = () => <GuestApp name="FORGE" />;
const SledgeGuestApp = () => <GuestApp name="SLEDGE" />;
const RavenGuestApp = () => <GuestApp name="RAVEN" />;

const getRoutes = (
  hasFeatureSwitchesAccessFunc,
  isAdminOrStaff,
  hasEditMembershipsPermission
) => [
  {
    name: 'Online Configuration',
    icon: 'videogame_asset',
    path: '/online-configuration',
    component: AsyncOnlineConfiguration,
  },
  ...(hasFeatureSwitchesAccessFunc([fs.TA_ONLINE_ENABLED], false)
    ? [
        {
          name: 'TA-Online',
          icon: 'ta-icon-TAOnlineicon',
          path: '/ta-online',
          component: TAOnlineGuestApp,
        },
      ]
    : []),
  ...(hasFeatureSwitchesAccessFunc([fs.MA_ONLINE_ENABLED], false)
    ? [
        {
          name: 'MA-Online',
          path: '/ma-online',
          component: MAOnlineGuestApp,
        },
      ]
    : []),
  ...(hasFeatureSwitchesAccessFunc([fs.FORGE_ENABLED], false)
    ? [
        {
          name: 'Forge',
          path: '/forge',
          component: ForgeGuestApp,
        },
      ]
    : []),
  ...(hasFeatureSwitchesAccessFunc([fs.SLEDGE_ENABLED], false)
    ? [
        {
          name: 'Sledge',
          path: '/sledge',
          component: SledgeGuestApp,
        },
      ]
    : []),
  ...(hasFeatureSwitchesAccessFunc([fs.RAVEN_ENABLED], false)
    ? [
        {
          name: 'Raven',
          path: '/raven',
          component: RavenGuestApp,
        },
      ]
    : []),
  ...(hasFeatureSwitchesAccessFunc([fs.PLAYER_TOOLING_ENABLED], false)
    ? [
        {
          name: 'Player',
          icon: 'people',
          path: '/player',
          component: AsyncPlayerTooling,
        },
      ]
    : []),
  ...(hasFeatureSwitchesAccessFunc([fs.CLANS_ENABLED], false)
    ? [
        {
          name: 'Clans',
          path: '/clans',
          component: AsyncClans,
        },
      ]
    : []),
  {
    name: 'A/B Testing',
    icon: 'ab-icon-DW-ABTesting',
    path: '/abtesting',
    component: ABTestingGuestApp,
  },
  {
    name: 'Audit Logs',
    icon: 'al-icon-DW-Audit-Log',
    path: '/audit',
    component: AsyncAuditLogs,
    disabled: !hasFeatureSwitchesAccessFunc(fs.AUDIT_LOGS_ENABLED),
    loading: hasFeatureSwitchesAccessFunc(fs.AUDIT_LOGS_ENABLED) === null,
  },
  {
    name: 'Event Manager',
    icon: 'em-icon-v1-DW-EventManager',
    path: '/event-manager',
    component: EventManagerGuestApp,
  },
  {
    name: 'Devzone Docs',
    icon: 'live-help',
    path: '/docs',
    component: AsyncDevzoneDocs,
  },
  ...(isAdminOrStaff || hasEditMembershipsPermission
    ? [
        {
          name: 'Permission Management',
          icon: 'lock',
          path: '/permission-management',
          component: AsyncPermissionManagement,
        },
      ]
    : []),
  ...(process.env.NODE_ENV === 'production'
    ? []
    : [
        {
          name: 'Live Ops Reporting (coming soon)',
          icon: 'multiline_chart',
          path: '/reporting-live-ops',
          disabled: true,
        },
      ]),
];
export default getRoutes;
