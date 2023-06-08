import { combineReducers } from 'redux';

import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';

const INITIAL_STATE = {
  error: null,
  kpis: [],
  kpiData: [],
  loadingKpis: false,
};

const kpisReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACCOUNTS_DASHBOARD_KPIS_FETCH:
      return {
        ...state,
        loadingKpis: true,
      };
    case AT.ACCOUNTS_DASHBOARD_KPIS_FETCH_SUCCESS:
      return {
        ...state,
        kpis: action.append
          ? [...state.kpis, ...action.payload.data]
          : action.payload.kpis,
        kpiData: action.append
          ? [...state.kpiData, ...action.payload.data]
          : action.payload.kpiData,
        loadingKpis: false,
      };
    case AT.ACCOUNTS_DASHBOARD_KPIS_FETCH_FAILED:
      return {
        ...state,
        error: action.error,
        loadingKpis: false,
      };
    default:
      return state;
  }
};

const privacyKpisReducer = createFetchReducer(
  AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS
);

const privacyKpisTotalsReducer = createFetchReducer(
  AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS_TOTALS
);

const privacyKpisPerCountryReducer = createFetchReducer(
  AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS_PER_COUNTRY
);

export default combineReducers({
  kpis: kpisReducer,
  privacyKpis: privacyKpisReducer,
  privacyKpisTotals: privacyKpisTotalsReducer,
  privacyKpisPerCountry: privacyKpisPerCountryReducer,
});
