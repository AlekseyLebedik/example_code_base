import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const fetchConflicts = eventId =>
  createFetch(AT.FETCH_CONFLICTS, eventId);

export const searchConflicts = query => ({
  type: AT.SEARCH_CONFLICTS,
  query,
});

export const setConflictType = conflictType => ({
  type: AT.SET_CONFLICT_TYPE,
  conflictType,
});
