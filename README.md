# Devzone Frontend

[![Build Status](https://jenkins.ihs.demonware.net/buildStatus/icon?job=Devzone%2FDevzoneFrontend%2Fmaster)](https://jenkins.ihs.demonware.net/job/Devzone/job/DevzoneFrontend/job/master/)

Devzone is a web app dashboard and information interface to Demonware's game
titles and inventory.

[Frontend docs page](https://github.ihs.demonware.net/pages/Demonware/devzone-frontend/storybook/index.html)

## Devzone Development Environment

For development, you need these two components:

- [Devzone (API)](https://github.ihs.demonware.net/Demonware/devzone) (optional local setup)
- Devzone Frontend (this repository)

This guide only covers Devzone Frontend.

For the API, we have the following options:

- Connecting to QA API (default behavior)
- Running it locally, please read [How can I connect my local frontend to local API?](#how-can-i-connect-my-local-frontend-to-local-api)

For the frontend, we have the following options:

- Vagrant **(recommended on Windows)**
- Local installation of Node.js **(recommended on other platforms)**
- Docker

### Vagrant

[Vagrant](https://www.vagrantup.com/) is a way of creating pre-configured development environments. The Devzone team have created a `Vagrantfile` with all of the tooling necessary to develop.
You do not need to develop via Vagrant but it may make setup in certain situations (e.g. Windows) easier.

**Requirements**
- Your Windows is fairly up to date
- Hyper-V is disabled on Windows Features
- Intel VT-x BIOS option is enabled
- [Vagrant](https://www.vagrantup.com/docs/installation/) is installed
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) Windows hosts is installed

In the root of this repository run the following commands **as administrator**:

```
vagrant up
vagrant ssh
```

If all the requirements are met, you will then be placed into a development shell in a virtual machine. The `devzone-frontend` folder has been mounted and you can start your development from there:

```
cd devzone-frontend/
```

Additionally if you have checked out the [Devzone API](https://github.ihs.demonware.net/Demonware/devzone/) repository it will be mounted under the `devzone-backend/` folder.


### Hot-reloading on Vagrant/Windows
[vagrant-fsnotify](https://github.com/adrienkohlbecker/vagrant-fsnotify) Vagrant plugin can be used to enable hot-reloading on Windows/Vagrant setup. File-system events are not automatically forwarded to the guest OS and therefore hot-reload does not work out of the box.

This plugin should automatically be installed by the first `vagrant up`. Alternatively, it can be installed by running the following command on the host machine.
```
vagrant plugin install vagrant-fsnotify
```

And finally, the following command should be running on the host machine while you are developing.
```
vagrant fsnotify
```


### Installing dependencies

_Skip to **Starting the app** if you are using the Docker image or Vagrant._

On your computer, you need:

- Node.js >=8.x (LTS): install from the [Node.js website](https://nodejs.org/en/) or use `Homebrew` (Mac) or [nvm](https://github.com/creationix/nvm) (Mac/Linux)
- Install [Yarn](https://yarnpkg.com/)
- Install [Watchman](https://facebook.github.io/watchman/docs/install) (used to watch files change)

Then, run this command from the root of the Devzone Frontend repo. This will automatically install all the dependencies you need:

```
yarn
```

As dependencies will be updated overtime, rerun this command if you see any dependency errors.

### Redirect API calls to Devzone backend

By default frontend application redirects API calls to Devzone QA.

If you need to make backend changes, you can test them locally also by setting your `.env.local` this way:

```
REACT_APP_API_HOST=http://127.0.0.1:8081
REACT_APP_AUTH_SERVICE_PROVIDER_HOST=http://127.0.0.1:8081
REACT_APP_LEGACY_HOST=http://127.0.0.1:8081
REACT_APP_AUTH_CLIENT=react
```

NOTE: You may need to create it first as it is not under git control.

### Starting the app

Update your local dependencies with
```
yarn install
```

Then simply run this command from the root of the Devzone Frontend repo:

```
yarn start
```

or:

```
docker-compose up
```

`Devzone Frontend` will be available at http://127.0.0.1:3000 in your browser.

Any changes you make will be automatically picked up and reload the application.
NOTE: If you make changes to the .env.local file you will need to stop and start the app (`yarn start`) to pick up those changes.
Optionally, you can set up a tool like [nodemon](https://nodemon.io/) to keep track of configuration files and run it in the root folder with:

```
nodemon -w .env.local
```

If you run into an `401 Unauthorized` error while installing the dependencies, confirm that you can log into [Artifactory](https://artifactory.ihs.demonware.net/) using your **DW LDAP** credentials and then use the following command to save your credentials.
```
npm login --registry=https://artifactory.ihs.demonware.net/api/npm/demonware-npm/
```

### Running production like build locally

First of all you have to build host and guest apps in a way they can run locally.

Run `yarn local:build` inside `devzone-frontend` and inside every guest app.

Once build finish run `yarn serve:app` inside `devzone-frontend` and inside every guest app.

Now simply navigate to http://127.0.0.1:3000 in your browser.


### Other available commands

Our `package.json` contains a lot of useful commands:

- `analyze:*` commands are used to understand our bundle size and optimize it
- `format` runs our code formatting tool
- `lint` runs code analysis
- `start` starts the application in development mode
- `build` builds a production bundle
- `test` runs all unit tests
- `e2e` runs the mock api and open Cypress for you
- `ci:*` commands are only used by the CI

### Component Aliases

To avoid the relative and very long absolute imports we are using webpack aliases for the components.

- `@gvs` points to `src/dw/online-configuration/scenes/gvs`

### Tools documentation

Most of our tooling is standard. We use the configuration of [create-react-app](https://github.com/facebook/create-react-app) to spend the less time on tooling and still have a good development environment.

Please take a look at the [official documentation](DOCS.md).

## Development

Please take a look at our [Devzone Studio - Developer's Guide](https://github.ihs.demonware.net/Demonware/devzone-frontend/tree/master/docs#devzone-studio---developers-guide) to get more information about our recommended best practices, tooling and useful resources.

## Deployments

### Location

All deployments of Devzone Studio Frontend now live in Kubernetes ([QA](https://devzone-studio-qa.demonware.net): i1.kube.demonware.net, [Prod](https://devzone-studio.demonware.net): s1.kube.demonware.net).

### How to deploy

All deployments should happen from `master` or a `release/*` branch. Docs on the exact process are available [here](https://github.ihs.demonware.net/Demonware/devzone-deploy#how-to-deploy).

## FAQ

### I have pulled from `master` and run `yarn start` and the app crashes before starting. What should I do?
If you are seeing an application crash on starting the app on `master`, it is possible that you need to update your local dependencies.
Remember to run `yarn install` before starting the app.
If you are running guest-apps, please refer to the [guest-app documentation below](https://github.ihs.demonware.net/Demonware/devzone-frontend#guest-apps).

If you try the steps mentioned above and you still see the app crashing on `master`, please [contact us](https://github.ihs.demonware.net/Demonware/devzone-frontend#contact-us).

### I am making changes in the codebase but I cannot see them reflected in my local app
Are you making changes to files under `packages/devzone-core/`?
If so, you may need to re-build the devzone-core package to see the changes.
We suggest you use this command, so any change will automatically rebuild the local package:
```
cd packages/devzone-core && yarn && yarn build && yarn build:watch
```

Are you making changes to files under `src/dw/core` and cannot see your changes in a guest-app?
Follow the [guest-app documentation below](https://github.ihs.demonware.net/Demonware/devzone-frontend#guest-apps) to see how to update dependencies for guest-apps.
Please remember that changes done in `src/dw/core` should be done in conjunction with the Devzone team, who can advise further. Please [contact us](https://github.ihs.demonware.net/Demonware/devzone-frontend#contact-us) if you haven't already.


### I want to add/run e2e tests locally

We can run the e2e tests in two modes: `run` and `open`.
In `open` mode we can select the spec file that we want to run and see the test running in Cypress UI. When using `run` mode all the tests run in headless mode.
The `run` command runs tests faster, and is the default option for the CI pipeline. It still creates snapshots of the virtual UI when a test fails.

To run the end to end tests, use one of the following depending on the environment you want to run your tests on:

- When using local backend:
  1. Make sure that all the backend services are running. For that go to the backend devzone folder and run `make run-devzone run-lsgmmp20 run-object-store run-citadel run-ae run-marketplace run-abtesting`
  2. Paste these variables into `.env.local`:
   ```
   # Local
  REACT_APP_API_HOST=http://127.0.0.1:8081
  REACT_APP_AUTH_SERVICE_PROVIDER_HOST=http://127.0.0.1:8081
  REACT_APP_LEGACY_HOST=http://127.0.0.1:8081
  REACT_APP_AUTH_CLIENT=react-e2e-local
   ```
  3. Start up the frontend by going to the frontend folder and running `yarn start`
  4. After that in a separate terminal tab run `yarn cypress:open:local` for open mode or `yarn cypress:run:local` for run mode.
- When using QA backend:
   1. Paste these variables into `.env.local`:
  ```
  # QA
  REACT_APP_API_HOST=https://devzone-api-gateway-qa.demonware.net
  REACT_APP_AUTH_SERVICE_PROVIDER_HOST=https://devzone-qa.demonware.net
  REACT_APP_LEGACY_HOST=https://devzone-qa.demonware.net
  ALLOW_E2E_AUTH_BYPASS=true # Needed to bypass Cypress domain change issue DZ-8419
  REACT_APP_AUTH_CLIENT=react-e2e-local
  ```
  2. To run QA Frontend against QA Backend, open a terminal in the Frontend root directory and run `yarn cypress:open:qa`. To run with local Frontend you need to change the parameters below in `cypress/config/development.json` and run the tests with `yarn cypress:open:dev`:
  ```
  "baseUrl": "http://localhost:3000/",
  "env": {
    "backendUrl": "https://devzone-api-gateway-qa.demonware.net",
    "authUrl": "https://devzone-qa.demonware.net/login/external",
    ...
  ```
- When using Prod backend:
  1. Paste these variables into `.env.local`:
  ```
  # Prod
  REACT_APP_VERSION=dev-dirty.demonware
  REACT_APP_API_HOST=https://devzone-api-gateway.demonware.net
  REACT_APP_AUTH_SERVICE_PROVIDER_HOST=https://devzone.demonware.net
  REACT_APP_LEGACY_HOST=https://devzone.demonware.net
  ALLOW_E2E_AUTH_BYPASS=true # Needed to bypass Cypress domain change issue DZ-8419
  REACT_APP_AUTH_CLIENT=local-react-dev
  ```
  2. To run Prod Frontend against Prod Backend, open a terminal in the Frontend root directory and run `yarn cypress:open:prod`. To run with local Frontend you need to change the parameters below in `cypress/config/development.json` and run the tests with `yarn cypress:open:dev`:
  ```
  "baseUrl": "http://localhost:3000/",
  "env": {
    "backendUrl": "https://devzone-api-gateway.demonware.net",
    "authUrl": "https://devzone.demonware.net/login/external",
    "testEnvironment": "prod",
    "titleEnv": "dev",
    "titleId": "5815",
    "titleEnvId": "3063",
    "otherTitleEnv": "dev",
    "otherTitleId": "5815",
    "otherTitleEnvId": "3063",
    "titleIdABTesting": "5815",
    "projectId": "1151",
    "testUsername": "dz-automated-testing",
    "testPassword": "gs5ZS-22@cD4KrWH"
    ...
  ```

### I don't like git hooks, how to disable them?

Two options:

- commit with the option `--no-verify` to skip git hooks.
- removing all hooks from `.git/hooks`: `rm -f .git/hooks/*'`. They will be installed again on every update of `husky`.

### How can I connect my local frontend to local API?

First of all you neet to run API locally.
Please read [Devzone Development Environment](https://github.ihs.demonware.net/Demonware/devzone/blob/master/README.md#devzone-development-environment)

To run local frontend against local api run

```bash
yarn start:local-api
```

### How can I convert components to TypeScript?

At the moment we only support TypeScript as a trial for Event Manager.
In order to quickly process files to TS we use [ts-migrate](https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate) from Airbnb.

From within the event-manager guest app run this command to rename any files to .ts and .tsx automatically:
```
yarn ts-migrate -- rename . -s "src/playpants/path/to/component"
```

Next run `yarn ts-migrate -- migrate .` to fix TypeScript errors and allow the app to compile.
Note: the path was left out here because this tooling at v0.1.19 fails to write to files otherwise.

You can now go through the files and clean up anything missed such as removing use of `any` types. Use [typescript-cheatsheets/react](https://github.com/typescript-cheatsheets/react) for guidance.

If you're using VSCode and linting errors are not displaying try updating your `.vscode/settings` to include:
```
"eslint.workingDirectories": [
    {"mode": "auto"}
]
```


### Gotchas / Things to look out for
- Adding a new path/route requires changing/addition in several places
  i. `packages/devzone-core/src/NavigationBar/routes.js`
  ii. `src/dw/online-configuration/scenes/routes.js`
  iii. `src/dw/devzone/routes.js` (Only if your new service is a separate unit)


### I got a conflict on `yarn.lock` how do I solve this?

There are multiple ways of solving this.

The most reliable way merging or rebasing your branch, but leaving yarn to solve the conflicts for you. Here it is an example:

```console
#  Start the merge/rebase
$ git merge master  # git rebase master

Auto-merging yarn.lock
CONFLICT (content): Merge conflict in yarn.lock
Auto-merging package.json
Automatic merge failed; fix conflicts and then commit the result.

# Fix the conflict
$ git checkout master yarn.lock
$ yarn

# Make sure everything is still working
$ yarn test
$ yarn lint

# Commit fix
$ git add yarn.lock
$ git commit # git rebase --continue if using rebase
```

The other two ways I am aware of are:

1.  Solving manually the conflicts when merging or rebasing your branch. This is the preferred way to solve most conflicts, but as the `yarn.lock` is a generated file it becomes too difficult to manually fix conflicts. It's not recommended, but if you do this you need to be extra careful.
2.  Removing `yarn.lock` and run `yarn` again. There are a few cases where this is the best solution, you end up losing all the benefits of having a lock file in the first place.

### I want to publish custom npm module

On Demonware side we have virtual repo `https://artifactory.ihs.demonware.net/demonware-npm/`.
It is possible to publish custom package to it as [Scoped packages](https://docs.npmjs.com/misc/scope).

All the packages should use `@demonware` scope.

#### Publish package

In your `package.json`:

- name package using `@demonware` scope;

- add `publishConfig` pointing to the `https://artifactory.ihs.demonware.net/api/npm/demonware-npm-release-local/` registry.

```json
// package.json example
{
  "name": "@demonware/my-awesome-feature",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "publishConfig": {
    "registry":
      "https://artifactory.ihs.demonware.net/api/npm/demonware-npm-release-local/"
  }
}
```

Publish your package with yarn:

```console
$ yarn publish
```

#### Using custom package

In your project simply run

```console
$ yarn add @demonware/my-awesome-feature
```

## Guest Apps

Devzone supports loading guest applications at runtime. This enables development partners to develop & deploy separate to the Devzone team.
We support developing directly against the Devzone QA environment, allowing you to focus on your application without requiring a local Devzone cluster setup.

To onboard please [contact the Devzone team](https://github.ihs.demonware.net/Demonware/devzone-frontend#contact-us).

### Requirements

#### Application configuration

Your application **must** expose a Webpack manifest. The host Devzone application will load this manifest in at runtime and execute the entrypoint defined in your manifest.

And the entry point of your guest app must be assigned to the _window_ object as follows:

```
import Foo from './my-component';
window.GUEST_APP_FOO = Foo;
export default Foo;
```

#### Window scope libraries

`react` and `react-dom` must be listed as webpack externals. As they are global singletons they will inherit the version from the host Devzone application.

For example:

```
  addWebpackExternals({
    react: 'React',
    'react-dom': 'ReactDOM',
  })
```

The Monaco code editor and Devzone replicas /`src/dw/core/replicas/` must be used from the window scope.
For example:

```
const {
  UserReplica,
} = window.Replicas;
```

#### Build configuration

Your build must set the `ASSET_PATH` to `/apps/<your-app>`. For more details on this please contact the Devzone team.

### Developing using Devzone-QA

For guest application development we support embedding your local development instance in the Devzone QA environment.

Setting the `<TODO: Get query param`> option will set Devzone QA to load the application hosted at `http://localhost:3001**.
Allowing you to develop your application without requiring the full Devzone stack in your development environment.

**Note:** This feature requires the initial app setup with the Devzone team to be completed. And is only available in QA.

### How it works

The `GuestApp` Devzone component encapsulates your guest application within the main Devzone application.

At runtime we initialize the component, load your manifest and execute the webpack runtime & `main.js` function.
The execution then passes to your guest application and runs from there.

For example the AB Testing integration is defined in `src/dw/devzone/routes.js`:

```
import GuestApp from 'dw/core/components/GuestApp';

const ABTestingGuestApp = () => (
  <GuestApp name="ABTESTING" />
);
```

For details on the implementation see: `src/dw/core/components/GuestApp.js`

### Guest applications

- [ABTesting](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/guest-apps/abtesting/README.md)
- [Event Manager](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/guest-apps/event-manager/README.md)

## Contact us
If you wish to contact the Devzone team, you may do so via Slack on channel [#dw-devzone](https://demonware.slack.com/archives/C01PNGF5C00) or via our Support queue <mailto:support@support.demonware.net>.
