import appSagas from './App/saga';
import templateSagas from './TemplateFormDialog/saga';
import scheduleSagas from './ScheduleComponent/sagas';
import gamertagManagementSagas from './GamertagManagement/sagas';

export default [
  ...appSagas,
  ...templateSagas,
  ...scheduleSagas,
  ...gamertagManagementSagas,
];
