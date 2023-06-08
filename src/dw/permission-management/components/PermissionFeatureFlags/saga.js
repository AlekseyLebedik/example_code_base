import * as API from 'dw/permission-management/services/explainerflags';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import * as AT from './actionTypes';

const fetchPermFeatureFlagsSaga = getSaga(AT.FEATURE_FLAG_PERMISSIONS, params =>
  API.getFeatureFlag(params)
);

export default fetchPermFeatureFlagsSaga;
