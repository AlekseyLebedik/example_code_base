import compact from 'lodash/compact';
import get from 'lodash/get';

export const getFirstPartiesFromTest = test => {
  const firstPartiesMap = {
    nin: 'nintendo',
    bnet: 'battlenet',
  };
  if (test.first_parties) {
    return test.first_parties
      .map(fp => get(firstPartiesMap, fp, fp).toUpperCase())
      .join('\n');
  }
  return undefined;
};

export const getOptionsFromList = (list, formatFn = val => val) =>
  list &&
  compact(
    list.map(fp => {
      if (typeof fp === 'string') return { label: formatFn(fp), value: fp };
      return false;
    })
  );
