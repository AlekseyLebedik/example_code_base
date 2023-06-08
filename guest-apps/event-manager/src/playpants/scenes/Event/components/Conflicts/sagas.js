import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { event as eventAPI } from 'playpants/services';
import * as AT from './actionTypes';

export default [
  getSaga(AT.FETCH_CONFLICTS, eventAPI.fetchEventConflicts, 'results'),
];
