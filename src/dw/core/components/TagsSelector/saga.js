import { getLoopSaga } from '@demonware/devzone-core/helpers/sagas';

import * as api from 'dw/devzone/services/tags';

import { TAGS_PREFIX } from './constants';

const fetchTagsSaga = getLoopSaga(TAGS_PREFIX, api.fetchTags, api.fetchNext);

export default fetchTagsSaga;
