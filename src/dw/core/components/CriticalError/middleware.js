import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';

import { CRITICAL_ERROR_SHOW } from './actionTypes';

export const middleware = store => next => action => {
  switch (action.type) {
    case CRITICAL_ERROR_SHOW:
      store.dispatch(GlobalProgressActions.done());
      break;
    default:
      break;
  }
  next(action);
};
