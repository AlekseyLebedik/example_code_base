export const urlPattern = '/online-configuration/:titleId/:env';
export const SCENES = {
  DRAFTS: 'drafts',
  EVENTS: 'events',
  CONFIGURATION: 'configuration',
  VARIABLE_DEFINITIONS: 'variable-definition',
  COMPARE: 'compare',
  GROUPS: 'groups',
};
export const gvsUrlPattern = `${urlPattern}/gvs/:scene(${Object.values(
  SCENES
).join('|')})/:scopeURI?`;

export const MAX_DRAFT_NAME_LENGTH = 64;

export const PLAYER = 'player_p';

export const GLOBAL_PLAYERS = 'global:player_p';
export const GLOBAL_DEDI = 'global:dedi';
export const GLOBAL_UDP = 'global:udp';

export const GLOBAL_NON_PLAYER = [GLOBAL_DEDI, GLOBAL_UDP];

export const POPULATION_TYPE_OPTIONS = [
  { value: GLOBAL_PLAYERS, label: 'Players' },
  { value: GLOBAL_DEDI, label: 'Dedis' },
  { value: GLOBAL_UDP, label: 'UDP Relay' },
];

export const POPULATION_TYPE_LABELS = POPULATION_TYPE_OPTIONS.reduce(
  (acc, { value, label }) => ({ ...acc, [value]: label }),
  {}
);

export const DEFAULT_POPULATIONS = {
  player_p: [{ value: 'global:player_p', label: 'global' }],
  dedi: [{ value: 'global:dedi', label: 'global' }],
  udp: [{ value: 'global:udp', label: 'global' }],
};
