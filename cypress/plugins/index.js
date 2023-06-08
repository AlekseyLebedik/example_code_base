// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = `cypress/config/${file}.json`;
  return fs.readJson(path.join(__dirname, '../../', pathToConfigFile));
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // allows user to console.log data from cypress (used when cy.log() is not printing correctly)
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
  });

  // eslint-disable-next-line consistent-return
  on('before:browser:launch', (browser = {}, args) => {
    if (
      browser.name === 'chrome' ||
      (browser.family === 'chromium' && browser.name !== 'electron')
    ) {
      const ignoreXFrameHeadersExtension = path.join(
        __dirname,
        '../extensions/ignore-x-frame-headers'
      );
      args.push(
        '--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process'
      );
      args.push(`--load-extension=${ignoreXFrameHeadersExtension}`);
    }
    return args;
  });

  const environment = config.env.configFile;
  const configForEnvironment = getConfigurationByFile(environment);

  return configForEnvironment || config;
};
