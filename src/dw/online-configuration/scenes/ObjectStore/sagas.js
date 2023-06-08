import objectGroupsSaga from './ObjectGroups/sagas';
import publisherObjectsSaga from './PublisherObjects/saga';
import ObjectStatSaga from './UserObjectStats/saga';
import userObjectsSaga from './UserObjectsHOC/saga';
import pooledObjectsSaga from './UserPooledObjects/saga';
import commonSaga from './commonSaga';

export default [
  ...userObjectsSaga,
  ...objectGroupsSaga,
  ...publisherObjectsSaga,
  ...pooledObjectsSaga,
  ObjectStatSaga,
  commonSaga,
];
