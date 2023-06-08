import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

export const getLinkedAccounts = ({ nextPage, cancelToken, ...params }) =>
  axios.get(
    (nextPage && encodeURI(nextPage).replace(/#/g, '%23')) ||
      createApiUrl('linked-accounts'),
    { cancelToken, params }
  );

export const getLinkedAccountDetails = ({ urlID, ...params }) =>
  axios.get(createApiUrl(`linked-accounts/${urlID}`), { params });

export const updateLinkedAccounts = ({ accountId, data }) =>
  axios.put(createApiUrl(`linked-accounts/${accountId}`), data);

export const getAccountBans = ({ accountID, ...params }) =>
  axios.get(createApiUrl(`linked-accounts/${accountID}/bans`), { params });

export const getUnoAccounts = params =>
  axios.get(createApiUrl(`uno-accounts`), { params });
