import { stories as api } from 'playpants/services';
import {
  createStorySaga,
  patchStorySaga,
} from 'playpants/components/StoryFormComponents/sagas';
import * as AT from './actionTypes';

export default [
  createStorySaga(AT.CREATE_GROUP_STORY, api.createStory),
  patchStorySaga(AT.PATCH_GROUP_STORY, api.patchStory),
];
