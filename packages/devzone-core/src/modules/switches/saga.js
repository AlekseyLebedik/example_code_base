import { getLoopSaga } from '../../helpers/sagas';
import { fetchNextUrl } from '../../services/general';
import { getFeatureSwitches as APIFetchFeatureSwitches } from '../../services/switches';

import { FEATURE_SWITCHES_LIST_PREFIX } from '../../constants';

const fetchFeatureSwitchesSaga = getLoopSaga(
  FEATURE_SWITCHES_LIST_PREFIX,
  APIFetchFeatureSwitches,
  fetchNextUrl
);

export default fetchFeatureSwitchesSaga;
