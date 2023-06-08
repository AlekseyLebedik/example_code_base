import * as actionTypes from './actionTypes';

const actionList = Object.values(actionTypes);

const globalStore = window.globalAppStore || { dispatch: action => action };

export default function middleware() {
  return next => action => {
    if (action.type) {
      if (actionList.includes(action.type)) {
        globalStore.dispatch(action);
      }
    }

    return next(action);
  };
}
