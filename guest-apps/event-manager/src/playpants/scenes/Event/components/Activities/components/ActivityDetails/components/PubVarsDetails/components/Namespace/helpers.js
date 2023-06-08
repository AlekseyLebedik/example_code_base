import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

/**
 * Show either the live or old value or an empty placeholder
 * for live and old variable values
 * @param {*} namespaceVarType
 * @param {*} variable
 */
const varExists = (namespaceVarType, variable) =>
  isEmpty(namespaceVarType) ? '---' : namespaceVarType[variable];

/**
 * If a new variable, show placeholder, otherwise return the
 * correct live or old variable
 * @param {*} namespace
 * @param {*} variable
 * @param {*} varType live, old, new, or revert variables
 */
const getNewValuePlaceholder = (namespace, variable, varType) =>
  !(variable in namespace.liveVariables) &&
  !(variable in namespace.oldVariables) &&
  variable in namespace.variables
    ? '(new variable)'
    : varExists(namespace[varType], variable);

/**
 * Convert namespace and variables sets to AG Grid row data, showing
 * values from storages as well as new values for each variable
 * @param {*} selectedNamespace
 */
export const getRowData = selectedNamespace =>
  selectedNamespace &&
  selectedNamespace.variables &&
  sortBy(
    uniq([
      ...Object.keys(selectedNamespace.liveVariables || {}),
      ...Object.keys(selectedNamespace.variables),
    ])
  ).map(variable => ({
    context: selectedNamespace.context,
    groupId: selectedNamespace.group_id,
    namespace: selectedNamespace.namespace,
    liveValue:
      selectedNamespace.liveVariables &&
      getNewValuePlaceholder(selectedNamespace, variable, 'liveVariables'),
    newValue: selectedNamespace.variables[variable],
    oldValue:
      selectedNamespace.oldVariables &&
      getNewValuePlaceholder(selectedNamespace, variable, 'oldVariables'),
    variable,
  }));
