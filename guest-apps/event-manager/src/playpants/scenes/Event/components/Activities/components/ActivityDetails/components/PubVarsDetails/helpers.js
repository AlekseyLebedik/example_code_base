import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

/**
 * Retrieve the index of a particular context/groupId/namespace
 * in the array of variable sets
 * @param {*} selectedActivity
 * @param {*} variableData
 */
export const getNamespaceIdx = (selectedActivity, variableData) =>
  selectedActivity.activity.variable_sets.findIndex(
    set =>
      set.context === variableData.context &&
      set.group_id === variableData.groupId &&
      set.namespace === variableData.namespace
  );

/**
 * Return the values of the context/groupId/namespace filters.
 * Should either be the selected value or the first one available.
 * @param {*} selectedValues
 * @param {*} filterValues
 */
export const chooseSelectedValues = (selectedValues, filterValues) => ({
  context:
    selectedValues &&
    selectedValues.context &&
    filterValues.context.indexOf(selectedValues.context) > -1
      ? selectedValues.context
      : filterValues.context[0],
  group_id:
    selectedValues &&
    selectedValues.group_id &&
    filterValues.group_id.indexOf(selectedValues.group_id) > -1
      ? selectedValues.group_id
      : filterValues.group_id[0],
  namespace:
    selectedValues &&
    selectedValues.namespace &&
    filterValues.namespace.indexOf(selectedValues.namespace) > -1
      ? selectedValues.namespace
      : filterValues.namespace[0],
});

/**
 * Return stringified variables
 * @param {*} variables
 */
const stringifyVariableValues = variables => {
  const stringifiedVariables = cloneDeep(variables);

  Object.entries(stringifiedVariables).forEach(([variable, value]) => {
    stringifiedVariables[variable] = String(value);
  });

  return stringifiedVariables;
};

/**
 * Returns formatted variable sets for pubvars
 * @param {*} selectedActivity
 * @param {*} status
 */
export const variableSetsUpdateReady = (selectedActivity, status) => ({
  ...selectedActivity,
  activity: {
    variable_sets: selectedActivity.activity.variable_sets.map(set => {
      const modifiedSet = cloneDeep(set);
      if (
        modifiedSet.liveVariables &&
        (!modifiedSet.oldVariables || status === 'open' || status === 'pending')
      ) {
        modifiedSet.oldVariables = stringifyVariableValues(
          modifiedSet.liveVariables
        );
      }
      modifiedSet.variables = stringifyVariableValues(modifiedSet.variables);
      delete modifiedSet.liveVariables;
      return modifiedSet;
    }),
  },
});

/**
 * Delete a variable and its values from a particular variable set
 * @param {*} selectedActivity
 * @param {*} variableData
 */
export const clearNamespaceVariable = (selectedActivity, variableData) => {
  const { variable } = variableData;
  const foundIdx = getNamespaceIdx(selectedActivity, variableData);
  const updatedActivity = cloneDeep(selectedActivity);
  delete updatedActivity.activity.variable_sets[foundIdx].variables[variable];
  if (updatedActivity.activity.variable_sets[foundIdx].revertVariables) {
    delete updatedActivity.activity.variable_sets[foundIdx].revertVariables[
      variable
    ];
  }
  return updatedActivity;
};

/**
 * Modify the value of a namespace variable and return the updated activity.
 * If there is a new variable, set the revert values.
 * @param {*} selectedActivity
 * @param {*} variableData
 * @param {*} variable
 * @param {*} value
 * @param {*} newVariable
 */
export const modifyNamespaceVariableValue = (
  selectedActivity,
  variableData,
  variable,
  value,
  newVariable = false
) => {
  const foundIdx = getNamespaceIdx(selectedActivity, variableData);
  const updatedActivity = cloneDeep(selectedActivity);
  updatedActivity.activity.variable_sets[foundIdx].variables[variable] = value;
  if (newVariable) {
    if (!updatedActivity.activity.variable_sets[foundIdx].revertVariables) {
      updatedActivity.activity.variable_sets[foundIdx].revertVariables = {
        [variable]: value,
      };
    } else {
      updatedActivity.activity.variable_sets[foundIdx].revertVariables[
        variable
      ] = value;
    }
  }
  return updatedActivity;
};

/**
 * Change the revert value of a variable for a new variable
 * @param {*} selectedActivity
 * @param {*} revertVars
 */
export const modifyRevertVariableValues = (selectedActivity, revertVars) => {
  const updatedActivity = cloneDeep(selectedActivity);
  revertVars.forEach(revertVar => {
    const foundIdx = getNamespaceIdx(selectedActivity, revertVar);
    updatedActivity.activity.variable_sets[foundIdx].revertVariables[
      revertVar.variable
    ] = revertVar.revertValue;
  });
  return updatedActivity;
};

/**
 * This will combine the variable sets of a publisher variables activity
 * with the publisher variable storage data from online configuration.
 * @param {*} selectedActivity
 * @param {*} externalSet
 */
export const combinePubVarSets = (selectedActivity, externalSet) => {
  const combinedSet = selectedActivity.activity.variable_sets.map(set => ({
    ...set,
    major_version: 0,
    minor_version: 1,
    liveVariables: {},
    oldVariables: set.oldVariables || {},
  }));
  externalSet.forEach(set => {
    const foundIdx = combinedSet.findIndex(
      s =>
        s.context === set.context &&
        String(s.group_id) === String(set.groupId) &&
        s.namespace === set.namespace
    );
    if (foundIdx > -1) {
      combinedSet[foundIdx].major_version = Number(set.majorVersion);
      combinedSet[foundIdx].minor_version = Number(set.minorVersion);
      combinedSet[foundIdx].liveVariables = { ...set.variables };
    } else {
      const newSet = {
        context: set.context,
        group_id: String(set.groupId),
        is_major_update: false,
        major_version: Number(set.majorVersion),
        minor_version: Number(set.minorVersion),
        namespace: set.namespace,
        liveVariables: { ...set.variables },
        oldVariables: { ...set.variables },
        variables: {},
      };
      combinedSet.push(newSet);
    }
  });
  const updatedActivity = cloneDeep(selectedActivity);
  updatedActivity.activity.variable_sets = combinedSet;
  return updatedActivity;
};

/**
 * This will select the context/groupId/namespace values that can
 * be selected in the namespace filters.  It starts with getting all
 * the available contexts, then selects all of the groupIds for the
 * selected context, then selects all the namespaces available
 * for the selected context/groupId
 * @param {*} varSets
 * @param {*} selectedValues
 */
export const chooseFilterValues = (varSets, selectedValues) => {
  const filterValues = {
    context: sortBy(
      uniqBy(varSets, 'context')
        .filter(varSet => varSet.context)
        .map(varSet => varSet.context)
    ),
    group_id: [],
    namespace: [],
  };
  const hasSelectedContext =
    selectedValues &&
    selectedValues.context &&
    filterValues.context.findIndex(c => c === selectedValues.context) > -1;
  if (filterValues.context.length) {
    filterValues.group_id = sortBy(
      uniq(
        varSets
          .filter(varSet =>
            hasSelectedContext
              ? varSet.context === selectedValues.context
              : varSet.context === filterValues.context[0]
          )
          .map(varSet => varSet.group_id)
      )
    );

    const hasSelectedGroupID =
      selectedValues &&
      selectedValues.group_id &&
      filterValues.group_id.findIndex(g => g === selectedValues.group_id) > -1;

    if (filterValues.group_id.length) {
      filterValues.namespace = sortBy(
        uniq(
          varSets
            .filter(varSet =>
              hasSelectedContext && hasSelectedGroupID
                ? varSet.context === selectedValues.context &&
                  varSet.group_id === selectedValues.group_id
                : varSet.context === filterValues.context[0] &&
                  varSet.group_id === filterValues.group_id[0]
            )
            .map(varSet => varSet.namespace)
        )
      );
    }
  }

  return filterValues;
};

/**
 * Check if a pubvars activity has new variables or not
 * @param {*} namespace
 */
export const hasNewVariables = pubVarsActivity =>
  !!pubVarsActivity.activity.variable_sets.find(
    varSet =>
      Object.keys(varSet.variables).filter(
        variable =>
          !Object.keys(varSet.liveVariables).find(v => v === variable) &&
          !Object.keys(varSet.oldVariables).find(v => v === variable)
      ).length > 0
  );
