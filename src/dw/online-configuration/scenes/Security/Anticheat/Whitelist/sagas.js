import connectionLogsSagas from './ConnectionLogs/sagas';
import ipControlSaga from './IPControl/saga';

export default [...connectionLogsSagas, ipControlSaga];
