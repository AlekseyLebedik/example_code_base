import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect';
import last from 'lodash/last';
import xorWith from 'lodash/xorWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import {
  activitySelector,
  eventLoadingSelector,
  responsibilitiesListSelector,
} from 'playpants/scenes/Event/selectors';
import { constructBuildList } from './helpers';

// Selectors for Thunderpants
export const thunderpantsSelector = createSelector(
  activitySelector,
  activity => activity.thunderpants
);

export const tpantsFormBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.form
);

export const formDataSelector = createSelector(
  tpantsFormBaseSelector,
  tpantsForm => tpantsForm.data
);

export const formNextSelector = createSelector(
  tpantsFormBaseSelector,
  tpantsForm => tpantsForm.next
);

export const formSchemaSelector = createSelector(
  tpantsFormBaseSelector,
  tpantsForm => tpantsForm.schema
);

export const formTargetsSelector = createSelector(
  tpantsFormBaseSelector,
  tpantsForm => tpantsForm.targets
);

export const formTypeSelector = createSelector(
  tpantsFormBaseSelector,
  tpantsForm => tpantsForm.type
);

export const formSummaryDataSelector = createSelector(
  tpantsFormBaseSelector,
  tpantsForm => tpantsForm.summary
);

export const filterTypeSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.filterType
);

export const unlockedDeploymentsSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.unlockedDeployments
);

// Selectors for Thunderpants api fetches
export const buildListBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.buildList
);

export const buildListSelector = createSelector(
  buildListBaseSelector,
  buildListBase => buildListBase.data
);

export const buildListLoadingSelector = createSelector(
  buildListBaseSelector,
  buildListBase => buildListBase.loading
);

export const buildListSuccessSelector = createSelector(
  buildListBaseSelector,
  buildListBase => buildListBase.success
);

export const buildSchemaBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.buildSchema
);

export const buildSchemaSelector = createSelector(
  buildSchemaBaseSelector,
  buildSchema => buildSchema.data
);

export const buildSchemaLoadingSelector = createSelector(
  buildSchemaBaseSelector,
  buildSchema => buildSchema.loading
);

export const buildSchemaSuccessSelector = createSelector(
  buildSchemaBaseSelector,
  buildSchema => buildSchema.success
);

export const deployerListBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.deployerList
);

export const deployerListSelector = createSelector(
  deployerListBaseSelector,
  deployerListBase => deployerListBase.data
);

export const deployerListLoadingSelector = createSelector(
  deployerListBaseSelector,
  deployerListBase => deployerListBase.loading
);

export const deployerListFilteredSelector = createSelector(
  deployerListSelector,
  responsibilitiesListSelector,
  (deployerList, responsibilitiesList) => {
    const enabledDeployers = responsibilitiesList.map(responsibility =>
      parseInt(last(responsibility.code.split('_')), 10)
    );
    return deployerList.filter(({ id }) => enabledDeployers.includes(id));
  }
);

export const deploymentListBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.deploymentList
);

export const deploymentListSelector = createSelector(
  deploymentListBaseSelector,
  deploymentListBase => deploymentListBase.data
);

export const deploymentListLoadingSelector = createSelector(
  deploymentListBaseSelector,
  deploymentListBase => deploymentListBase.loading
);

export const deploymentListSuccessSelector = createSelector(
  deploymentListBaseSelector,
  deploymentListBase => deploymentListBase.success
);

export const targetListBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.targetList
);

export const targetListSelector = createSelector(
  targetListBaseSelector,
  targetListBase => targetListBase.data
);

export const targetListLoadingSelector = createSelector(
  targetListBaseSelector,
  targetListBase => targetListBase.loading
);

export const targetListSuccessSelector = createSelector(
  targetListBaseSelector,
  targetListBase => targetListBase.success
);

export const userParamsSchemaBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.userParamsSchema
);

export const userParamsSchemaSelector = createSelector(
  userParamsSchemaBaseSelector,
  userParamsSchemaBase => userParamsSchemaBase.data
);

export const userParamsSchemaLoadingSelector = createSelector(
  userParamsSchemaBaseSelector,
  userParamsSchemaBase => userParamsSchemaBase.loading
);

export const userParamsSchemaSuccessSelector = createSelector(
  userParamsSchemaBaseSelector,
  userParamsSchemaBase => userParamsSchemaBase.success
);

export const viewListBaseSelector = createSelector(
  thunderpantsSelector,
  thunderpants => thunderpants.viewList
);

export const viewListSelector = createSelector(
  viewListBaseSelector,
  viewListBase => viewListBase.data
);

export const viewListLoadingSelector = createSelector(
  viewListBaseSelector,
  viewListBase => viewListBase.loading
);

export const viewListSuccessSelector = createSelector(
  viewListBaseSelector,
  viewListBase => viewListBase.success
);

export const isThunderpantsLoadingSelector = createSelector(
  eventLoadingSelector,
  buildListLoadingSelector,
  buildSchemaLoadingSelector,
  deployerListLoadingSelector,
  deploymentListLoadingSelector,
  targetListLoadingSelector,
  userParamsSchemaLoadingSelector,
  viewListLoadingSelector,
  (...allLoading) => allLoading.some(loadingEl => loadingEl)
);

// Selectors for activity
const getActivityFromProps = (_, props) => props.selectedActivity.activity;

export const makeActivityBuildListSelector = () =>
  createSelector(getActivityFromProps, activity => activity.buildList);

export const makeActivityDeployerSelector = () =>
  createSelector(getActivityFromProps, activity => activity.deployer);

export const makeActivityViewSelector = () =>
  createSelector(getActivityFromProps, activity => activity.view);

export const activityDeploymentsSelector = createSelector(
  getActivityFromProps,
  activity => activity.deploy
);

export const activityUndeploymentsSelector = createSelector(
  getActivityFromProps,
  activity => activity.undeploy
);

export const activityModificationsSelector = createSelector(
  getActivityFromProps,
  activity => activity.modify
);

export const activityScheduledSelector = createSelector(
  activityDeploymentsSelector,
  activityUndeploymentsSelector,
  activityModificationsSelector,
  (deploy, undeploy, modify) => ({ deploy, undeploy, modify })
);

const getDisabledFromProps = (_, props) => props.disabled;

export const parsedBuildListSelector = createSelector(
  getDisabledFromProps,
  makeActivityBuildListSelector(),
  activityScheduledSelector,
  buildListSelector,
  deploymentListSelector,
  filterTypeSelector,
  (
    disabled,
    activityBuildList,
    scheduled,
    buildList,
    deploymentList,
    filterType
  ) =>
    constructBuildList({
      buildList: disabled ? activityBuildList : buildList,
      deploymentList,
      filterType,
      scheduled,
    })
);

const deepArrayEqualityWith = (prev, curr) =>
  isEmpty(xorWith(prev, curr, isEqual));

const deepArrayEqualityWithSelector = createSelectorCreator(
  defaultMemoize,
  deepArrayEqualityWith
);

export const makeParsedBuildListSelector = () =>
  deepArrayEqualityWithSelector(parsedBuildListSelector, val => val);

export const isScheduledEmptySelector = createSelector(
  activityScheduledSelector,
  ({ deploy, modify, undeploy }) =>
    isEmpty(deploy) && isEmpty(modify) && isEmpty(undeploy)
);
