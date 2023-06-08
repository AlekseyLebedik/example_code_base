import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import { event as api } from 'playpants/services';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import * as AT from './actionTypes';

export default [
  handleLoadSaga([
    `${AT.FETCH_PYSCRIPT_SCHEMAS}_FETCH`,
    `${AT.UPDATE_SCHEMA_MODEL}_UPDATE`,
  ]),
  handleSaveSaga([`${AT.UPDATE_SCHEMA_MODEL}_UPDATE`]),
  getSaga(AT.FETCH_PYSCRIPT_SCHEMAS, api.fetchPyScriptSchemas, 'results'),
  getUpdateSaga(AT.UPDATE_SCHEMA_MODEL, api.updateSingleActivity),
];
