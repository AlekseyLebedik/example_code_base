import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const fetchUsersListReducer = createFetchReducer(AT.FEATURE_FLAG_PERMISSIONS);

export default fetchUsersListReducer;
