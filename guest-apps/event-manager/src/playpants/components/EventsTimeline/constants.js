import { defaultHeaderFormats } from 'react-calendar-timeline/lib/lib/default-config';

export const headerFormats = {
  ...defaultHeaderFormats,
  month: {
    long: 'MMMM YYYY',
    mediumLong: 'MMMM',
    medium: 'MMMM',
    short: 'MMM',
  },
  day: {
    long: 'ddd, DD',
    mediumLong: 'ddd, DD',
    medium: 'dd D',
    short: 'D',
  },
  hour: {
    long: 'HH:00 - HH:59',
    mediumLong: 'HH:00 - HH:59',
    medium: 'HH:00',
    short: 'HH',
  },
};

export const TIMELINE_GROUPS = [
  { key: 'nogroup', value: 'No Group' },
  { key: 'projects', value: 'Titles' },
  { key: 'environments', value: 'Environments' },
  { key: 'platforms', value: 'Platforms' },
  { key: 'demonwareEvents', value: 'Critical Events' },
  { key: 'externalEvents', value: 'Calendars' },
  { key: 'abTesting', value: 'A/B Testing' },
];

export const ALLOWED_GROUPS = TIMELINE_GROUPS.map(({ key }) => key);

export const EDITABLE_TYPES = ['eventManager', 'abTesting'];
