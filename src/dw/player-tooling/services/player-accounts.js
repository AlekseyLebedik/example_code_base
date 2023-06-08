import axios from 'dw/core/axios';

const RESOURCE = 'player-accounts/prod/';

export const getLinkedAccounts = ({ nextPage, cancelToken, ...params }) =>
  axios.get(
    (nextPage && encodeURI(nextPage).replace(/#/g, '%23')) || RESOURCE,
    { cancelToken, params }
  );

export const getUNOAccountPIIDetails = ({ accountID, ...params }) =>
  axios.get(`${RESOURCE}pii/${accountID}/`, { params });

export const getUNOAccount2FADetails = (accountID, params) =>
  axios.get(`${RESOURCE}2fa/${accountID}/`, { params });
