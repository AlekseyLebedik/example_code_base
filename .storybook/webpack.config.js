const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    },
  ];
  config.resolve.alias = {
    '@gvs': path.resolve(
      __dirname,
      '..',
      'src',
      'dw',
      'online-configuration',
      'scenes',
      'gvs'
    ),
  };

  return config;
};
