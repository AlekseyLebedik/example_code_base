import {
  createStory,
  patchStory,
} from 'playpants/components/StoryFormComponents/actions';
import * as AT from './actionTypes';

export const createGroupStory = (params, form, redirect) =>
  createStory(AT.CREATE_GROUP_STORY, params, form, redirect);
export const patchGroupStory = (params, form) =>
  patchStory(AT.PATCH_GROUP_STORY, params, form);
