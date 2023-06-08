export const GROUP_NAME_MAP = {
  environments: 'Envs',
  platforms: 'Platforms',
  Development: 'Dev',
  Certification: 'Cert',
  CROSSPLAY: 'Crossplay',
  abTesting: ' A/B Testing',
  cdl: 'Call of Duty League',
  criticalEvents: 'Critical Events',
  demonwareEvents: 'Demonware Critical Events',
  demonwareABTesting: 'Demonware Services Events',
  demonwareExpyTesting: 'EXPY',
  eventManager: 'Event Manager',
  externalEvents: 'Calendars',
  pmg: 'PMG Live Ops Schedule',
  holidays: 'MaxCal Global Events',
  generalComments: 'General Comments',
  informationalEvents: 'Informational',
  projects: 'Titles',
  'first-party': 'First Party',
};

export const SOURCES_EVENT_TYPES = [
  'eventManager',
  'demonwareEvents',
  'informationalEvents',
  'externalEvents',
  'abTesting',
  'expyTests',
];

export const FILTER_KEYS = {
  eventManager: 'sources.eventManager',
  demonwareEvents: 'sources.demonwareEvents',
  informationalEvents: 'sources.informationalEvents',
  externalEvents: 'sources.externalEvents',
  abTesting: 'sources.abTesting',
  demonwareABTesting: 'sources.abTesting.demonwareABTesting',
  demonwareExpyTesting: 'sources.abTesting.demonwareExpyTesting',
  titles: 'projects',
};

export const NON_VISIBLE_FILTERS_PATH = {
  holidays: 'sources.externalEvents.holidays',
  pmg: 'sources.externalEvents.pmg',
};
