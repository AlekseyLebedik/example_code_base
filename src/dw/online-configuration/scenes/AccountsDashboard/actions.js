import { createFetch } from '@demonware/devzone-core/helpers/actions';

import * as AT from './actionTypes';

export const fetchKPIs = (append = false) => ({
  type: AT.ACCOUNTS_DASHBOARD_KPIS_FETCH,
  append,
});

export const fetchKPIsSuccess = (payload, append) => ({
  type: AT.ACCOUNTS_DASHBOARD_KPIS_FETCH_SUCCESS,
  payload,
  append,
});

export const fetchKPIsFailed = error => ({
  type: AT.ACCOUNTS_DASHBOARD_KPIS_FETCH_FAILED,
  error,
});

export const fetchPrivacyKPIs = () =>
  createFetch(AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS);

export const fetchPrivacyKPIsTotals = () =>
  createFetch(AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS_TOTALS);

export const fetchPrivacyKPIsPerCountry = () =>
  createFetch(AT.ACCOUNTS_DASHBOARD_PRIVACY_KPIS_PER_COUNTRY);
