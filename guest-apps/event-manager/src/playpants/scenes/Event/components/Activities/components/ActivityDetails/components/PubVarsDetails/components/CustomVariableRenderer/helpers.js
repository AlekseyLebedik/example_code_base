export const getVariableMapping = activitySettings =>
  activitySettings.find(setting => setting.type === 'pubvars').variable_mapping;

export const printVariableMapping = (variable, variableMapping) =>
  variableMapping && variableMapping[variable]
    ? `${variableMapping[variable]} (${variable})`
    : variable;
