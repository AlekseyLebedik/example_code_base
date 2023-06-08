import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import { projectSettings as api } from 'playpants/services';
import { openEventGroupErrorDialog } from '../EventGroupErrorDialog/actions';
import * as AT from './actions';

const fetchGroupTimewarpSettingsSaga = getSaga(
  AT.FETCH_GROUP_TIMEWARP_SETTINGS,
  api.fetchGroupTimewarpSettings,
  null
);

const updateGroupTimewarpSettingsSaga = getUpdateSaga(
  AT.UPDATE_GROUP_TIMEWARP_SETTINGS,
  api.updateGroupTimewarpSettings,
  openEventGroupErrorDialog
);

export default [
  fetchGroupTimewarpSettingsSaga,
  updateGroupTimewarpSettingsSaga,
];
