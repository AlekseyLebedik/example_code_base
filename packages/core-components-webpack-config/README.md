Transforms core components assigned to window into webpack externals

Should be used in `config-overrides.js` to resolve external dw core components:

 - `dw/core/components/TitleSelector` > `window['dw-components']['TitleSelector']`

 - `dw/core/components/TitleSelector/actions` > `window['dw-components']['TitleSelectorAssets']['actions']`

 - `dw/config` > `window['dw-config']`

 - `dw/abtesting-utils` > `window.ABTestingUtils`

 - `dw/core/axios` > `window['dw-axios']`

 - `dw/core/helpers/object` > `window['dw-helpers']['object']`

 - `dw/core/replicas/user` > `window['dw-replicas']['user']`

# Install

The package is available through the Demownare Artifactory NPM repository. To setup add the following to your `.yarnrc`

**.yarnrc**
```
"@demonware:registry" "https://artifactory.ihs.demonware.net/api/npm/demonware-npm/"
```

To install the package simply run

```bash
yarn add -D @demonware/core-components-webpack-config
```

For more details on how to setup see: https://artifactory.ihs.demonware.net/webapp/#/artifacts/browse/tree/General/demonware-npm-release-local

# Usage

**config-overrides.js**
```js
const {
  override,
  addWebpackExternals
} = require("customize-cra");

const coreComponents = require("@demonware/core-components-webpack-config");

module.exports = {
  webpack: override(
    ...,
    addWebpackExternals(coreComponents.externals)
  )
};

```
