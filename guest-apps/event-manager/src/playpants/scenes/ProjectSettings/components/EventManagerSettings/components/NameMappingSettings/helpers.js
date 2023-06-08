export const formatVariableSchema = variableMapping => {
  const variableProperties = Object.keys(variableMapping).reduce((acc, key) => {
    acc[key] = { type: 'string' };
    return acc;
  }, {});
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      'pubvars variable mapping': {
        type: 'object',
        properties: {
          variable_mapping: {
            type: 'object',
            properties: variableProperties,
          },
        },
      },
    },
  };
};

export const formatVariableFormData = variableMapping => ({
  'pubvars variable mapping': {
    variable_mapping: variableMapping,
  },
});

export const getUpdatedActivitySettings = (activitySettings, variables) =>
  activitySettings.map(setting =>
    setting.type === 'pubvars'
      ? {
          ...setting,
          variable_mapping: variables,
        }
      : setting
  );
