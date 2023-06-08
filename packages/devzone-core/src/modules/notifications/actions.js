import moment from 'moment';
import { createFetch } from '../../helpers/actions';

export const FETCH_RELEASE_NOTES = 'devzone/FETCH_RELEASE_NOTES';

export const fetchReleaseNotes = () => createFetch(FETCH_RELEASE_NOTES);

export const FETCH_MAINTENANCE = 'devzone/FETCH_MAINTENANCE';
export const fetchMaintenance = () =>
  createFetch(FETCH_MAINTENANCE, null, {
    endDate: moment.utc(new Date()).format('YYYY-MM-DD HH:mm'),
  });

export const FETCH_CRITICAL_EVENTS = 'devzone/FETCH_CRITICAL_EVENTS';
const CRITICAL_EVENTS_DAYS = 10;
export const fetchCriticalEvents = () =>
  createFetch(FETCH_CRITICAL_EVENTS, null, {
    endDate: moment().add(CRITICAL_EVENTS_DAYS, 'days').unix(),
  });
