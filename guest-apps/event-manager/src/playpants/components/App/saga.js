import { getSaga, getLoopSaga } from '@demonware/devzone-core/helpers/sagas';
import { fetchNextUrl } from '@demonware/devzone-core/services/general';
import {
  projectSettings as projectSettingsApi,
  templates as templateApi,
  stories as storiesApi,
} from 'playpants/services';
import * as AT from './actionTypes';
import projectSelectorSaga from './components/ProjectSelector/saga';

export default [
  getSaga(
    AT.FETCH_PROJECT_SETTINGS,
    projectSettingsApi.fetchProjectSettings,
    'results'
  ),
  getSaga(AT.FETCH_TEMPLATES, templateApi.fetchTemplates, 'results'),
  getSaga(AT.FETCH_STORIES, storiesApi.fetchStories, 'results'),
  getLoopSaga(
    AT.FETCH_SCHEDULES,
    storiesApi.fetchSchedules,
    fetchNextUrl,
    'results'
  ),
  projectSelectorSaga,
];
