import { TYPE_SUFFIXES, actionTypes } from './constants';
import * as actions from './actions';

const actionList = Object.values(actionTypes);

const globalStore = window.globalAppStore || { dispatch: action => action };

export default function middleware({ dispatch }) {
  const [PENDING, FULFILLED, REJECTED] = TYPE_SUFFIXES;

  const isPending = new RegExp(`${PENDING}$`, 'g');
  const isFulfilled = new RegExp(`${FULFILLED}$`, 'g');
  const isRejected = new RegExp(`${REJECTED}$`, 'g');

  return next => action => {
    if (action.type) {
      if (actionList.includes(action.type)) {
        globalStore.dispatch(action);
      }
      if (action.type.match(isPending)) {
        dispatch(actions.start());
      } else if (
        action.type.match(isFulfilled) ||
        action.type.match(isRejected)
      ) {
        dispatch(actions.done());
      }
    }

    return next(action);
  };
}
