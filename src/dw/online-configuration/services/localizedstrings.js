import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

export const getLocalizedStringsContexts = () =>
  axios.get(createApiUrl('localized-strings/contexts'));

export const getStringsSetNames = context =>
  axios.get(createApiUrl(`localized-strings/string-set-names/${context}`));

export const getStringSets = (context, stringSetName, stringSetVersion) => {
  if (stringSetVersion)
    return axios.get(
      createApiUrl(`localized-strings/string-sets/${context}/${stringSetName}`),
      {
        params: {
          string_set_version: stringSetVersion,
        },
      }
    );

  return axios.get(
    createApiUrl(`localized-strings/string-sets/${context}/${stringSetName}`)
  );
};

export const postStringSets = (context, stringSetName, data) =>
  axios.post(
    createApiUrl(`localized-strings/string-sets/${context}/${stringSetName}`),
    data
  );
