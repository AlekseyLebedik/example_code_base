import { CHANGE_TITLE } from 'dw/core/components/TitleSelector/actionTypes';
import {
  fetchTitleEnvironment,
  fetchEnvironmentServicesSuccess,
} from './actions';

const middleware = store => next => action => {
  const env = store.getState().Components.App.currentTitleEnv;
  switch (action.type) {
    case CHANGE_TITLE:
      if (env) {
        store.dispatch(fetchEnvironmentServicesSuccess(env));
      }
      store.dispatch(fetchTitleEnvironment(action.environment));
      break;
    default:
      break;
  }

  next(action);
};

export default middleware;
