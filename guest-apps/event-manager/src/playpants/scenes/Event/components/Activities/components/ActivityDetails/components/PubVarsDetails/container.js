import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

import { ENVIRONMENT_SHORTTYPES } from 'playpants/scenes/Event/components/Activities/constants';
import * as actions from './actions';

import {
  chooseSelectedValues,
  variableSetsUpdateReady,
  clearNamespaceVariable,
  modifyNamespaceVariableValue,
} from './helpers';
import {
  makePubVarsActivitySelector,
  variableSetsSelector,
  selectedValuesSelector,
  makeFilterValuesSelector,
} from './selectors';

import PubVarsStateless from './presentational';

export class PublisherVariables extends Component {
  static propTypes = {
    eventData: PropTypes.object.isRequired,
    filterValues: PropTypes.object.isRequired,
    getPubVars: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    pubVarsActivity: PropTypes.object.isRequired,
    selectedTitle: PropTypes.object,
    selectedValues: PropTypes.object.isRequired,
    updateSelectedValues: PropTypes.func.isRequired,
    variableSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    selectedTitle: undefined,
  };

  state = {
    hideChangedVarSets: true,
    propsPubVarsActivity: this.props.pubVarsActivity,
    pubVarsActivity: this.props.pubVarsActivity,
  };

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.pubVarsActivity, state.propsPubVarsActivity)) {
      return {
        propsPubVarsActivity: props.pubVarsActivity,
        pubVarsActivity: props.pubVarsActivity,
      };
    }
    return null;
  }

  componentDidMount() {
    this.getVariableSets();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pubVarsActivity.id !== this.props.pubVarsActivity.id ||
      !isEqual(prevProps.variableSets, this.props.variableSets)
    ) {
      this.setSelectedValuesFromStorage();
    }

    if (!isEqual(prevProps.selectedTitle, this.props.selectedTitle)) {
      this.getVariableSets();
      this.setSelectedValuesFromStorage();
    }
  }

  getVariableSets = () => {
    const { eventData, getPubVars, selectedTitle } = this.props;
    const { env_type: envType } = eventData;

    if (selectedTitle) {
      getPubVars(selectedTitle.id, ENVIRONMENT_SHORTTYPES[envType], {});
    }
  };

  setSelectedValuesFromStorage = () => {
    const storedValues = localStorage.getItem('selectedValues');
    if (storedValues) {
      this.props.updateSelectedValues(JSON.parse(storedValues));
    } else {
      this.handleSelectedValues();
    }
  };

  handleSelectedValues = updatedSelectedValues => {
    const { updateSelectedValues, selectedValues, filterValues } = this.props;
    const values =
      updatedSelectedValues ||
      chooseSelectedValues(selectedValues, filterValues);
    localStorage.setItem('selectedValues', JSON.stringify(values));
    updateSelectedValues(values);
  };

  updateSelectedActivity = updatedActivity => {
    const { onUpdate, eventData } = this.props;
    onUpdate(variableSetsUpdateReady(updatedActivity, eventData.status));
  };

  filterNamespaces = (key, value) => {
    const { selectedValues: origSelectedValues } = this.props;
    const { pubVarsActivity } = this.state;
    const { variable_sets: variableSets } = pubVarsActivity.activity;

    const selectedValues = { ...origSelectedValues, [key]: value };

    if (key === 'context') {
      const resetGroupID = !variableSets
        .filter(varSet => varSet.context === selectedValues.context)
        .some(varSet => varSet.group_id === selectedValues.group_id);

      if (resetGroupID) {
        const firstContextGroupId = sortBy(
          uniq(
            variableSets
              .filter(varSet => varSet.context === selectedValues.context)
              .map(varSet => varSet.group_id)
          )
        )[0];
        selectedValues.group_id = value && firstContextGroupId;
      }
    }
    let resetNamespace = false;
    if (key === 'group_id' || key === 'context') {
      resetNamespace = !variableSets
        .filter(
          varSet =>
            varSet.context === selectedValues.context &&
            varSet.group_id === selectedValues.group_id
        )
        .some(varSet => varSet.namespace === selectedValues.namespace);
    }

    if (resetNamespace) {
      const foundNamespaces = variableSets
        .filter(
          set =>
            set.context === selectedValues.context &&
            set.group_id === selectedValues.group_id
        )
        .map(n => n.namespace)[0];
      selectedValues.namespace = foundNamespaces;
    }

    this.handleSelectedValues(selectedValues);
  };

  toggleChangedVarSets = () => {
    this.setState(state => ({ hideChangedVarSets: !state.hideChangedVarSets }));
  };

  clearVariable = data => {
    const { pubVarsActivity } = this.state;
    const updatedActivity = clearNamespaceVariable(pubVarsActivity, data);
    this.setState({ pubVarsActivity: updatedActivity });
  };

  getSelectedNamespace = () =>
    this.state.pubVarsActivity.activity.variable_sets.find(
      varSet =>
        varSet.context === this.props.selectedValues.context &&
        varSet.group_id === this.props.selectedValues.group_id &&
        varSet.namespace === this.props.selectedValues.namespace
    );

  createVariable = (variable, value) => {
    const selectedNamespace = this.getSelectedNamespace();
    const { pubVarsActivity } = this.state;
    const variableData = {
      ...selectedNamespace,
      groupId: selectedNamespace.group_id,
    };
    const updatedActivity = modifyNamespaceVariableValue(
      pubVarsActivity,
      variableData,
      variable,
      value,
      true
    );
    this.setState({ pubVarsActivity: updatedActivity });
  };

  modifyVariable = params => {
    const { pubVarsActivity } = this.state;
    const {
      colDef: { field },
      data,
      newValue: newVariableValueRaw,
      oldValue,
    } = params;
    const newVariableValue = newVariableValueRaw || '';
    const { variable } = data;

    if (oldValue !== newVariableValue && field === 'newValue') {
      const updatedActivity = modifyNamespaceVariableValue(
        pubVarsActivity,
        data,
        variable,
        newVariableValue
      );
      this.setState({ pubVarsActivity: updatedActivity });
    }
  };

  onSaveActivity = () =>
    this.updateSelectedActivity(this.state.pubVarsActivity);

  render() {
    const newProps = {
      ...this.props,
      ...this.state,
      selectedNamespace: this.getSelectedNamespace(),
      clearVariable: this.clearVariable,
      createVariable: this.createVariable,
      filterNamespaces: this.filterNamespaces,
      modifyVariable: this.modifyVariable,
      toggleChangedVarSets: this.toggleChangedVarSets,
      updateSelectedActivity: this.updateSelectedActivity,
      hasChanges: !isEqual(
        this.state.pubVarsActivity,
        this.props.pubVarsActivity
      ),
      onSaveActivity: this.onSaveActivity,
    };

    return <PubVarsStateless {...newProps} />;
  }
}
const makeMapStateToProps = () => {
  const filterValuesSelector = makeFilterValuesSelector();
  const pubVarsActivitySelector = makePubVarsActivitySelector();
  const mapStateToProps = (state, props) => ({
    filterValues: filterValuesSelector(state, props),
    pubVarsActivity: pubVarsActivitySelector(state, props),
    selectedValues: selectedValuesSelector(state),
    variableSets: variableSetsSelector(state),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  getPubVars: bindActionCreators(actions.getPubVars, dispatch),
  updateSelectedValues: bindActionCreators(
    actions.updateSelectedValues,
    dispatch
  ),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PublisherVariables);
