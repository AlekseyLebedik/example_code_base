import queryString from 'query-string';

export function joinPath(base, ...paths) {
  const path = paths.join('/');
  return base.charAt(base.length - 1) === '/'
    ? `${base}${path}`
    : `${base}/${path}`;
}

export function joinQueryParams(base, queryParams) {
  const [baseUrl, paramsString] = base.split('?');
  const newParams = {
    ...queryString.parse(paramsString),
    ...queryParams,
  };
  const newParamsString = Object.entries(newParams)
    .map(e => e.join('='))
    .join('&');
  return `${baseUrl}?${newParamsString}`;
}

export function joinQueryParam(base, key, value) {
  const params = { [key]: value };
  return joinQueryParams(base, params);
}
