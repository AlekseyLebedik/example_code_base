# Event Manager UI Unit

[![Build Status](https://jenkins.las.demonware.net/buildStatus/icon?style=flat-square&job=Devzone%2FEvent%20Manager%2Fmaster)](https://jenkins.las.demonware.net/job/Devzone/job/Event%20Manager/job/master/)

## Development Environment

In order to run event-manager locally we need to run the [main devzone-frontend app](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/README.md) first.

### Install Event Manager dependencies

In a new terminal from root run:

```
yarn build:dw
yarn install:event-manager
```

You may need to rebuild the `dw` to refresh your local built package, in case some components in `dw/core` have been updated since the last time you `git pull`ed.

### Run Event Manager

To run event-manager as guest app against QA run:

```
yarn start:event-manager
```

To run event-manager as guest app with local backend up run:

```
yarn start:event-manager:local-api
```

### Unit Tests & Linter

To run event-manager unit tests and lint the code run:

```
yarn test:event-manager
```

### Cypress Tests

To run all event-manager tests headed run:

```
yarn cypress:event-manager
```

To run interactively so you can select specific tests and stop/restart testing proccesses run:

```
yarn cypress:open:dev
```
