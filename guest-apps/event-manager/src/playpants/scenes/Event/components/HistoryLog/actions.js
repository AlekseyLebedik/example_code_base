import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * factory action creator for fetching logs
 */
export const fetchLogs = eventId => createFetch(AT.FETCH_LOGS, eventId);
