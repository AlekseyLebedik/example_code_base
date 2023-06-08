import * as creators from 'playpants/components/ScheduleComponent/actionCreators';
import { fetchGroups } from 'playpants/components/App/actionCreators';

import * as AT from './actionTypes';

export const fetchEventManagerEvents = creators.fetchEventManagerEvents(
  AT.FETCH_EVENT_MANAGER_EVENTS
);
export const fetchEventManagerEventsSuccess =
  creators.fetchEventManagerEventsSuccess(
    AT.FETCH_EVENT_MANAGER_EVENTS_SUCCESS
  );
export const fetchEventManagerEventsFailed =
  creators.fetchEventManagerEventsFailed(AT.FETCH_EVENT_MANAGER_EVENTS_FAILED);

export const fetchExternalEvents = creators.fetchExternalEvents(
  AT.FETCH_EXTERNAL_EVENTS
);
export const fetchExternalEventsSuccess = creators.fetchExternalEventsSuccess(
  AT.FETCH_EXTERNAL_EVENTS_SUCCESS
);
export const fetchExternalEventsFailed = creators.fetchExternalEventsFailed(
  AT.FETCH_EXTERNAL_EVENTS_FAILED
);

export const fetchInformationalEvents = creators.fetchInformationalEvents(
  AT.FETCH_INFORMATIONAL_EVENTS
);
export const fetchInformationalEventsSuccess =
  creators.fetchInformationalEventsSuccess(
    AT.FETCH_INFORMATIONAL_EVENTS_SUCCESS
  );
export const fetchInformationalEventsFailed =
  creators.fetchInformationalEventsFailed(AT.FETCH_INFORMATIONAL_EVENTS_FAILED);

export const fetchDemonwareEvents = creators.fetchDemonwareEvents(
  AT.FETCH_DEMONWARE_EVENTS
);
export const fetchDemonwareEventsSuccess = creators.fetchDemonwareEventsSuccess(
  AT.FETCH_DEMONWARE_EVENTS_SUCCESS
);
export const fetchDemonwareEventsFailed = creators.fetchDemonwareEventsFailed(
  AT.FETCH_DEMONWARE_EVENTS_FAILED
);

export const fetchABTests = creators.fetchABTests(AT.FETCH_AB_TESTS);
export const fetchABTestsSuccess = creators.fetchABTestsSuccess(
  AT.FETCH_AB_TESTS_SUCCESS
);
export const fetchABTestsFailed = creators.fetchABTestsFailed(
  AT.FETCH_AB_TESTS_FAILED
);

export const fetchExpyTests = creators.fetchExpyTests(AT.FETCH_EXPY_TESTS);
export const fetchExpyTestsSuccess = creators.fetchExpyTestsSuccess(
  AT.FETCH_EXPY_TESTS_SUCCESS
);
export const fetchExpyTestsFailed = creators.fetchExpyTestsFailed(
  AT.FETCH_EXPY_TESTS_FAILED
);

export const fetchGamertagGroups = fetchGroups(AT.FETCH_GAMERTAG_GROUPS);
