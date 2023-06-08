# ABTesting UI Unit

[![Build Status](https://jenkins.las.demonware.net/buildStatus/icon?style=flat-square&job=Devzone%2FABTesting%2Fmaster)](https://jenkins.las.demonware.net/job/Devzone/job/ABTesting/job/master/)

## Development Environment

In order to run it locally we need to run [Main devzone-frontend App](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/README.md) first.

### Install ABTesting dependencies

In a new terminal run:

```
yarn build:dw
yarn install:abtesting
```

You may need to rebuild the `dw` to refresh your local built package, in case some components in `dw/core` have been updated since the last time you `git pull`ed.

### Run ABTesting

To run ABTesting as guest app run

```
yarn start:abtesting
```
