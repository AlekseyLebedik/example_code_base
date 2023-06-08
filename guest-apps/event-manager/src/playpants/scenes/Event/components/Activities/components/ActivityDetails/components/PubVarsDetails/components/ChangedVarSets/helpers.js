import flatMap from 'lodash/flatMap';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

export const getVarSetRowData = variableSets =>
  variableSets &&
  flatMap(
    variableSets.map(varSet =>
      sortBy(
        uniq([
          ...Object.keys(varSet.liveVariables || {}),
          ...Object.keys(varSet.variables),
        ])
      )
        .map(variable => ({
          variable,
          liveValue: varSet.liveVariables && varSet.liveVariables[variable],
          oldValue: varSet.oldVariables ? varSet.oldVariables[variable] : '---',
          newValue: varSet.variables[variable],
          context: varSet.context,
          groupId: varSet.group_id,
          namespace: varSet.namespace,
        }))
        .filter(variable => variable.newValue !== undefined)
    )
  );
