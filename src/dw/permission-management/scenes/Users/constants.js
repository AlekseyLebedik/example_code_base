import { CONTENT_TYPES, OBJECT_PERMISSIONS } from '../constants';

export const USERS_LIST_PREFIX = 'permission-management/USERS_LIST';
export const AVAILABLE_GROUPS_LIST_PREFIX =
  'permission-management/AVAILABLE_GROUPS_LIST';
export const ASSIGNED_GROUPS_LIST_PREFIX =
  'permission-management/ASSIGNED_GROUPS_LIST';

export const USERS_PREFIX = 'permission-management/USERS/';

export const GROUP_TAB = 'group';
export const ADVANCED_TAB = 'advanced';
export const FEATURE_FLAGS_TAB = 'feature flags';
export const EXPLAINER_TAB = 'permission helper';

export const PERMISSION_GROUPS_FORM_NAME =
  'permission-management__create-permission-groups-form';

export const PERMISSION_ADVANCED_FORM_NAME =
  'permission-management__create-permission-advanced-form';

export const CONTENT_TYPES_PREFIX = `${USERS_PREFIX}${CONTENT_TYPES}`;

export const CONTENT_TYPES_DETAILS_PREFIX = `${USERS_PREFIX}${CONTENT_TYPES}_DETAILS_FETCH`;

export const COMPANIES_LIST_PREFIX = `${USERS_PREFIX}/companies`;

export const OBJECT_PERMISSIONS_PREFIX = `${USERS_PREFIX}${OBJECT_PERMISSIONS}`;

export const RESOURCE_TYPE = 'users';

export const USER_MEMBERSHIPS_PREFIX = `${USERS_PREFIX}/memberships`;
