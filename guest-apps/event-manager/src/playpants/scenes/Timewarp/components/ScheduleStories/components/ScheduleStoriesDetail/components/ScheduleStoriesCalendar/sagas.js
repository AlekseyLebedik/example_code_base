import { createFetchEventsSaga } from 'playpants/components/ScheduleComponent/sagaCreators';
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

export default [eventManagerEventsSaga, informationalEventsSaga];
