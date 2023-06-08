/* eslint-disable */

export const getFeatureSwitches = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(featureSwitches), 500)
  );

const featureSwitches = {
  data: [
    {
      name: 'ONLINE_CONFIGURATION_ACCOUNTS',
      active: true,
    },
    {
      name: 'ONLINE_CONFIGURATION_SECURITY',
      active: false,
    },
  ],
};
