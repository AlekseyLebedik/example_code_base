import aclSagas from './ACL/sagas';
import anticheatSagas from './Anticheat/sagas';

export default [...anticheatSagas, ...aclSagas];
