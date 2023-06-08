import omit from 'lodash/omit';

export const arrToObj = (arr, key, value) =>
  Object.assign({}, ...arr.map(item => ({ [item[key]]: value || item })));

export const formatActivitiesSchema = (
  { items, ...schema },
  activitySettings
) => {
  const { properties, required } = items;
  const activityObj = {
    required,
    properties: omit(properties, ['context', 'type']),
  };
  const objSchema = {
    ...schema,
    additionalProperties: false,
    type: 'object',
    properties: {
      activity_types: {
        type: 'object',
        additionalProperties: false,
        properties: arrToObj(activitySettings, 'type', activityObj),
      },
    },
  };
  return objSchema;
};
