import ABTestFormSaga from './ABTestForm/saga';
import UpdateSaga from './Update/saga';
import ABTestGroupsSaga from './ABTestGroups/sagas';

export default [ABTestFormSaga, UpdateSaga, ...ABTestGroupsSaga];
