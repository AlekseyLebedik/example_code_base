export const selectAccountsServiceConfigId = (data, env) => {
  if (data?.serviceConfigs) {
    const { id } =
      data.serviceConfigs.find(config =>
        config.name.toUpperCase().includes(env)
      ) || {};
    return id;
  }
  return undefined;
};

const generateFilterPath = ({ clanId, env }) => {
  const params = new URLSearchParams({ clanId, env });
  return params.toString();
};

export const setClansURL = ({ history, clanId, env }) => {
  history.push({ search: generateFilterPath({ clanId, env }) });
};

export const parseQueryString = query => {
  const urlParams = new URLSearchParams(query);
  const options = {};
  urlParams.forEach((value, key) => {
    options[key] = value;
  });
  return options;
};

export const validateEnv = env =>
  ['DEV', 'CERT', 'LIVE'].includes(env) ? env : null;

export const validateClanId = clanId => (/^\d+$/.test(clanId) ? clanId : null);
