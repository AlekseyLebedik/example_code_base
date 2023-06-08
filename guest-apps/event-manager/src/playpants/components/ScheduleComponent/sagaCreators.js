/* eslint-disable no-unused-vars */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import pick from 'lodash/pick';

import { schedule as scheduleApi } from 'playpants/services';
import filterResultsErrors from 'playpants/helpers/filterResultsErrors';
import { momentPlusDaysToTimestamp } from 'playpants/helpers/dateTime';
import {
  displayViewSelector,
  numberOfDaysSelector,
  selectedDaySelector,
} from 'dw/core/components/EventsCalendar/selectors';
import {
  abTestingAffiliatedTitlesSelector,
  enabledSourcesSelector,
  titleEnvsListSelector,
} from 'playpants/components/App/selectors';
import { createApiUrl } from 'playpants/services/helpers';
import { fetchAppend } from './actions';
import { repeatEventsEnabledSelector } from './selectors';

const fetchEventsSagaHelper = (onSuccess, onFail) =>
  function* fetchEvents({ reducerGroup, params }) {
    try {
      let response = yield call(scheduleApi.fetchEvents, params);
      yield put(
        fetchAppend({
          reducerGroup,
          data: { results: response.data.results },
        })
      );
      while (response.data.next) {
        response = yield call(scheduleApi.fetchEvents, {
          nextPage: response.data.next,
        });
        yield put(
          fetchAppend({
            data: { results: response.data.results },
            reducerGroup,
          })
        );
      }
      const repeatEventsEnabled = yield select(repeatEventsEnabledSelector);
      if (repeatEventsEnabled) {
        const repeatResponse = yield call(
          scheduleApi.fetchRepeatEvents,
          params
        );
        yield put(
          fetchAppend({
            data: { results: repeatResponse.data.results },
            reducerGroup,
          })
        );
      }
      yield put(onSuccess());
    } catch (e) {
      yield put(onFail(e));
    }
  };

export const createFetchEventsSaga = (prefix, onSuccess, onFail) =>
  function* saga() {
    const fetchEventSaga = fetchEventsSagaHelper(onSuccess, onFail);
    yield takeLatest(prefix, fetchEventSaga);
  };

function* tryFetchDataHelper(fetchApi, params) {
  try {
    return yield call(fetchApi, params);
  } catch (error) {
    return { data: { data: [] }, error };
  }
}

const fetchExternalEventsSagaHelper = (onSuccess, onFail) =>
  function* fetchExternalEvents({ params }) {
    const enabledSources = yield select(enabledSourcesSelector);
    // Break out the params that will not work for PMG events (country tag checking used for holidays)
    // eslint-disable-next-line camelcase
    const { tags__tag_type, tags__value__in, ...pmgParams } = params;
    if (!pmgParams.start_at__range) {
      const start = moment().subtract(1, 'months').startOf('month');
      const end = moment(start).add(6, 'months').endOf('month');
      pmgParams.start_at__range = `${start.unix()},${end.unix()}`;
    }
    try {
      const results = yield all({
        ...(enabledSources.includes('holidays') && {
          holidays: tryFetchDataHelper(scheduleApi.fetchExternalEvents, {
            event_type: 'holidays',
            ...params,
          }),
        }),
        ...(enabledSources.includes('video-games') && {
          'video-games': tryFetchDataHelper(scheduleApi.fetchExternalEvents, {
            event_type: 'video-games',
            ...params,
          }),
        }),
        ...(enabledSources.includes('pmg') && {
          pmg: tryFetchDataHelper(scheduleApi.fetchExternalEvents, {
            event_type: 'pmg',
            ...pmgParams,
          }),
        }),
      });
      const serializableResults = pick(results, [
        'holidays.data',
        'video-games.data',
        'pmg.data',
      ]);
      yield put(onSuccess(serializableResults));
    } catch (e) {
      yield put(onFail(e));
    }
  };

export const createFetchExternalEventsSaga = (prefix, onSuccess, onFail) =>
  function* saga() {
    const fetchExternalEventSaga = fetchExternalEventsSagaHelper(
      onSuccess,
      onFail
    );
    yield takeLatest(prefix, fetchExternalEventSaga);
  };

function* tryFetchMultiTitleHelper(fetchApi, key) {
  const titleEnvs = yield select(titleEnvsListSelector);
  return yield all(
    titleEnvs.map(function* fetchTitleEnvs({ titleId, env }) {
      try {
        const results = yield call(fetchApi, titleId, env);
        results.data.project = { titleId, env };
        return results;
      } catch (error) {
        return { data: { [key]: [], project: { titleId, env } }, error };
      }
    })
  );
}

const fetchDemonwareEventsSagaHelper = (onSuccess, onFail) =>
  function* fetchDemonwareEvents({ params = {} }) {
    const numberOfDays = yield select(numberOfDaysSelector);
    const selectedDay = yield select(selectedDaySelector);
    const displayView = yield select(displayViewSelector);
    try {
      const maintenanceStart = moment(selectedDay)
        .subtract(numberOfDays, 'days')
        .startOf('month')
        .format('YYYY-MM-DD HH:mm');
      const maintenanceEnd = moment(selectedDay)
        .add(numberOfDays, 'days')
        .endOf('month')
        .format('YYYY-MM-DD HH:mm');
      // const criticalEnd = momentPlusDaysToTimestamp(selectedDay, numberOfDays);
      const results = yield all({
        maintenance: tryFetchDataHelper(scheduleApi.fetchMaintenanceEvents, {
          start_time: maintenanceStart,
          end_time: displayView === 'calendar' ? maintenanceEnd : null,
          ...params,
        }),
        // TODO: Figure out why we decided to omit these event types??
        // criticalEvents: tryFetchDataHelper(scheduleApi.fetchCriticalEvents, {
        //   endTime: displayView === 'calendar' ? criticalEnd : null,
        //   ...params,
        // }),
        // generalComments: tryFetchMultiTitleHelper(
        //   scheduleApi.fetchGeneralComments,
        //   'generalComments'
        // ),
        // incidents: tryFetchMultiTitleHelper(
        //   scheduleApi.fetchIncidents,
        //   'incidents'
        // ),
      });
      const serializableResults = pick(results, [
        'criticalEvents.data',
        'generalComments.data',
        'incidents.data',
        'maintenance.data',
      ]);
      yield put(onSuccess(serializableResults));
    } catch (e) {
      yield put(onFail(e));
    }
  };

export const createFetchDemonwareEventsSaga = (prefix, onSuccess, onFail) =>
  function* saga() {
    const fetchEventSaga = fetchDemonwareEventsSagaHelper(onSuccess, onFail);
    yield takeLatest(prefix, fetchEventSaga);
  };

const fetchTestsSagaHelper = (onSuccess, onFail) =>
  function* fetchABTests() {
    const titles = yield select(abTestingAffiliatedTitlesSelector);
    try {
      const results = yield all(
        titles.map(({ project, title, envType }) => {
          try {
            return call(scheduleApi.fetchTests, {
              url: createApiUrl('abtesting/tests', title, envType),
              project,
              title,
              envType,
            });
          } catch (error) {
            return error;
          }
        })
      );
      const passedResults = filterResultsErrors(results);
      if (!passedResults.length) throw results[0];
      yield put(onSuccess(passedResults));
    } catch (error) {
      yield put(onFail(error));
    }
  };

export const createFetchTestsSaga = (prefix, onSuccess, onFail) =>
  function* saga() {
    const fetchEventSaga = fetchTestsSagaHelper(onSuccess, onFail);
    yield takeLatest(prefix, fetchEventSaga);
  };

const fetchExpyTestsSagaHelper = (onSuccess, onFail) =>
  function* fetchExpyTests() {
    const titles = yield select(abTestingAffiliatedTitlesSelector);
    try {
      const results = yield all(
        titles.map(({ title, envType }) => {
          try {
            return call(scheduleApi.fetchExpyTests, {
              url: createApiUrl('expy/tests', title, envType),
            });
          } catch (error) {
            return error;
          }
        })
      );
      const passedResults = filterResultsErrors(results);
      if (!passedResults.length) throw results[0];
      yield put(onSuccess(passedResults[0]));
    } catch (error) {
      yield put(onFail(error));
    }
  };

export const createFetchExpyTestsSaga = (prefix, onSuccess, onFail) =>
  function* saga() {
    const fetchEventSaga = fetchExpyTestsSagaHelper(onSuccess, onFail);
    yield takeLatest(prefix, fetchEventSaga);
  };
