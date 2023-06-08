import React, { Component } from 'react';
import { reduxForm, submit, getFormSyncErrors } from 'redux-form';
import isEqual from 'lodash/isEqual';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';
import * as V from 'dw/core/components/FormFields/validation';
import { fetchGroups } from 'abtesting/scenes/ABTestGroups/actions';
import { groupsListSelector } from 'abtesting/scenes/ABTestGroups/selectors';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { serviceEnabledEnvsListSelector } from 'dw/core/helpers/title-env-selectors';

import { fetchCategories, fetchFirstParties, saveTest } from './actions';
import {
  FORM_NAME as TEST_FORM_NAME,
  FORM_MODE_ENUM,
  OVERRIDES_ENVIRONMENTS,
} from './constants';
import ABTestFormStateless from './presentational';
import {
  categoriesListSelector,
  firstPartiesListSelector,
  makeInitialValuesSelector,
  selectedContextFormSelector,
  selectedCatchStartSelector,
  selectedCatchEndSelector,
  getConfigsSelector,
  getCohorts,
  savingSelector,
} from './selectors';

const makeMapStateToProps = () => {
  const initialValuesSelector = makeInitialValuesSelector();
  const mapStateToProps = (state, props) => ({
    categoriesList: categoriesListSelector(state),
    firstPartiesList: firstPartiesListSelector(state),
    groupsList: groupsListSelector(state),
    selectedContext: selectedContextFormSelector(state),
    initialValues: initialValuesSelector(state, props),
    selectedCatchStart: selectedCatchStartSelector(state),
    selectedCatchEnd: selectedCatchEndSelector(state),
    formErrors: getFormSyncErrors(TEST_FORM_NAME)(state),
    getAllConfigs: getConfigsSelector(state),
    cohorts: getCohorts(state),
    environmentsUsesGroups: serviceEnabledEnvsListSelector(state)(
      SERVICE_NAMES.GROUPS
    ),
    saving: savingSelector(state),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  fetchCategories: context => dispatch(fetchCategories(context)),
  fetchPlatforms: context => dispatch(fetchFirstParties(context)),
  handlerAddTest: () => dispatch(submit(TEST_FORM_NAME)),
  fetchGroups: context => dispatch(fetchGroups({ context })),
  saveTest: (
    testValues,
    history,
    testID,
    matchingConfigs,
    nonMatchingConfigs
  ) =>
    new Promise((resolve, reject) =>
      dispatch(
        saveTest(
          testValues,
          history,
          resolve,
          reject,
          testID,
          matchingConfigs,
          nonMatchingConfigs
        )
      )
    ),
});

class ABTestFormBase extends Component {
  state = {
    cohortOverridesContainer: null,
    // eslint-disable-next-line react/no-unused-state
    loading: false,
    selectedContext: null,
    groupsLoaded: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      selectedContext,
      fetchCategories: onFetchCategories,
      fetchPlatforms,
      firstPartiesList,
      categoriesList,
    } = nextProps;
    // Fetch Categories/FirstParties only once when selectedContext changes, as they are configured per service.
    if (selectedContext) {
      if (selectedContext !== prevState.selectedContext) {
        if (!firstPartiesList || !categoriesList) {
          onFetchCategories(selectedContext);
          fetchPlatforms(selectedContext);
        }

        return { loading: true, selectedContext, groupsLoaded: false };
      }

      if (
        prevState.loading &&
        nextProps.categoriesList &&
        nextProps.firstParties
      )
        return { loading: false };
    }

    return null;
  }

  componentDidUpdate() {
    this.fetchGroups();
  }

  setCohortOverridesContainer = cohortOverridesContainer =>
    this.setState({ cohortOverridesContainer });

  getNewCohorts(values) {
    const { cohorts } = values;
    const previousContextConfigs =
      this.props.getAllConfigs[this.props.initialValues.context];
    const configs = this.props.getAllConfigs[values.context];
    let nonMatchingConfigs = [];
    const newCohorts = cohorts.map(cohort => ({
      ...cohort,
      treatments: cohort.treatments.map(treatment => ({
        ...treatment,
        configs: treatment.configs.map(config => {
          const previousConfig = previousContextConfigs.find(
            x => x.configID === config.configID
          );
          const matchedConfig = configs.find(
            x =>
              isEqual(x.modifiers, previousConfig.modifiers) &&
              x.serviceID === previousConfig.serviceID
          );
          if (matchedConfig) {
            return {
              configID: matchedConfig.configID,
              configName: matchedConfig.name,
            };
          }
          if (!nonMatchingConfigs.some(x => x.configID === config.configID)) {
            nonMatchingConfigs = [...nonMatchingConfigs, previousConfig];
          }
          return config;
        }),
      })),
    }));

    return { nonMatchingConfigs, newCohorts };
  }

  displayCohortOverrides = () => {
    const { selectedContext, environmentsUsesGroups, initialValues } =
      this.props;
    if (selectedContext) {
      // eslint-disable-next-line
      const [_, environment] = selectedContext.split(':');
      const contextGroups = environmentsUsesGroups.map(env =>
        [env.title.id, env.environment.shortType].join(':')
      );
      return (
        OVERRIDES_ENVIRONMENTS.includes(environment) &&
        hasData(initialValues.cohorts) &&
        contextGroups.includes(selectedContext)
      );
    }
    return false;
  };

  fetchGroups = () => {
    const { groupsLoaded } = this.state;
    const { selectedContext, fetchGroups: onFetchGroups } = this.props;
    if (!groupsLoaded && this.displayCohortOverrides()) {
      this.setState({ groupsLoaded: true }, () =>
        onFetchGroups(selectedContext)
      );
    }
  };

  handleToTreatmentDates = (cohortIndex, indexVal) => {
    const isChecked = this.props.selectedCatchEnd !== undefined;
    if (isChecked) {
      this.props.change(
        `cohorts[${cohortIndex}]treatments[${indexVal}].end`,
        this.props.selectedCatchEnd
      );
    } else {
      this.props.change(
        `cohorts[${cohortIndex}]treatments[${indexVal}].end`,
        null
      );
    }
  };

  handleFromTreatmentDates = (cohortIndex, indexVal) => {
    const isChecked = this.props.selectedCatchStart !== undefined;
    if (isChecked) {
      this.props.change(
        `cohorts[${cohortIndex}]treatments[${indexVal}].start`,
        this.props.selectedCatchStart
      );
    } else {
      this.props.change(
        `cohorts[${cohortIndex}]treatments[${indexVal}].start`,
        null
      );
    }
  };

  saveTestSubmit = values => {
    const hasCohorts = hasData(values.cohorts);
    if (hasCohorts && !this.props.getAllConfigs[values.context]) {
      return null;
    }
    const testID = this.props.test && this.props.test.testID;
    if (hasCohorts && this.props.mode === FORM_MODE_ENUM.PROPAGATE) {
      const { newCohorts, nonMatchingConfigs } = this.getNewCohorts(values);
      return this.props.saveTest(
        values,
        this.props.history,
        testID,
        newCohorts,
        nonMatchingConfigs
      );
    }
    return this.props.saveTest(values, this.props.history, testID);
  };

  render() {
    const { cohortOverridesContainer } = this.state;
    const newProps = {
      ...this.props,
      saveTestSubmit: this.saveTestSubmit,
      cohortOverridesContainer,
      setCohortOverridesContainer: this.setCohortOverridesContainer,
      displayCohortOverrides: this.displayCohortOverrides(),
      handleToTreatmentDates: this.handleToTreatmentDates,
      handleFromTreatmentDates: this.handleFromTreatmentDates,
    };
    return <ABTestFormStateless {...newProps} />;
  }
}

const validatePercent = V.intRangeValidator(1, 100);
const validateTest = values => {
  const errors = {};
  const cohorts = values.cohorts || [];
  const cohortsErrors = cohorts.map(cohort => {
    const error = {};
    if (cohort.source !== 'manual') {
      const percentErrorMsg = validatePercent(cohort.percent);
      const membersErrorMsg = V.positiveInt(cohort.maxMembers);
      if (percentErrorMsg) {
        error.percent = percentErrorMsg;
      }
      if (membersErrorMsg) {
        error.maxMembers = membersErrorMsg;
      }
      if (cohort.source === 'segment') {
        const segmentErrorMsg = V.positiveInt(cohort.segmentID);
        if (segmentErrorMsg) {
          error.segmentID = segmentErrorMsg;
        } else if (!cohort.segmentID) {
          error.segmentID = 'Required';
        }
      }
    }
    return error;
  });
  if (cohortsErrors.some(e => hasData(e))) {
    errors.cohorts = cohortsErrors;
  }
  if (hasData(errors)) {
    return errors;
  }
  return undefined;
};

ABTestFormBase.propTypes = {
  ...ABTestFormStateless.propTypes,
};

const ABTestForm = reduxForm({
  form: TEST_FORM_NAME,
  validate: validateTest,
  enableReinitialize: true,
})(ABTestFormBase);

export default connect(makeMapStateToProps, dispatchToProps, ABTestForm);
