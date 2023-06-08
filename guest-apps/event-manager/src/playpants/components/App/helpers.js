import { DEFAULT_PROJECT_SETTINGS } from 'playpants/constants/projectSettings';
/* returns JSON object of schema from stringified script */
export const parseSchema = data => {
  try {
    let { schema } = data;
    schema = schema.replace(/'/g, '"');
    schema = schema.replace(/True/g, true);
    schema = schema.replace(/False/g, false);
    return JSON.parse(schema);
  } catch (e) {
    return {};
  }
};

const settingParser = (setting, type) =>
  setting ? JSON.parse(setting) : DEFAULT_PROJECT_SETTINGS[type];

/* parses individual project settings objects from JSON */
export const parseProjectSettingsHelper = ({
  activity_settings: activitySettings,
  calendar_presets_settings: calendarPresetsSettings,
  client_events: clientEvents,
  color_settings: colorSettings,
  event_settings: eventSettings,
  event_type_settings: eventTypeSettings,
  id,
  notification_settings: notificationSettings,
  platform_settings: platformSettings,
  project: projectId,
  settings: globalSettings,
  timewarp_settings: timewarpSettings,
}) => ({
  activitySettings: settingParser(activitySettings, 'activitySettings'),
  calendarPresetsSettings: settingParser(
    calendarPresetsSettings,
    'calendarPresetsSettings'
  ),
  clientEvents: settingParser(clientEvents, 'clientEvents'),
  colorSettings: settingParser(colorSettings, 'colorSettings'),
  eventSettings: settingParser(eventSettings, 'eventSettings'),
  eventTypeSettings: settingParser(eventTypeSettings, 'eventTypeSettings'),
  globalSettings: settingParser(globalSettings, 'globalSettings'),
  id,
  notificationSettings: settingParser(
    notificationSettings,
    'notificationSettings'
  ),
  platformSettings: settingParser(platformSettings, 'platformSettings'),
  projectId,
  timewarpSettings: settingParser(timewarpSettings, 'timewarpSettings'),
});

/* returns formatted project settings for the redux store */
export const parseProjectSettings = data =>
  data.map(setting => parseProjectSettingsHelper(setting));

/* returns a substring of the title removing prepended project name */
export const getTitleNameSubstring = title =>
  title.name.substring(title.name.indexOf('-') + 1);

/* filters titles and returns the title name of given titleId */
export const getTitleName = (titleId, titles, substring = true) => {
  if (titles) {
    const title = titles.find(t => t.id === titleId);
    return substring ? getTitleNameSubstring(title) : title.name;
  }
  return null;
};

export const getScheduleFileName = filename => {
  const lastDot = filename.lastIndexOf('.');
  return filename.substring(0, lastDot);
};
