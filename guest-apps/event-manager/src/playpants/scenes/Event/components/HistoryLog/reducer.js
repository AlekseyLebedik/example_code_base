import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';

export const reducer = createFetchReducer(AT.FETCH_LOGS);
