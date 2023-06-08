import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import {
  activitySettingsSelector,
  currentProjectSelector,
  globalSettingsSelector,
} from 'playpants/components/App/selectors';
import { eventIdSelector } from 'playpants/scenes/Event/selectors';
import { ACTIVITY_TYPES } from 'playpants/constants/activities';
import {
  orderedActivitiesSelector,
  projectTitlesSelector,
} from '../../selectors';

const getActivityProps = (_, props) => props;

const getSelectedIdFromProps = (_, props) => parseInt(props.selectedItemId, 10);

export const selectedActivitySelector = createSelector(
  getSelectedIdFromProps,
  orderedActivitiesSelector,
  (selectedId, activities) =>
    activities.find(activity => activity.id === selectedId) || {}
);

const disabledSelector = createSelector(
  getActivityProps,
  selectedActivitySelector,
  ({ disabled }, { type }) => type && disabled
);

const activityStateSelector = state => state.Scenes.Event.activity;

const envSettingsSelector = createSelector(
  activityStateSelector,
  ({ envSettings }) => envSettings.data
);

const titlePlatformContextData = createSelector(
  activityStateSelector,
  ({ contexts }) => contexts.data
);

const selectedTitleSelector = createSelector(
  projectTitlesSelector,
  selectedActivitySelector,
  envSettingsSelector,
  (titles, { title_envs: titleEnvs }, envSettings) => {
    if (isEmpty(titleEnvs)) return undefined;
    const selectedTitle = titles.find(t =>
      t.environments.find(tEnv => tEnv.id === titleEnvs[0])
    );
    return {
      ...selectedTitle,
      env: { ...selectedTitle.env, ...envSettings },
    };
  }
);
// TODO: Move this context to event in next PR
export const eventContextValuesSelector = createSelector(
  eventIdSelector,
  currentProjectSelector,
  projectTitlesSelector,
  globalSettingsSelector,
  getActivityProps,
  (
    eventId,
    currentProject,
    titles,
    globalSettings,
    { classes, eventUrl, eventData }
  ) => ({
    eventId,
    currentProject,
    titles,
    globalSettings,
    classes,
    eventUrl,
    eventData,
    hasEndDate: !!eventData.end_at,
  })
);

export const activityContextValuesSelector = createSelector(
  eventContextValuesSelector,
  activitySettingsSelector,
  selectedActivitySelector,
  selectedTitleSelector,
  titlePlatformContextData,
  disabledSelector,
  (
    eventContext,
    activitySettings,
    selectedActivity,
    selectedTitle,
    contextList,
    disabled
  ) => {
    // Sets the context settings based on the selected activity
    const { context = {} } =
      activitySettings.find(
        setting => setting.type === selectedActivity.type
      ) || {};
    // Only show the context is the activities context settings is enabled and is multi context is enabled
    const showContext =
      context.is_enabled && eventContext.globalSettings.is_multicontext;
    // Will use default filter options is there are no userselectable contexts in the context list
    const { type: contextType = '' } = context || {};
    const useDefaultFilterOptions = !contextList.find(
      currentContext =>
        currentContext.userSelectable &&
        (currentContext.type.toLowerCase() === contextType ||
          currentContext.type.toLowerCase() === 'any')
    );
    // Fallback options if using default filter options
    const defaultContextOptions = {
      title: contextList.find(
        item => !item.userSelectable && item.type === 'Title'
      ),
      any: contextList.find(
        item => !item.userSelectable && item.type === 'Any'
      ),
      other:
        contextList.find(item => !item.userSelectable && item.type === '') ||
        {},
    };
    // Check if service is configured based on the activity
    const activityType = selectedActivity.type;
    const selectedTitleEnv = selectedTitle && selectedTitle.env;
    let isServiceConfigured = false;
    switch (activityType) {
      case ACTIVITY_TYPES.ACHIEVEMENTS_ENGINE: {
        isServiceConfigured = !!selectedTitleEnv && selectedTitleEnv.usesAE;
        break;
      }
      case ACTIVITY_TYPES.PUBLISHER_OBJECTS: {
        isServiceConfigured =
          !!selectedTitleEnv && selectedTitleEnv.usesObjectStore;
        break;
      }
      default:
        break;
    }
    return {
      ...eventContext,
      activitySettings,
      contextList,
      disabled,
      noContextSelected: !selectedActivity.context,
      noTitleSelected: !selectedTitle,
      selectedActivity,
      selectedTitle,
      showContext,
      defaultContextOptions,
      useDefaultFilterOptions,
      isServiceConfigured,
    };
  }
);
