import {
  SERVICE_NAMES,
  SERVICE_LABELS,
  SERVICE_SWITCHES,
  GLOBAL_GROUP,
} from './constants';

export const isServiceEnabled = (
  serviceName,
  availableServiceConfigs,
  asyncMatchmakingEnabled,
  battlePassEnabled,
  legacyStorageEnabled
) => {
  switch (serviceName) {
    case SERVICE_NAMES.ABTESTING:
      return !!availableServiceConfigs.has('ABTESTING');
    case SERVICE_NAMES.ACHIEVEMENTS:
      return !!availableServiceConfigs.has('ACHIEVEMENTSENGINE');
    case SERVICE_NAMES.INVENTORY:
      return !!availableServiceConfigs.has('MARKETPLACE');
    case SERVICE_NAMES.MATCHMAKING:
    case SERVICE_NAMES.LEADERBOARDS:
      return !!asyncMatchmakingEnabled;
    case SERVICE_NAMES.BATTLEPASS:
      return !!battlePassEnabled;
    case SERVICE_NAMES.STORAGE:
      return !!legacyStorageEnabled;
    default:
      return false;
  }
};

export const optionsSelector = ({ player }, hasFeaturesEnabledFunc) => {
  const availableServiceConfigs = new Set();
  let asyncMatchmakingEnabled = false;
  let battlePassEnabled = false;
  let legacyStorageEnabled = false;
  const titleOptions = [];
  //   eslint-disable-next-line no-unused-expressions
  player.envs?.forEach(({ options, serviceConfigs, title }) => {
    const parsedOptions = JSON.parse(options);
    if (parsedOptions.async_matchmaking_enabled) asyncMatchmakingEnabled = true;
    if (parsedOptions.player_battle_pass_enabled) battlePassEnabled = true;
    if (parsedOptions.legacy_storage_enabled) legacyStorageEnabled = true;
    titleOptions.push({
      value: title.id,
      label: title.name,
    });
    serviceConfigs.forEach(config => availableServiceConfigs.add(config.type));
  });
  const serviceOptions = Object.values(SERVICE_NAMES)
    .filter(
      value =>
        !SERVICE_SWITCHES[value] ||
        hasFeaturesEnabledFunc(SERVICE_SWITCHES[value], false)
    )
    .map(value => ({
      value,
      label: SERVICE_LABELS[value],
      disabled: !isServiceEnabled(
        value,
        availableServiceConfigs,
        asyncMatchmakingEnabled,
        battlePassEnabled,
        legacyStorageEnabled
      ),
    }));
  return [
    GLOBAL_GROUP,
    { groupLabel: 'titles', options: titleOptions },
    { groupLabel: 'services', options: serviceOptions },
  ];
};
