export { STATUS_GROUPS } from 'dw/core/components/EventsCalendar/constants';

export const HEADER_TIME_FORMATS = {
  year: {
    short: 'YY',
    medium: 'YYYY',
    long: 'YYYY',
  },
  month: {
    short: 'MMM',
    medium: 'MMM',
    long: 'MMMM',
  },
  day: {
    short: 'D',
    medium: 'ddd D',
    long: 'dddd D',
  },
  hour: {
    short: 'hA',
    medium: 'h A',
    long: 'h A',
  },
  minute: {
    short: 'mm',
    medium: 'h:mm',
    long: 'h:mm',
  },
};

export const SOURCE_GROUPS = {
  abTesting: 'A/B Testing',
  demonwareEvents: 'Demonware',
  eventManager: 'Event Manager',
  externalEvents: 'External',
  informationalEvents: 'Informational',
};

export const ENV_GROUPS = {
  Development: 'Development',
  Certification: 'Certification',
  Live: 'Live',
  Unknown: 'Cross Environment',
};

export const GROUP_SELECTIONS = {
  type: 'Source',
  env_type: 'Environment',
  status: 'Status',
};

export const TIME_STEPS = {
  minute: 5,
  hour: 1,
  day: 1,
  month: 1,
  year: 1,
};
