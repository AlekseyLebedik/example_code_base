import { ENV_TYPES } from './environment';

export const ENV_TYPE_UNKNOWN = 'Unknown';

export const OPTION_TYPE_GLOBAL = 'global';
export const OPTION_TYPE_THUNDERPANTS = 'thunderpants';

export const OPTION_TYPES = [
  ...ENV_TYPES.map(({ id, type }) => ({
    id,
    env_type: type,
    option_type: OPTION_TYPE_GLOBAL,
  })),
  {
    id: 3,
    env_type: ENV_TYPE_UNKNOWN,
    option_type: OPTION_TYPE_THUNDERPANTS,
  },
];
