import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import * as gamertagManagementAT from 'playpants/components/GamertagManagement/actionTypes';
import { setLocalStorageHistory } from 'playpants/helpers/localStorage';
import { TIMEWARP_LS_KEY } from './constants';
import scheduleStoriesMiddleware from './components/ScheduleStories/middleware';

const gamertagManagementMiddleware = store => next => action => {
  switch (action.type) {
    case `${gamertagManagementAT.DELETE_GROUP}_UPDATE_SUCCESS`: {
      const currentProjectId = currentProjectIdSelector(store.getState());
      setLocalStorageHistory(
        currentProjectId,
        TIMEWARP_LS_KEY,
        'selectedGroup',
        null
      );
      break;
    }
    default:
      break;
  }
  next(action);
};

export default [scheduleStoriesMiddleware, gamertagManagementMiddleware];
