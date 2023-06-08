import {
  uploadSchedule,
  patchStory,
  setSelectedSchedule as createSetSelectedSchedule,
} from 'playpants/components/StoryFormComponents/actions';
import * as AT from './actionTypes';

export const patchScheduleStory = (params, form) =>
  patchStory(AT.PATCH_SCHEDULE_STORY, params, form);
export const uploadStorySchedule = params =>
  uploadSchedule(AT.UPLOAD_STORY_SCHEDULE, params);
export const setSelectedSchedule = (form, schedule) =>
  createSetSelectedSchedule(AT.SET_SELECTED_SCHEDULE, form, schedule);
