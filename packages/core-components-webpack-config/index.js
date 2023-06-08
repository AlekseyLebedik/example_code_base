/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const camelcase = require('camelcase');

const externalCoreComponents = (context, request, callback) => {
  if (/^dw\/core\/components$/.exec(request)) {
    return callback(null, 'window["dw-components"]');
  }
  const isAssets = /^dw\/core\/components\/([^/]+)\/([^/]+)$/;
  const assetMatch = isAssets.exec(request);
  if (assetMatch !== null) {
    const [_, component, asset] = assetMatch;
    return callback(
      null,
      `window["dw-components"]["${component}Assets"]["${asset}"]`
    );
  }
  const isCoreComponent = /^dw\/core\/components\/([^/]+)$/;
  const match = isCoreComponent.exec(request);
  if (match !== null) {
    const component = match[1];
    return callback(null, `window["dw-components"].${component}`);
  }
  return callback();
};

const externalModule = module => (context, request, callback) => {
  const isCoreComponent = new RegExp(`^dw/core/${module}/([^/]+)$`);
  const match = isCoreComponent.exec(request);
  if (match !== null) {
    const component = camelcase(match[1]);
    return callback(null, `window["dw-${module}"].${component}`);
  }
  return callback();
};

module.exports = {
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
      'redux-form': 'ReduxForm',
      'react-router-dom': 'ReactRouterDOM',
      'dw/abtesting-utils': 'window.ABTestingUtils',
      'dw/config': 'window["dw-config"]',
      'dw/core/axios': 'window["dw-axios"]',
      'dw/core/hooks': 'window["dw-hooks"]',
      moment: 'moment',
    },
    externalModule('replicas'),
    externalModule('helpers'),
    externalCoreComponents,
  ],
};
