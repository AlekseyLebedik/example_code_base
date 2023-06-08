import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import flatten from 'lodash/flatten';
import set from 'lodash/set';
import uniq from 'lodash/uniq';

import {
  projectsSelector,
  currentProjectSelector,
} from './components/ProjectSelector/selectors';

import { getScheduleFileName } from './helpers';

export * from './components/ProjectSelector/selectors';

export const currentUserSelector = state => state.user.profile;
export const projectSettingsSelector = state =>
  state.Components.App.projectSettings;
export const templatesSelector = state => state.Components.App.templates;
export const storiesSelector = state => state.Components.App.stories;
export const schedulesSelector = state => state.Components.App.schedules;

/** App/templates */
export const templatesDataSelector = createSelector(
  templatesSelector,
  templatesState => templatesState.data
);

export const templatesLoadingSelector = createSelector(
  templatesSelector,
  templatesState => templatesState.loading
);

export const templatesNextSelector = createSelector(
  templatesSelector,
  templatesState => templatesState.next
);

export const templatesParamsSelector = createSelector(
  templatesSelector,
  templatesState => templatesState.params
);

/** App/stories */
export const storiesDataSelector = createSelector(
  storiesSelector,
  storiesState => storiesState.data || []
);

export const storiesLoadingSelector = createSelector(
  storiesSelector,
  storiesState => storiesState.loading
);

export const storiesNextSelector = createSelector(
  storiesSelector,
  storiesState => storiesState.next
);

export const storiesParamsSelector = createSelector(
  storiesSelector,
  storiesState => storiesState.params
);

export const groupStoriesSelector = createSelector(
  storiesDataSelector,
  storiesDataState =>
    storiesDataState.filter(stories => stories.schedule === null)
);

/** App/schedules */

export const schedulesDataSelector = createSelector(
  schedulesSelector,
  schedules => schedules.data
);

export const schedulesLoadingSelector = createSelector(
  schedulesSelector,
  schedules => schedules.loading
);

export const schedulesParamsSelector = createSelector(
  schedulesSelector,
  schedules => schedules.params
);

export const schedulesNextSelector = createSelector(
  schedulesSelector,
  schedules => schedules.next
);

/** Schedule options as autocomplete-friendly structure */
export const scheduleOptionsSelector = createSelector(
  schedulesDataSelector,
  schedulesData => {
    const groupedScheduleData = new Map();
    schedulesData.forEach(data => {
      const filename = getScheduleFileName(data.filename);
      if (!groupedScheduleData.has(filename)) {
        groupedScheduleData.set(filename, [data]);
      } else {
        groupedScheduleData.get(filename).push(data);
      }
    });

    const orderedSchedulesData = [];
    groupedScheduleData.forEach((data, filename) => {
      const orderedData = orderBy(data, ['version'], ['desc']);
      const groupOption = {
        label: filename,
        options: orderedData.map(option => ({
          label: option.name,
          value: option.id,
        })),
      };
      orderedSchedulesData.push(groupOption);
    });

    return orderedSchedulesData;
  }
);
/** App/projectSettings */

export const projectSettingsDataSelector = createSelector(
  projectSettingsSelector,
  settingsState => settingsState.data
);

export const projectSettingsLoadingSelector = createSelector(
  projectSettingsSelector,
  settingsState => settingsState.loading
);

export const currentProjectSettingsSelector = createSelector(
  projectSettingsDataSelector,
  data => data.find(setting => setting.projectId) || {}
);

export const hasCurrentProjectSettingsSelector = createSelector(
  currentProjectSettingsSelector,
  projectSettings => !isEmpty(projectSettings)
);

export const globalProjectSettingsSelector = createSelector(
  projectSettingsDataSelector,
  data => data.find(setting => !setting.projectId) || {}
);

export const availableProjectSettingsSelector = createSelector(
  hasCurrentProjectSettingsSelector,
  currentProjectSettingsSelector,
  globalProjectSettingsSelector,
  (hasCurrentProjectSettings, currentProjectSettings, globalProjectSettings) =>
    hasCurrentProjectSettings ? currentProjectSettings : globalProjectSettings
);

export const projectSettingsIdSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.id
);

export const DEFAULT_GLOBAL_SETTINGS_NAMES = ['enabled_max_cal_countries'];

export const defaultGlobalSettingsSelector = createSelector(
  globalProjectSettingsSelector,
  globalProjectSettings =>
    Object.keys(globalProjectSettings.globalSettings || {})
      .filter(key => DEFAULT_GLOBAL_SETTINGS_NAMES.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: globalProjectSettings.globalSettings[key],
        }),
        {}
      )
);

export const globalSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  defaultGlobalSettingsSelector,
  (projectSettings, defaultGlobalSettings) =>
    Object.keys(defaultGlobalSettings).reduce(
      (obj, key) => ({
        ...obj,
        [key]: obj[key] ? obj[key] : defaultGlobalSettings[key],
      }),
      { ...projectSettings.globalSettings }
    )
);

// Returns the setting names that are being used from DEFAULT_GLOBAL_SETTINGS_NAMES
export const defaultsInUseSelector = createSelector(
  availableProjectSettingsSelector,
  globalSettingsSelector,
  defaultGlobalSettingsSelector,
  (projectSettings, finalGlobalSettings, defaultGlobalSettings) =>
    Object.keys(defaultGlobalSettings).filter(
      k =>
        !projectSettings.globalSettings.hasOwnProperty(k) &&
        finalGlobalSettings.hasOwnProperty(k)
    )
);

export const activitySettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.activitySettings
);
export const eventSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.eventSettings
);
export const clientEventsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.clientEvents
);
export const platformSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.platformSettings
);
export const colorSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.colorSettings
);
export const notificationSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.notificationSettings
);
export const eventTypeSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.eventTypeSettings
);
export const timewarpSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.timewarpSettings
);
export const calendarPresetsSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  projectSettings => projectSettings.calendarPresetsSettings
);

export const isMissingSettingsSelector = createSelector(
  availableProjectSettingsSelector,
  eventSettingsSelector,
  (projectSettings, eventSettings) =>
    isEmpty(projectSettings) || isEmpty(eventSettings)
);

export const enabledSourcesSelector = createSelector(
  globalSettingsSelector,
  globalSettings => globalSettings.enabled_sources || []
);

// This will now include defaults if the project does not set `enabled_max_cal_countries`
export const enabledMaxCalCountriesSelector = createSelector(
  globalSettingsSelector,
  globalSettings => globalSettings.enabled_max_cal_countries || []
);

export const externalEventSourcesSelector = createSelector(
  enabledSourcesSelector,
  enabledSources =>
    enabledSources.filter(
      key =>
        key === 'holidays' ||
        key === 'video-games' ||
        key === 'sports' ||
        key === 'pmg'
    )
);

export const shouldUseProfileSettingsSelector = createSelector(
  globalSettingsSelector,
  globalSettings =>
    globalSettings.use_profile_settings === undefined
      ? true
      : globalSettings.use_profile_settings
);

export const allowDetachedEventsSelector = createSelector(
  timewarpSettingsSelector,
  timewarpSettings => !!timewarpSettings?.allow_detached_events
);

export const makeEventTypeNameSelector = () =>
  createSelector(eventTypeSettingsSelector, eventTypes => typeKey => {
    const { name } = eventTypes.find(t => t.key === typeKey) || {};
    return name;
  });

/** Affliated Projects */

export const allAffiliatedProjectsSelector = createSelector(
  globalSettingsSelector,
  currentProjectSelector,
  (globalSettings, currentProject) =>
    orderBy(
      uniq([
        currentProject.id,
        ...(globalSettings.affiliated_projects || []),
        'null',
      ]),
      id => (id === 'null' ? Number.MIN_SAFE_INTEGER : id),
      ['desc']
    )
);

export const makeProjectNameSelector = () =>
  createSelector(projectsSelector, projects => projectId => {
    if (projectId === 'null') return 'Cross Project';
    const { name } = projects.find(p => p.id === projectId) || {};
    return name;
  });

export const affiliatedProjectsSelector = createSelector(
  allAffiliatedProjectsSelector,
  makeProjectNameSelector(),
  (affiliatedProjects, getProjectName) =>
    affiliatedProjects.map(projectId => ({
      projectId,
      name: getProjectName(projectId),
    }))
);

export const affiliatedTitlesSelector = createSelector(
  allAffiliatedProjectsSelector,
  projectsSelector,
  (affiliatedProjects, projects) =>
    projects
      .filter(p => affiliatedProjects.includes(p.id))
      .reduce(
        (acc, p) => [...acc, ...p.titles.map(t => ({ ...t, project: p.id }))],
        []
      )
);

export const abTestingAffiliatedTitlesSelector = createSelector(
  affiliatedTitlesSelector,
  affiliatedTitles =>
    affiliatedTitles.reduce(
      (acc, { project, id: title, environments }) => [
        ...acc,
        ...environments.map(({ shortType: envType }) => ({
          project,
          title,
          envType,
        })),
      ],
      []
    )
);

/** user/Profile */
export const currentUserIDSelector = createSelector(
  currentUserSelector,
  currentUser => currentUser.id
);

export const titleEnvsSelector = createSelector(
  currentProjectSelector,
  currentProject => {
    const { titles: projectTitles } = currentProject;
    const titleEnvs = projectTitles.map(({ id: titleId, environments }) =>
      environments.map(environment => ({
        ...environment,
        titleId,
      }))
    );
    return flatten(titleEnvs);
  }
);

/** Title env with label and value */
export const titleEnvOptionsSelector = createSelector(
  currentProjectSelector,
  currentProject => {
    const { titles: projectTitles } = currentProject;
    const titleEnvs = projectTitles.map(title => {
      const {
        id: titleId,
        name: titleName,
        environments: titleEnvironments,
      } = title;

      return titleEnvironments.map(titleEnv => {
        const { id: titleEnvId, type: titleEnvType } = titleEnv;
        return {
          label: `(${titleId}) ${titleName} - ${titleEnvType}`,
          value: titleEnvId,
        };
      });
    });
    return flatten(titleEnvs);
  }
);

/** Temporarily append the story filter options to calendar setting presets */
export const presetOptionsSelector = createSelector(
  calendarPresetsSettingsSelector,
  calendarPresetsSettings =>
    calendarPresetsSettings.map(calendarPresetsSetting => {
      const parsedSettings = JSON.parse(calendarPresetsSetting.path);
      const stories = {
        Group: true,
        Timewarp: true,
        None: true,
      };
      if (!isEmpty(parsedSettings.filters.stories)) {
        const oldStoriesFilter = parsedSettings.filters.stories;
        if (oldStoriesFilter.hasOwnProperty('Group')) {
          stories.Group = oldStoriesFilter.Group;
        }
        if (
          oldStoriesFilter.hasOwnProperty('Timewarp') ||
          oldStoriesFilter.hasOwnProperty('Schedule')
        ) {
          stories.Timewarp =
            oldStoriesFilter.Timewarp || oldStoriesFilter.Schedule;
        }
        if (oldStoriesFilter.hasOwnProperty('None')) {
          stories.None = oldStoriesFilter.None;
        }
      }
      const storiesPath = 'filters.stories';
      const settingsWithStories = JSON.stringify({
        ...set(parsedSettings, storiesPath, stories),
      });
      return {
        ...calendarPresetsSetting,
        path: settingsWithStories,
      };
    })
);

/** Determines whether navigation pages are configured
 *  stories is configured if schedule_type exists in global settings
 */
export const isConfiguredSelector = createSelector(
  globalSettingsSelector,
  globalSettings => ({
    stories: globalSettings && globalSettings.schedule_type,
  })
);
