// TODO: pass up schedule story related middleware
import { currentProjectSelector } from 'playpants/components/App/selectors';
import {
  fetchStories,
  updateSchedules,
} from 'playpants/components/App/actions';
import * as scheduleStoryDetailFormAT from './components/ScheduleStoriesDetail/components/Details/components/Fields/actionTypes';
import * as scheduleStoryDetailActionsAT from './components/ScheduleStoriesDetail/components/Details/components/Actions/actionTypes';
import * as scheduleStoryFormDialogAT from './components/ScheduleStoriesSidebar/components/ScheduleStoryFormDialog/actionTypes';
import {
  searchScheduleStories,
  setSelectedScheduleStory,
  resetSelectedScheduleStory,
  storeSelectedScheduleStory,
} from './actions';

export default store => next => action => {
  const refreshScheduleStories = () => {
    const { id: project } = currentProjectSelector(store.getState());
    store.dispatch(fetchStories({ project }));
    store.dispatch(searchScheduleStories({ project, title_env__gt: 0 }));
  };

  switch (action.type) {
    case `${scheduleStoryDetailFormAT.PATCH_SCHEDULE_STORY}_SUCCESS`:
    case `${scheduleStoryFormDialogAT.PATCH_SCHEDULE_STORY}_SUCCESS`:
      store.dispatch(setSelectedScheduleStory(action.story));
      refreshScheduleStories();
      break;
    case `${scheduleStoryFormDialogAT.CREATE_SCHEDULE_STORY}_SUCCESS`:
      refreshScheduleStories();
      break;
    case `${scheduleStoryDetailActionsAT.DELETE_SCHEDULE_STORY}_UPDATE_SUCCESS`: {
      store.dispatch(storeSelectedScheduleStory({}));
      store.dispatch(resetSelectedScheduleStory());
      refreshScheduleStories();
      break;
    }
    case `${scheduleStoryFormDialogAT.UPLOAD_STORY_SCHEDULE}_SUCCESS`:
    case `${scheduleStoryDetailFormAT.UPLOAD_STORY_SCHEDULE}_SUCCESS`:
      store.dispatch(updateSchedules(action.data));
      break;
    default:
      break;
  }
  next(action);
};
