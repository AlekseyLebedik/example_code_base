import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import { GROUPS_DETAILS_PREFIX } from './constants';

const middleware = store => next => action => {
  switch (action.type) {
    case `${GROUPS_DETAILS_PREFIX}_REPLACE_USERS`:
      store.dispatch(GlobalProgressActions.start());
      break;
    case `${GROUPS_DETAILS_PREFIX}_REPLACE_USERS_SUCCESS`:
      store.dispatch(GlobalProgressActions.done());
      break;
    default:
      break;
  }
  next(action);
};

export default middleware;
