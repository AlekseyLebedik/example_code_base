import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getSaga } from '@demonware/devzone-core/helpers/sagas';

import * as api from 'dw/online-configuration/services/accountsDashboard';
import * as actions from './actions';
import * as AT from './actionTypes';

function* fetchKPIs(action) {
  const { append } = action;
  try {
    const { data } = yield call(api.getKpis);
    const kpiData = yield all(
      data.kpis
        .filter(({ name }) => !name.match(/total_under_12_uno_accounts/g))
        .map(({ name }) => {
          try {
            return call(api.getKpiData, name);
          } catch (error) {
            return error;
          }
        })
    );
    const passedResults = kpiData
      .filter(kpiItem => !(kpiItem instanceof Error))
      .map(({ data: resultData }) => resultData);
    if (!passedResults.length) throw kpiData[0];
    yield put(
      actions.fetchKPIsSuccess({
        kpis: data.kpis,
        kpiData: passedResults,
        append,
      })
    );
  } catch (error) {
    yield put(actions.fetchKPIsFailed({ error }));
  }
}

const fetchPrivacyKPIsSaga = getSaga(
  AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS,
  api.getPrivacyKpis,
  null
);

const fetchPrivacyKPIsTotalsSaga = getSaga(
  AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS_TOTALS,
  api.getPrivacyKpisTotals,
  null
);

const fetchPrivacyKPIsPerCountrySaga = getSaga(
  AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS_PER_COUNTRY,
  api.getPrivacyRequestsPerCountry,
  null
);

function* saga() {
  yield takeLatest(AT.ACCOUNTS_DASHBOARD_KPIS_FETCH, fetchKPIs);
}

export default [
  fetchPrivacyKPIsSaga,
  fetchPrivacyKPIsTotalsSaga,
  fetchPrivacyKPIsPerCountrySaga,
  saga,
];
