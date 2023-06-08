import { LOG_LEVELS, SOURCE_TYPES } from './constants';

export const parseBooleanValues = query =>
  Object.keys(query).reduce((acc, item) => {
    if (LOG_LEVELS.includes(item) || SOURCE_TYPES.includes(item)) {
      return {
        ...acc,
        [item]: query[item] === 'true',
      };
    }
    return acc;
  }, {});
