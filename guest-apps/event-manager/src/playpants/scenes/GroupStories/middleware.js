import { currentProjectSelector } from 'playpants/components/App/selectors';
import { fetchStories } from 'playpants/components/App/actions';
import * as groupStoryFormDialogAT from './components/GroupStoriesSidebar/components/GroupStoryFormDialog/actionTypes';
import * as groupStoriesAT from './actionTypes';
import { searchGroupStories } from './actions';

export default store => next => action => {
  const refreshStories = () => {
    const { id: project } = currentProjectSelector(store.getState());
    store.dispatch(fetchStories({ project }));
    store.dispatch(
      searchGroupStories({
        project,
        schedule: 'null',
      })
    );
  };
  switch (action.type) {
    case `${groupStoryFormDialogAT.PATCH_GROUP_STORY}_SUCCESS`:
    case `${groupStoryFormDialogAT.CREATE_GROUP_STORY}_SUCCESS`:
    case `${groupStoriesAT.DELETE_GROUP_STORY}_UPDATE_SUCCESS`: {
      refreshStories();
      break;
    }
    default:
      break;
  }
  next(action);
};
