import { createFetch } from '@demonware/devzone-core/helpers/actions';
import {
  uploadSchedule,
  createStory,
  patchStory,
  setSelectedSchedule as createSetSelectedSchedule,
} from 'playpants/components/StoryFormComponents/actions';
import * as AT from './actionTypes';

export const setSelectedSchedule = (form, schedule) =>
  createSetSelectedSchedule(AT.SET_SELECTED_SCHEDULE, form, schedule);
export const createScheduleStory = (params, form, redirect) =>
  createStory(AT.CREATE_SCHEDULE_STORY, params, form, redirect);
export const patchScheduleStory = (params, form) =>
  patchStory(AT.PATCH_SCHEDULE_STORY, params, form);
export const uploadStorySchedule = params =>
  uploadSchedule(AT.UPLOAD_STORY_SCHEDULE, params);
export const fetchContexts = (titleId, env) =>
  createFetch(AT.FETCH_CONTEXTS, titleId, { env, contextType: 'ObjectStore' });
export const fetchCategories = (titleId, env, context) =>
  createFetch(AT.FETCH_CATEGORIES, titleId, { env, context });
export const setContextFieldProps = props => ({
  type: AT.SET_CONTEXT_FIELD_PROPS,
  props,
});
export const resetContext = () => ({
  type: AT.RESET_CONTEXT,
});
