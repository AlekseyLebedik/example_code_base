/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

const {
  override,
  overrideDevServer,
  addPostcssPlugins,
  fixBabelImports,
  disableEsLint,
  setWebpackOptimizationSplitChunks,
  addWebpackExternals,
} = require('customize-cra');
const tailwindcss = require('tailwindcss');
const webpack = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const coreConfig = require('@demonware/core-components-webpack-config');

const addWebpackPlugin = plugin => webpackConfig => {
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }
  webpackConfig.plugins.push(plugin);
  return webpackConfig;
};

const devServerConfig = () => config => {
  config.writeToDisk = true;
  return config;
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
  webpack: override(
    config => {
      if (!config.output) {
        config.output = {};
      }
      config.output.globalObject = 'self';
      config.output.publicPath =
        process.env.ASSET_PATH || 'http://localhost:3003/';
      if (process.env.NODE_ENV !== 'production')
        config.output.path = process.env.OUTPUT_PATH;
      return config;
    },
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
    process.env.NODE_ENV === 'production'
      ? null
      : addWebpackPlugin(new webpack.EvalSourceMapDevToolPlugin()),
    process.env.NODE_ENV === 'production'
      ? null
      : addWebpackPlugin(
          new webpack.SourceMapDevToolPlugin({
            sourceRoot: 'http://localhost:3003/',
          })
        ),
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
    setWebpackOptimizationSplitChunks({
      cacheGroups: {
        default: false,
      },
    }),
    addWebpackExternals(coreConfig.externals)
  ),
};
