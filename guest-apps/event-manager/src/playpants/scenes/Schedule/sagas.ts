import {
  createFetchDemonwareEventsSaga,
  createFetchEventsSaga,
  createFetchExternalEventsSaga,
  createFetchTestsSaga,
  createFetchExpyTestsSaga,
} from 'playpants/components/ScheduleComponent/sagaCreators';

import { createFetchGroupsSaga } from 'playpants/scenes/ProjectSettings/sagaCreators';
import * as actions from './actions';
import * as AT from './actionTypes';

const eventManagerEventsSaga = createFetchEventsSaga(
  AT.FETCH_EVENT_MANAGER_EVENTS,
  actions.fetchEventManagerEventsSuccess,
  actions.fetchEventManagerEventsFailed
);

const informationalEventsSaga = createFetchEventsSaga(
  AT.FETCH_INFORMATIONAL_EVENTS,
  actions.fetchInformationalEventsSuccess,
  actions.fetchInformationalEventsFailed
);

const externalEventsSaga = createFetchExternalEventsSaga(
  AT.FETCH_EXTERNAL_EVENTS,
  actions.fetchExternalEventsSuccess,
  actions.fetchExternalEventsFailed
);

const demonwareEventsSaga = createFetchDemonwareEventsSaga(
  AT.FETCH_DEMONWARE_EVENTS,
  actions.fetchDemonwareEventsSuccess,
  actions.fetchDemonwareEventsFailed
);

const abTestsSaga = createFetchTestsSaga(
  AT.FETCH_AB_TESTS,
  actions.fetchABTestsSuccess,
  actions.fetchABTestsFailed
);

const expyTestsSaga = createFetchExpyTestsSaga(
  AT.FETCH_EXPY_TESTS,
  actions.fetchExpyTestsSuccess,
  actions.fetchExpyTestsFailed
);

const fetchGamertagGroupsSaga = createFetchGroupsSaga(AT.FETCH_GAMERTAG_GROUPS);

export default [
  abTestsSaga,
  demonwareEventsSaga,
  eventManagerEventsSaga,
  expyTestsSaga,
  externalEventsSaga,
  fetchGamertagGroupsSaga,
  informationalEventsSaga,
];
