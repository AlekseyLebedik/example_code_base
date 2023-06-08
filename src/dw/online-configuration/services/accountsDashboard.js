import axios from 'dw/core/axios';

/* Accounts Dashboard */
export const getKpis = () => axios.get(`/accounts-kpi/`);

export const getKpiData = kpiName =>
  axios
    .get(`/accounts-kpi/${kpiName}/`)
    .then(response => ({
      ...response,
      data: {
        name: kpiName,
        details: response.data,
      },
    }))
    .catch(error => error);

export const getPrivacyKpis = () => axios.get(`/accounts-privacy-kpi/`);

export const getPrivacyKpisTotals = () =>
  axios.get(`/accounts-privacy-kpi/totals/`);

export const getPrivacyRequestsPerCountry = () =>
  axios.get(`/accounts-privacy-kpi/per-country/`);
