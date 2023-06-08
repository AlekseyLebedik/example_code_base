/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

const {
  override,
  overrideDevServer,
  addPostcssPlugins,
  fixBabelImports,
  disableEsLint,
  addWebpackAlias,
} = require('customize-cra');
const tailwindcss = require('tailwindcss');
const webpack = require('webpack');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const addWebpackPlugin = plugin => webpackConfig => {
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }
  webpackConfig.plugins.push(plugin);
  return webpackConfig;
};

const path = require('path');

const devServerConfig = () => config => {
  config.contentBase = config.contentBase || [];
  if (!Array.isArray(config.contentBase))
    config.contentBase = [config.contentBase];
  process.env.REACT_APP_GUEST_APPS.split(',').forEach(guestApp => {
    const location = process.env[`REACT_APP_${guestApp}_LOCATION`];
    config.contentBase.push(
      path.join(__dirname, `public${location}/static/js`)
    );
    config.contentBase.push(
      path.join(__dirname, `public${location}/static/media`)
    );
  });
  config.watchContentBase = true;
  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
  webpack: override(
    // Disable eslint due to conflicts between our eslintrc and react-scripts'
    disableEsLint(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addPostcssPlugins([
      tailwindcss('node_modules/@demonware/devzone-core/helpers/tailwind.js'),
    ]),
    addWebpackPlugin(
      new MonacoEditorWebpackPlugin({
        languages: ['mysql', 'pgsql', 'sql', 'json', 'python'],
      })
    ),
    process.env.NODE_ENV === 'production'
      ? null
      : addWebpackPlugin(new webpack.EvalSourceMapDevToolPlugin()),
    // Disable this warnings as it is a false warning comming from antd
    // Once we upgrade antd or react-scripts again, we must test the build
    // without this plugin
    addWebpackPlugin(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    ),
    addWebpackPlugin(
      new FilterWarningsPlugin({
        exclude: /text-decoration-skip/,
      })
    ),
    addWebpackPlugin(
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        ReactRedux: 'react-redux',
        ReactRouterDOM: 'react-router-dom',
        ReduxForm: 'redux-form',
        moment: 'moment-timezone',
        PropTypes: 'prop-types',
      })
    ),
    addWebpackAlias({
      '@gvs': path.resolve(
        __dirname,
        './src/dw/online-configuration/scenes/gvs'
      ),
    })
  ),
};
