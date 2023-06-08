import * as eventActions from './actionTypes';
import * as activityActions from './components/Activities/actionTypes';
import * as pyscriptActions from './components/Activities/components/ActivityDetails/components/PyScriptDetails/actionTypes';
import * as fileActions from './components/Activities/components/ActivityDetails/components/FileStorage/actionTypes';
import * as pubObjectActions from './components/Activities/components/ActivityDetails/components/PublisherObjectsDetails/actionTypes';
import { fetchEvent, fetchDiscussion } from './actions';
import { eventDataSelector } from './selectors';

export default store => next => action => {
  switch (action.type) {
    case `${eventActions.CREATE_COMMENT}_UPDATE_SUCCESS`: {
      const { id } = eventDataSelector(store.getState());
      store.dispatch(fetchDiscussion(id));
      break;
    }
    case `${eventActions.UPDATE_AUTHS}_UPDATE_SUCCESS`:
    case activityActions.CREATE_ACTIVITY_SUCCESS:
    case activityActions.DELETE_ACTIVITY_SUCCESS:
    case activityActions.UPDATE_ACTIVITY_SUCCESS:
    case pyscriptActions.UPDATE_SCHEMA_MODEL_SUCCESS:
    case pubObjectActions.UPLOAD_OBJECT_SUCCESS:
    case pubObjectActions.DELETE_OBJECT_SUCCESS:
    case fileActions.UPLOAD_FILE_SUCCESS: {
      const { id } = eventDataSelector(store.getState());
      store.dispatch(fetchEvent(id));
      break;
    }
    default:
      break;
  }
  next(action);
};
