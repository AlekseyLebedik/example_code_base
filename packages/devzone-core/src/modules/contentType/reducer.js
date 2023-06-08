import { createFetchReducer, INITIAL_STATE } from '../../helpers/reducers';

import { CONTENT_TYPES_PREFIX } from './actions';

export default createFetchReducer(CONTENT_TYPES_PREFIX);

export { INITIAL_STATE };
