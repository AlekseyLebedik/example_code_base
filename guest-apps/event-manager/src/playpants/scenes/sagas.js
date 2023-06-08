import eventSagas from './Event/sagas';
import groupStoriesSagas from './GroupStories/sagas';
import projectSettingsSagas from './ProjectSettings/sagas';
import scheduleSagas from './Schedule/sagas';
import templateSagas from './Templates/sagas';
import timewarpSagas from './Timewarp/sagas';

export default [
  ...eventSagas,
  ...groupStoriesSagas,
  ...projectSettingsSagas,
  ...scheduleSagas,
  ...templateSagas,
  ...timewarpSagas,
];
