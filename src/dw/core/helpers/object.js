import get from 'lodash/get';

export const hasData = obj =>
  !(obj === undefined || obj === null || Object.keys(obj).length === 0);

export const parseJson = (obj, selector) => {
  const field = get(obj, selector);
  return field ? JSON.parse(field) : {};
};
