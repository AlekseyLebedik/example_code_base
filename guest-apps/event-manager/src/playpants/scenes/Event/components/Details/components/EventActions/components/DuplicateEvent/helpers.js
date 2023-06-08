import { NEW_ACTIVITY_SETTINGS } from 'playpants/constants/activities';

export const formatAchievementEngine = activity => {
  const { ae } = NEW_ACTIVITY_SETTINGS;
  const {
    ruleset_to_activate: { label },
  } = activity;
  return {
    ...ae,
    ruleset_to_duplicate: label,
  };
};

export const formatActivity = (activity, type) => {
  switch (type) {
    case 'ae':
      return formatAchievementEngine(activity);
    default:
      return activity;
  }
};

export function redirectToDuplicatedEvent(baseUrl, { id }, history) {
  history.replace(`${baseUrl}events/${id}`);
}
