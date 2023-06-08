import omit from 'lodash/omit';

export const omitQueryByTypes = (query, types) =>
  omit(
    query,
    Object.entries(query)
      .filter(
        ([key, value]) =>
          types.includes(key) &&
          (value === null || value === undefined || value === '')
      )
      .map(([key]) => key)
  );
