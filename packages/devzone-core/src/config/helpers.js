export const toNumber = value => {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
};

export const toObject = value => {
  try {
    return !value ? {} : JSON.parse(value);
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error('Error parsing JSON from the configuration file');
    return {};
  }
};

export const toBoolean = value => String(value).toLowerCase() === 'true';

export const isDefined = value => value !== undefined;

const identity = value => value;

export const getConfig = (
  appConfigValue,
  envConfigValue,
  convertValue = identity
) => {
  if (isDefined(appConfigValue)) {
    return convertValue(appConfigValue);
  }

  return convertValue(envConfigValue);
};
