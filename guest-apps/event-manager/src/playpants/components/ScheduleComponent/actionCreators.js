import { SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS } from './constants';

/**
 * Fetches events that are of type 'event-manager'
 * @param {Object} params - Event query params
 */
export const fetchEventManagerEvents = type => params => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EVENT_MANAGER,
  params,
});

/**
 * Successful fetch of events of type 'event-manager'
 */
export const fetchEventManagerEventsSuccess = type => () => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EVENT_MANAGER,
});

/**
 * Failed fetch of events of type 'event-manager'
 * @param {*} error - Error response
 */
export const fetchEventManagerEventsFailed = type => error => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EVENT_MANAGER,
  error,
});

/**
 * Fetches externalEvents that are of type 'holiday', 'video-games', etc.
 * @param {Object} params - Event query params
 */
export const fetchExternalEvents = type => params => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EXTERNAL,
  params,
});

/**
 * Successful fetch of externalEvents
 */
export const fetchExternalEventsSuccess = type => data => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EXTERNAL,
  data,
});

/**
 * Failed fetch of externalEvents
 * @param {*} error - Error response
 */
export const fetchExternalEventsFailed = type => error => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EXTERNAL,
  error,
});

/**
 * Fetches events that are not of type 'event-manager'
 * @param {Object} params - Event query params
 */
export const fetchInformationalEvents = type => params => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.INFORMATIONAL,
  params,
});

/**
 * Successful fetch of events not of type 'event-manager'
 */
export const fetchInformationalEventsSuccess = type => () => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.INFORMATIONAL,
});

/**
 * Failed fetch of events not of type 'event-manager'
 * @param {*} error - Error response
 */
export const fetchInformationalEventsFailed = type => error => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.INFORMATIONAL,
  error,
});

/**
 * Fetches events from demonware admin
 * @param {Object} params - Event query params
 */
export const fetchDemonwareEvents = type => params => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.DEMONWARE,
  params,
});

/**
 * Successful fetch of events from demonware admin'
 */
export const fetchDemonwareEventsSuccess = type => data => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.DEMONWARE,
  data,
});

/**
 * Failed fetch of events from demonware admin
 * @param {*} error - Error response
 */
export const fetchDemonwareEventsFailed = type => error => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.DEMONWARE,
  error,
});

/**
 * Fetches AB tests
 */
export const fetchABTests = type => () => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.AB_TESTING,
});

/**
 * Successful AB tests fetch
 * @param {Object[]} data - List of AB tests
 */
export const fetchABTestsSuccess = type => data => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.AB_TESTING,
  data,
});

/**
 * Failed AB tests fetch
 * @param {*} error - Error response
 */
export const fetchABTestsFailed = type => error => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.AB_TESTING,
  error: error.toString(),
});

/**
 * Fetches EXPY tests
 */
export const fetchExpyTests = type => () => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EXPY_TESTING,
});

/**
 * Successful EXPY tests fetch
 * @param {Object[]} data - List of EXPY tests
 */
export const fetchExpyTestsSuccess = type => data => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EXPY_TESTING,
  data,
});

/**
 * Failed EXPY tests fetch
 * @param {*} error - Error response
 */
export const fetchExpyTestsFailed = type => error => ({
  type,
  reducerGroup: SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EXPY_TESTING,
  error: error.toString(),
});
