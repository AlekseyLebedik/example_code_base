/**
 * Triggers story creation
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} params       - Story body param
 * @param {string} form         - Form ID
 * @param {function} redirect   - Callback function to redirect after successful creation
 */
export const createStory = (actionPrefix, params, form, redirect) => ({
  type: actionPrefix,
  params,
  form,
  redirect,
});

/**
 * Triggers if story creation is successful
 * @param {string} actionPrefix - Relevant action prefix
 */
export const createStorySuccess = actionPrefix => ({
  type: `${actionPrefix}_SUCCESS`,
});

/**
 * Triggers if story creation failed
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} error        - Error from unsuccessful story creation
 */
export const createStoryFailed = (actionPrefix, error) => ({
  type: `${actionPrefix}_FAILED`,
  error,
});

/**
 * Triggers story patch/update
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} params       - Field to update on story
 * @param {string} form         - Form ID
 */
export const patchStory = (actionPrefix, params, form) => ({
  type: actionPrefix,
  form,
  params,
});

/**
 * Triggers if story patch/update is successful
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} story        - Updated story
 */
export const patchStorySuccess = (actionPrefix, story) => ({
  type: `${actionPrefix}_SUCCESS`,
  story,
});

/**
 * Triggers is story patch/update failed
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} error        - Error from unsuccessful story patch/update
 */
export const patchStoryFailed = (actionPrefix, error) => ({
  type: `${actionPrefix}_FAILED`,
  error,
});

/**
 * Triggers schedule upload
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} params       - Schedule body param
 */
export const uploadSchedule = (actionPrefix, params) => ({
  type: actionPrefix,
  ...params,
});

/**
 * Triggers if schedule upload is successful
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} data         - The uploaded schedule data
 */
export const uploadScheduleSuccess = (actionPrefix, data) => ({
  type: `${actionPrefix}_SUCCESS`,
  data,
});

/**
 * Triggers if schedule upload failed
 * @param {string} actionPrefix - Relevant action prefix
 * @param {Object} error        - Error from unsuccessful schedule upload
 */
export const uploadScheduleFailed = (actionPrefix, error) => ({
  type: `${actionPrefix}_FAILED`,
  error,
});

/**
 * Triggers if schedule is selected in advanced schedule search
 * @param {string} actionPrefix - Relevant action prefix
 * @param {string} form         - Form name
 * @param {Object} schedule     - Schedule selected
 */
export const setSelectedSchedule = (actionPrefix, form, schedule) => ({
  type: actionPrefix,
  form,
  schedule,
});
