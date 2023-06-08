import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';

export const prefix = 'playpants/GAMERTAG_DIALOG';

export const FETCH_GROUP_TIMEWARP_SETTINGS = `${prefix}.GROUP_TIMEWARP_SETTINGS`;
export const UPDATE_GROUP_TIMEWARP_SETTINGS = `${prefix}.UPDATE_GROUP_TIMEWARP_SETTINGS`;

export const fetchGroupTimewarpSettings = id =>
  createFetch(FETCH_GROUP_TIMEWARP_SETTINGS, id);

export const updateGroupTimewarpSettings = (groupId, params) =>
  createUpdate(UPDATE_GROUP_TIMEWARP_SETTINGS, groupId, params);
