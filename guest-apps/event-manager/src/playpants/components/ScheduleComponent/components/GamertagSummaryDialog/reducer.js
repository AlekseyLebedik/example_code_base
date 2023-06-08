import reduceReducers from 'reduce-reducers';
import {
  createFetchReducer,
  createUpdateReducer,
} from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actions';

const timewarpSettingsReducer = createFetchReducer(
  AT.FETCH_GROUP_TIMEWARP_SETTINGS
);
const updatetimewarpSettingsReducer = createUpdateReducer(
  AT.UPDATE_GROUP_TIMEWARP_SETTINGS
);

export default reduceReducers(
  timewarpSettingsReducer,
  updatetimewarpSettingsReducer
);
