import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Sets a given filter type to a given disabled value
 * @param {string} filterType - The filter type to disable
 * @param {boolean} disabled   - The disabled value
 */
export const setFilterPropsDisabled = (filterType, disabled) => ({
  type: AT.SET_FILTER_PROPS_DISABLED,
  filterType,
  disabled,
});

/**
 * Exports the events
 * @param {Object} params - Query params
 */
export const exportEvents = params =>
  createFetch(AT.EXPORT_EVENTS, null, params);

/**
 * Updates the event
 * @param {number} event      - The event to update
 * @param {Object} data         - The fields to update
 * @param {string} reducerGroup - The reducer group the updated event belongs to
 * @param {string} isDragDrop   - If true, goes ahead and replaces updated event
 *                                in front end, and then replaces with original version
 *                                if there's an error
 */
export const updateEvent = (event, data, reducerGroup, isDragDrop = false) => ({
  type: AT.UPDATE_EVENT,
  event,
  data,
  reducerGroup,
  isDragDrop,
});

/**
 * Successful event update
 * @param {Object} event        - The updated event
 * @param {string} reducerGroup - The reducer group the updated event belongs to

 */
export const updateEventSuccess = (event, reducerGroup) => ({
  type: AT.UPDATE_EVENT_SUCCESS,
  event,
  reducerGroup,
});

/**
 * Failed event update
 * @param {Object} event        - The original event
 * @param {string} reducerGroup - The reducer group the updated event belongs to
 * @param {string} isDragDrop   - If true, goes ahead and replaces updated event
 *                                in front end, and then replaces with original version
 *                                if there's an error
 */
export const updateEventFailed = (
  event,
  reducerGroup,
  isDragDrop = false,
  error = null
) => ({
  type: AT.UPDATE_EVENT_FAILED,
  event,
  reducerGroup,
  isDragDrop,
  error,
});

/**
 * Stores the event data before opening the modal
 * @param {Object} eventData   - The event data
 * @param {Function} openModal - Callback to open modal
 */
export const storeThenOpenEventDetailModal = (eventData, openModal) => ({
  type: AT.STORE_THEN_OPEN_EVENT_DETAIL_MODAL,
  eventData,
  openModal,
});

/**
 * Stores the event data
 * @param {Object} eventData - The event data
 */
export const storeEvent = eventData => ({
  type: AT.STORE_EVENT,
  eventData,
});

/**
 * Stores the ab test data before opening the modal
 * @param {Object} abTestData  - The A/B test data
 * @param {Function} openModal - Callback to open modal
 */
export const storeThenOpenABTestDetailModal = (abTestData, openModal) => ({
  type: AT.STORE_THEN_OPEN_AB_TEST_DETAIL_MODAL,
  abTestData,
  openModal,
});

/**
 * Stores the ab test data
 * @param {Object} abTestData - The A/B test data
 */
export const storeABTest = abTestData => ({
  type: AT.STORE_AB_TEST,
  abTestData,
});

/**
 * Stores the EXPY test data before opening the modal
 * @param {Object} expyTestData  - The EXPY test data
 * @param {Function} openModal - Callback to open modal
 */
export const storeThenOpenExpyTestDetailModal = (expyTestData, openModal) => ({
  type: AT.STORE_THEN_OPEN_EXPY_TEST_DETAIL_MODAL,
  expyTestData,
  openModal,
});

/**
 * Stores the EXPY test data
 * @param {Object} expyTestData - The EXPY test data
 */
export const storeExpyTest = expyTestData => ({
  type: AT.STORE_EXPY_TEST,
  expyTestData,
});

/**
 * Stores the demonware event data before opening the modal
 * @param {Object} data  - The demonware event data
 * @param {Function} openModal - Callback to open modal
 */
export const storeThenOpenDemonwareDetailModal = (data, openModal) => ({
  type: AT.STORE_THEN_OPEN_DEMONWARE_DETAIL_MODAL,
  data,
  openModal,
});

/**
 * Stores the demonware event data
 * @param {Object} data - The demonware event data
 */
export const storeDemonwareEvent = data => ({
  type: AT.STORE_DEMONWARE_EVENT,
  data,
});

/**
 * Stores the external event data before opening the modal
 * @param {Object} data  - The external event data
 * @param {Function} openModal - Callback to open modal
 */
export const storeThenOpenExternalDetailModal = (data, openModal) => ({
  type: AT.STORE_THEN_OPEN_EXTERNAL_DETAIL_MODAL,
  data,
  openModal,
});

/**
 * Stores the external event data
 * @param {Object} data - The external event data
 */
export const storeExternalEvent = data => ({
  type: AT.STORE_EXTERNAL_EVENT,
  data,
});

/**
 * Fetch event details
 * @param {*} param0
 */
export const fetchEventDetails = event => ({
  type: AT.FETCH_EVENT_DETAILS,
  event,
});

/**
 * Return event data if fetched successfully
 * @param {*} eventData
 */
export const fetchEventDetailsSuccess = eventData => ({
  type: AT.FETCH_EVENT_DETAILS_SUCCESS,
  eventData,
});

/**
 * Return error if fetch unsuccessful
 * @param {*} error
 */
export const fetchEventDetailsFailed = error => ({
  type: AT.FETCH_EVENT_DETAILS_FAILED,
  error,
});

/**
 * Resets event fetch details data
 */
export const clearEventFetchDetails = () => ({
  type: AT.RESET_EVENT_FETCH_DETAILS,
});

/**
 * Fetches the event by id
 * @param {number} sourceEventId - ID of the source event
 */
export const fetchEventBySourceEventId = sourceEventId =>
  createFetch(AT.FETCH_EVENT_BY_SOURCE_EVENT_ID, sourceEventId);

/**
 * Resets reducers 'selectedTemplate' and 'templateSourceEvent'
 */
export const resetCreateDialog = () => ({
  type: AT.RESET,
});

/**
 * Creates an event
 * @param {string} baseUrl    - Base of the URL to redirect to on successful creation
 * @param {Object} data       - Data used to create an event
 * @param {Object} history    - react-router history object
 * @param {string} formName   - Name of the create event form
 * @param {Function} onCancel - Callback to cancel
 */
export const createEvent = (baseUrl, data, history, formName, onCancel) => ({
  type: AT.CREATE_EVENT,
  baseUrl,
  data,
  history,
  formName,
  onCancel,
});

/**
 * Failed event creation
 * @param {*} error - Error response
 */
export const createEventFailed = error => dispatch =>
  dispatch(nonCriticalHTTPError(error));

/**
 * Updates the create form default dates
 * @param {number} defaultStartDate - Start date to default to
 * @param {number} defaultEndDate   - End date to default to
 * @param {boolean} isRange         - Determine if in range
 */
export const updateCreateFormDefaultDate = (
  defaultStartDate,
  defaultEndDate,
  isRange
) => ({
  type: AT.UPDATE_CREATE_FORM_DEFAULT_DATE,
  defaultStartDate,
  defaultEndDate,
  isRange,
});

/**
 * Sets the selected template
 * @param {Object} selectedTemplate - The selected template
 */
export const setSelectedTemplate = selectedTemplate => ({
  type: AT.SET_SELECTED_EVENT_TEMPLATE,
  selectedTemplate,
});

/**
 * Appends the paginated results from fetching
 * @param {Object} params - Relevant fetch params
 */
export const fetchAppend = params => ({
  type: AT.FETCH_APPEND,
  ...params,
});

/**
 * Checks if there exists an event stories
 * @param {number|string} currentProjectId - The id of the current project
 */
export const checkStoriesFilterDisabled = currentProjectId => ({
  type: AT.CHECK_STORIES_FILTER_DISABLED,
  params: {
    story__gt: 0,
    project: currentProjectId,
  },
});

/**
 * Successfully checked the existance of event stories
 */
export const checkStoriesFilterDisabledSuccess = () => ({
  type: AT.CHECK_STORIES_FILTER_DISABLED_SUCCESS,
});

/**
 * Failed to check the existance of event stories
 * @param {Object} error - The HTTP error response
 */
export const checkStoriesFilterDisabledFailed = error => ({
  type: AT.CHECK_STORIES_FILTER_DISABLED_FAILED,
  error,
});
