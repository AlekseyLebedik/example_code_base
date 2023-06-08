import axios from 'dw/core/axios';
import head from 'lodash/head';

const titlePath = (title, env) => `titles/${title}/envs/${env}`;
const getScheme = url => head(url.split(':'));
const hasScheme = url => url.includes('://');

export const createApiUrl = (resource, titleId, envType) =>
  !resource
    ? `/${titlePath(titleId, envType)}/`
    : `/${titlePath(titleId, envType)}/${resource}/`;

export const browserFileDownloader = (url, fileName, params) =>
  axios({
    url,
    params,
    method: 'GET',
    responseType: 'blob',
  }).then(response => {
    const URL = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = URL;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    return response;
  });

export const getSyncScheme = response => {
  const { config, data } = response;
  const { baseURL, url } = config;
  // Set replacement scheme to baseURL scheme if scheme not found in original url
  // or set to null if scheme not in either URL
  const origScheme = (() => {
    if (hasScheme(url)) return getScheme(url);
    if (hasScheme(baseURL)) return getScheme(baseURL);
    return null;
  })();
  const nextScheme =
    !!data.next && hasScheme(data.next) && getScheme(data.next);
  // Update next scheme if next has a scheme, the original or base URL has a scheme,
  // and the latter isn't equal to the net scheme
  if (nextScheme && origScheme && origScheme !== nextScheme) {
    data.next = data.next.replace(nextScheme, origScheme);
  }
  return response;
};
