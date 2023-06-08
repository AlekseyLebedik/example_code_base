import { createFetchReducer, INITIAL_STATE } from '../../helpers/reducers';

import {
  FETCH_RELEASE_NOTES,
  FETCH_MAINTENANCE,
  FETCH_CRITICAL_EVENTS,
} from './actions';

export const releaseNotesReducer = createFetchReducer(FETCH_RELEASE_NOTES);

export const maintenanceReducer = createFetchReducer(FETCH_MAINTENANCE);

export const criticalEventsReducer = createFetchReducer(FETCH_CRITICAL_EVENTS);

export { INITIAL_STATE };
