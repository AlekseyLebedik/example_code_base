import { createSelector } from 'reselect';
import lowerCase from 'lodash/lowerCase';
import orderBy from 'lodash/orderBy';

import { combinePubVarSets, chooseFilterValues } from './helpers';

const selectedActivityFromProps = (_, props) => props.selectedActivity;

export const variableSetsSelector = state =>
  state.Scenes.Event.activity.pubvars.variableSets;

export const selectedValuesSelector = state =>
  state.Scenes.Event.activity.pubvars.selectedValues;

export const makePubVarsActivitySelector = () =>
  createSelector(
    selectedActivityFromProps,
    variableSetsSelector,
    (selectedActivity, variableSets) =>
      combinePubVarSets(selectedActivity, variableSets)
  );

const activityVariableSetsSelector = createSelector(
  makePubVarsActivitySelector(),
  ({ activity }) => activity.variable_sets
);

export const makeFilterValuesSelector = () =>
  createSelector(
    activityVariableSetsSelector,
    selectedValuesSelector,
    (variableSets, selectedValues) =>
      chooseFilterValues(variableSets, selectedValues)
  );

export const makeSelectedNamespaceSelector = () =>
  createSelector(
    makePubVarsActivitySelector(),
    selectedValuesSelector,
    (selectedActivity, selectedValues) =>
      orderBy(selectedActivity.activity.variable_sets, [
        set => lowerCase(set.namespace),
      ]).find(
        varSet =>
          varSet.context === selectedValues.context &&
          varSet.group_id === selectedValues.group_id &&
          varSet.namespace === selectedValues.namespace
      )
  );
