import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { handleLoadSaga } from 'playpants/components/FeedbackWrapper/sagas';
import { event as api } from 'playpants/services';
import * as AT from './actionTypes';

const handleLoadingHistorySagas = handleLoadSaga([`${AT.FETCH_LOGS}_FETCH`]);

export default [
  handleLoadingHistorySagas,
  getSaga(AT.FETCH_LOGS, api.fetchLogs, 'results'),
];
