export const QUERY_CONTEXT_INITIAL_STATE = {
  clanId: null,
  serviceConfigId: null,
};

export const CONTEXT_INITIAL_STATE = {
  ...QUERY_CONTEXT_INITIAL_STATE,
  serviceConfigs: [],
  onExternalClanIdOverride: () => {},
  onSelectClanId: () => {},
  onSetServiceConfig: () => {},
  titleId: null,
};

export const ENVS = { PROD: 'PROD', DEV: 'DEV', CERT: 'CERT' };

export const ENV_SHORTTYPE_MAP = {
  DEV: 'dev',
  CERT: 'cert',
  PROD: 'live',
};
