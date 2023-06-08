import get from 'lodash/get';

export const formatBuild = (data, schema) =>
  schema.map(({ name, field }) => ({
    key: name,
    value: get(data, field),
  }));
