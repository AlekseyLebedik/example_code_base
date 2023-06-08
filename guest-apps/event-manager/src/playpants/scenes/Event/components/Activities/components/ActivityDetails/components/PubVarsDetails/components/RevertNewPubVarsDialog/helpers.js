import flatMap from 'lodash/flatMap';

/**
 * Transform variable sets for the selected activity into AG Grid
 * rows, showing namespace and variable information, as well as
 * revert value
 * @param {*} variableSets The variable sets to be transformed to
 *                         AG Grid row data
 */
export const getRowData = variableSets =>
  flatMap(
    variableSets.map(varSet =>
      Object.entries(varSet.variables)
        .filter(
          ([variable]) =>
            !Object.keys(varSet.oldVariables || {}).find(v => v === variable)
        )
        .map(([variable, value]) => ({
          variable,
          context: varSet.context,
          groupId: varSet.group_id,
          namespace: varSet.namespace,
          value,
          revertValue:
            varSet.revertVariables && varSet.revertVariables[variable]
              ? varSet.revertVariables[variable]
              : value,
        }))
    )
  );
