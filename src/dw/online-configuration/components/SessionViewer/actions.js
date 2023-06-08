import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { ACTION_TYPE_PREFIX } from './constants';

export function loadDetails(ids) {
  return createFetch(ACTION_TYPE_PREFIX, null, {
    id: ids.join(','),
  });
}

export function loadDetailsSuccess(payload, ids) {
  let data = payload.data.map(({ userID, userName }) => ({
    [userID]: userName,
  }));
  data = data.length > 0 ? Object.assign(...data) : {};
  ids.forEach(id => {
    if (!data[id]) data[id] = 'n/a';
  });
  return {
    type: `${ACTION_TYPE_PREFIX}_FETCH_SUCCESS`,
    data,
  };
}
