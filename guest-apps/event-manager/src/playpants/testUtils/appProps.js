import {
  activitySettingsSelector,
  calendarPresetsSettingsSelector,
  colorSettingsSelector,
  currentProjectSelector,
  eventSettingsSelector,
  eventTypeSettingsSelector,
  globalSettingsSelector,
  notificationSettingsSelector,
  platformSettingsSelector,
} from 'playpants/components/App/selectors';
import mockState from './mockState';

export const activitySettings = activitySettingsSelector(mockState);
export const calendarPresetSettings =
  calendarPresetsSettingsSelector(mockState);
export const colorSettings = colorSettingsSelector(mockState);
export const currentProject = currentProjectSelector(mockState);
export const eventSettings = eventSettingsSelector(mockState);
export const eventTypeSettings = eventTypeSettingsSelector(mockState);
export const globalSettings = globalSettingsSelector(mockState);
export const notificationSettings = notificationSettingsSelector(mockState);
export const platformSettings = platformSettingsSelector(mockState);

export const appProps = {
  currentProject,
  fetchProjectSettings: jest.fn(),
  fetchUsers: jest.fn(),
  isMissingSettings: true,
  match: { params: { projectId: 1, env: 'cert' } },
  permissions: {
    adminPermission: true,
    eventWritePermission: true,
    pubvarsWritePermission: true,
    pyscriptWritePermission: true,
    pubstorageWritePermission: true,
    achievementWritePermission: true,
    publisherObjectsWritePermission: true,
    tpDeploymentWritePermission: true,
  },
  setProject: jest.fn(),
  setTitle: jest.fn(),
};
