import { CONTENT_TYPES, OBJECT_PERMISSIONS } from '../constants';

export const GROUPS_LIST_PREFIX = 'permission-management/GROUPS_LIST';

export const GROUPS_PREFIX = 'permission-management/GROUPS/';

export const GROUP_USERS_LIST_PREFIX = 'permission-management/GROUP_USERS_LIST';

export const CONTENT_TYPES_PREFIX = `${GROUPS_PREFIX}${CONTENT_TYPES}`;

export const CONTENT_TYPES_DETAILS_PREFIX = `${GROUPS_PREFIX}${CONTENT_TYPES}_DETAILS_FETCH`;

export const OBJECT_PERMISSIONS_PREFIX = `${GROUPS_PREFIX}${OBJECT_PERMISSIONS}`;

export const GROUP_USERS_PREFIX = 'permission-management/GROUP_USERS';

export const FORM_NAME = 'GroupsForm';
export const CREATE_GROUP_FORM_NAME = 'CreateGroupForm';

export const RESOURCE_TYPE = 'company-groups';

export const DELETE_PERMISSION_GROUP = `${GROUPS_LIST_PREFIX}_DELETE_GROUP`;
