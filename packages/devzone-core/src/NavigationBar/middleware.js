import { actions } from './reducer';

const CHANGE_TITLE_ENV_ACTION_TYPE = 'TITLE_SELECTOR.CHANGE_TITLE';
const CHANGE_PROJECT_ACTION_TYPE = 'PROJECT_SELECTOR.CHANGE_PROJECT';

const globalStore = window.globalAppStore || { dispatch: action => action };

export default function middleware() {
  return next => action => {
    if (action.type) {
      if (action.type === CHANGE_TITLE_ENV_ACTION_TYPE) {
        globalStore.dispatch(actions.setTitleEnv(action.environment));
      }
      if (action.type === CHANGE_PROJECT_ACTION_TYPE) {
        globalStore.dispatch(actions.setProject(action.project));
      }
    }

    return next(action);
  };
}
