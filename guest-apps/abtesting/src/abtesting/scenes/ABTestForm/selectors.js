import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { hasData } from 'dw/core/helpers/object';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { serviceEnabledEnvsListSelector } from 'dw/core/helpers/title-env-selectors';
import { FORM_NAME as TEST_FORM_NAME, FORM_MODE_ENUM } from './constants';

const testFormSelector = formValueSelector(TEST_FORM_NAME);

const abTestFormSelector = state => state.Scenes.ABTestForm;

export const contextsSelector = createSelector(
  abTestFormSelector,
  abTestForm => abTestForm.contexts
);

export const savingSelector = createSelector(
  abTestFormSelector,
  abTestForm => abTestForm.saving
);

export const selectedContextFormSelector = state =>
  testFormSelector(state, 'context');

const currentContextDataSelector = createSelector(
  contextsSelector,
  selectedContextFormSelector,
  (contexts, selectedContext) =>
    contexts && selectedContext && contexts[selectedContext]
);

export const categoriesListSelector = createSelector(
  currentContextDataSelector,
  currentContext => currentContext && currentContext.categories
);

export const firstPartiesListSelector = createSelector(
  currentContextDataSelector,
  currentContext => currentContext && currentContext.firstParties
);

export const environmentsUsesABTestingSelector = state =>
  serviceEnabledEnvsListSelector(state)(SERVICE_NAMES.ABTESTING);

export const viewOnlyPropSelector = props => props && props.viewOnly;

export const selectedCatchStartSelector = state =>
  testFormSelector(state, 'catchStart');

export const selectedCatchEndSelector = state =>
  testFormSelector(state, 'catchEnd');

const getContextPropsSelector = (_, props) =>
  [props.titleID, props.environment].join(':');

const modePropsSelector = (_, props) => props.mode;

export const getConfigsSelector = state => state.Scenes.ABTestForm.configs;

export const getPropagateShowDetailsSelector = state =>
  state.Scenes.ABTestForm.propagateShowDetails;

const getConfigsList = (configs, context) => configs[context];

const getSegmentsSelector = state => state.Scenes.ABTestForm.segments;

const getSegmentsList = (segments, context) => segments[context];

export const getCohorts = state => testFormSelector(state, 'cohorts');

export const getTreatmentDatesFlag = state =>
  testFormSelector(state, 'setTreatmentDates');

export const configsListFormSelector = createSelector(
  getConfigsSelector,
  selectedContextFormSelector,
  getConfigsList
);

export const segmentsListFormSelector = createSelector(
  getSegmentsSelector,
  selectedContextFormSelector,
  getSegmentsList
);

const getCohortUsersSelector = state => state.Scenes.ABTestForm.cohortUsers;

export const cohortUsersListFormSelector = createSelector(
  getCohortUsersSelector,
  (_, props) => props.cohortID,
  (cohortUsers, cohortID) => cohortUsers[cohortID]
);

const configsListPropsSelector = createSelector(
  getConfigsSelector,
  getContextPropsSelector,
  getConfigsList
);

export const getTestSelector = state => state.Scenes.Update.test;

const formatTreatments = (treatments, configsList, mode) =>
  treatments.map(treatment => ({
    start: mode !== FORM_MODE_ENUM.CLONE ? treatment.start : null,
    end: mode !== FORM_MODE_ENUM.CLONE ? treatment.end : null,
    configs: treatment.configs.map(config => {
      const configFromList =
        configsList && configsList.find(c => c.configID === config);
      return {
        configID: config,
        configName: configFromList && configFromList.name,
      };
    }),
  }));

const formatGroups = (groups, mode) =>
  mode === FORM_MODE_ENUM.CLONE || mode === FORM_MODE_ENUM.PROPAGATE
    ? []
    : groups.map(group => group.groupID);

const formatCohorts = (cohorts, configs, mode) =>
  cohorts.map(cohort => ({
    cohortID: cohort.cohortID,
    name: cohort.name,
    source: cohort.source.type,
    percent: cohort.source.percent,
    maxMembers: cohort.source.maxMembers,
    segmentID: cohort.source.segmentID,
    isControl: cohort.isControl,
    treatments: formatTreatments(cohort.treatments, configs, mode),
    ...(cohort.groups && { groups: formatGroups(cohort.groups, mode) }),
  }));

export const makeInitialValuesSelector = () =>
  createSelector(
    getTestSelector,
    getContextPropsSelector,
    configsListPropsSelector,
    modePropsSelector,
    (test, context, configs, mode) => {
      if (hasData(test)) {
        return {
          context,
          name: test.name,
          purpose: test.purpose,
          categories: test.categories,
          first_parties: test.first_parties,
          creator: test.creator,
          organisation: test.organisation,
          data_scientist: test.data_scientist,
          comments: test.comments,
          catchStart: mode !== FORM_MODE_ENUM.CLONE ? test.catchStart : null,
          catchEnd: mode !== FORM_MODE_ENUM.CLONE ? test.catchEnd : null,
          assignmentAlgorithm: test.assignmentAlgorithm,
          assignmentSeed: test.assignmentSeed,
          cohorts: formatCohorts(test.cohorts, configs, mode),
        };
      }
      return { cohorts: [{ treatments: [{}] }] };
    }
  );
