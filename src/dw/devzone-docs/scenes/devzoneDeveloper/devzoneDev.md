## Devzone Studio development - Getting started guide

Devzone is a platform used for the management, debugging and analysis of game titles and services. Devzone Studio is the frontend piece of this platform which focuses on tooling for key game development and Liveops features.

This document will cover both how to on-board your application to the Devzone platform and how to set up your developers with the right tools and access.

### Using Devzone as a tooling development platform

#### How to get started

1. Request a kickoff meeting with Devzone through [gpowley@demonware.net](mailto:gpowley@demonware.net), [dmcilwee@demonware.net](mailto:dmcilwee@demonware.net) or [sboylan@demonware.net](mailto:sboylan@demonware.net)
2. Provide an overview of the tooling functionality. Will it integrate with Demonware API’s? If so please outline how, so that there is transparency on impact, usage etc.
3. Confirm that there is no solution already providing this functionality
4. Confirm if the solutions needs to go through the Liveops feature request process [https://centraltools.activision.com/wiki/display/LiveOps/LiveOpsSteering+Home](https://centraltools.activision.com/wiki/display/LiveOps/LiveOpsSteering+Home)
5. Confirm if the change/feature is related to existing functionally related grouping in Devzone and should be incorporated or replace the existing implementation as agreed with Devzone team
6. Request a repo from Devzone team if required : email [support@support.demonware.net](mailto:support@support.demonware.net).
7. Make sure you have access to reach the [Devzone frontend Github repository](https://github.ihs.demonware.net/Demonware/devzone-frontend). If you don’t have access to this repo or a Demonware github account, please request this access by emailing [support@support.demonware.net](mailto:support@support.demonware.net) or Slack us at [#dw-devzone](link:https://demonware.slack.com/archives/C01PNGF5C00)
8. Define what if any support is needed from Devzone
9. Confirm if the tool will need to be added to Devzone Studio so it can be provided with a location within the Devzone Studio Nav bar. Note: If the tool will be accessible through Devzone Studio, Demonware will share UI development expectations for visualization and user experience consistency
10. Confirm Devzone platform features to be utilized e.g. permissions.
11. Define the support process for feature improvements/bugs e.g. Pagerduty,contacts details on mega menu email on Devzone UI, Slack channel etc.

<br />
<br />

#### Devzone platform integration options

The Devzone platform provides 3 different ways to integrate and run your application. Starting with option blue each of the 3 options gives you the choice to balance flexibility, hosting expertise required and choice of infrastructure.

![alt_text](/images/gs/image01.png 'image_tooltip')

1. Option **Green** enables\*\* \*\*you to develop and run your application using the deployment and hosting solutions you decide.
2. **Orange** sees you build and run your application within the Devzone platform in your own Git repo, leveraging the Devzone build and deploy solutions.
3. **Blue** requires the least hosting expertise, **developing in the Devzone codebase**, tightly integrated, reviewed by the Devzone team and released at the same cadence as the Devzone team releases.

All options enable you to leverage the platform components and platform API’s with no restrictions.

<br />
<br />

#### Onboarding to Demonware systems

The Devzone platform contains the Devzone application and all build, test, deploy and debug systems that help support it. When you onboard you will automatically get access to a number of systems.

These are listed in the table below for ease of reference.

<table>
<tbody>
  <tr>
   <td><strong>System</strong>
   </td>
   <td><strong>Used for</strong>
   </td>
   <td><strong>How you can access</strong>
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>DW Jenkins
   </td>
   <td>Builds & Continuous Integration
   </td>
   <td><a href="https://jenkins.las.demonware.net/">https://jenkins.las.demonware.net/</a>
<p>
Credentials: DW LDAP
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>Artifactory
   </td>
   <td>Artifact (packages, docker images etc) storage & hosting
   </td>
   <td><a href="https://artifactory.ihs.demonware.net/webapp/">https://artifactory.ihs.demonware.net/webapp/</a>
<p>
Credentials: DW LDAP
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>Github
   </td>
   <td>Code repository
   </td>
   <td><a href="https://github.ihs.demonware.net/">https://github.ihs.demonware.net/</a>
<p>
Credentials: DW LDAP
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>Devzone Studio QA
   </td>
   <td>Devzone QA environment
   </td>
   <td><a href="https://devzone-studio-qa.demonware.net/">https://devzone-studio-qa.demonware.net/</a>
<p>
Credentials: ATVI LDAP
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>Devzone Studio Production
   </td>
   <td>Devzone Production environment
   </td>
   <td><a href="https://devzone-studio.demonware.net/">https://devzone-studio.demonware.net/</a>
<p>
Credentials: ATVI Okta
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>DW Kibana
   </td>
   <td>Devzone logs
   </td>
   <td><a href="https://kibana-prod.las.demonware.net/app/kibana#?_g=()">https://kibana-prod.las.demonware.net/app/kibana#?_g=()</a>
<p>
Credentials: DW LDAP
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>DW Grafana
<p>
 	
   </td>
   <td>Devzone metrics & Graphs
   </td>
   <td><a href="https://grafana.las.demonware.net/">https://grafana.las.demonware.net/</a>
<p>
Credentials: DW LDAP
   </td>
  </tr>
  </tbody>
</table>

<br />
<br />

### Developing in the Devzone codebase

Developing in the Devzone codebase and with the Devzone team will get you up and running as quickly as possible. You will be able to develop existing & new features and have them released by the Devzone team.

The Devzone team will arrange access for you to all required Github repos and services. You will need access to the Devzone code repositories for Devzone [backend](https://github.ihs.demonware.net/Demonware/devzone/) & [frontend](https://github.ihs.demonware.net/Demonware/devzone-frontend) and our Continuous Integration tools.

For most users, Demonware GitHub will be accessible from your location. If this is not the case we will need to make some network changes to allow access, which might extend setup time slightly.

<br />
<br />

#### Developer setup

##### Setup up your frontend development environment

If running on windows make sure you have an up to date git client (see [here for instructions on how to download](https://git-scm.com/download/win))

Once you have access to Github, clone the devzone-frontend repository by running:

```
git clone https://github.ihs.demonware.net/Demonware/devzone-frontend.git
```

<br />
<br />

###### Linux/MacOS UI development setup

Devzone UI development is typically done on a Linux / Mac system. On your computer you will need to install the following:

- A [git client](https://git-scm.com/downloads)
- Node.js >=12.x (LTS): install from the[ Node.js website](https://nodejs.org/en/) or use Homebrew (Mac) or[ nvm](https://github.com/creationix/nvm) (Mac/Linux)
- Install[ Yarn](https://yarnpkg.com/)
- Install[ Watchman](https://facebook.github.io/watchman/docs/install) (used to watch files change)

<br />
<br />

###### Windows UI development setup

For windows development we recommend using our Vagrant image bundled in the devzone-frontend repository. This comes pre-setup with all of the tooling you need to develop Devzone.  
[Vagrant](https://www.vagrantup.com/) is a way of creating pre-configured development environments. The Devzone team have created a `Vagrantfile` with all of the tooling necessary to develop.
You do not need to develop via Vagrant but it may make setup in certain situations (e.g. Windows) easier.

**Requirements**
- Your Windows is up to date
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

<br />
<br />

###### Installing frontend dependencies

Next in the root of your local copy of this repository (if running via vagrant make sure to cd into the devzone-frontend directory) run:

```
yarn
```

This will automatically install all the dependencies you need.

And run

```
yarn start
```

To start the application. You will now be able to develop frontend changes against the Devzone QA API environment.

Note: You do **not **need to run the [devzone backend](https://github.ihs.demonware.net/Demonware/devzone/) to develop frontend UI changes, only if you require API changes as part of development.

<br />
<br />

##### Setup up your backend development environment

As with frontend development you will need access to the [Devzone backend Github repository](https://github.ihs.demonware.net/Demonware/devzone/). If you don’t have access to this repo or a Demonware github account, please request this access by emailing [support@support.demonware.net](mailto:support@support.demonware.net)

Once you have access to Github, clone the devzone backend repository by running:

```
git clone https://github.ihs.demonware.net/Demonware/devzone.git
```

<br />
<br />

###### Linux/MacOS API development environment setup

Devzone UI development is typically done on a Linux / Mac system. On your computer you will need:

- A [git client](https://git-scm.com/downloads)
- The Docker container environment ([available here](https://www.docker.com/get-started))
- Docker-compose, a tool for defining and running multi-container Docker applications ([available here](https://docs.docker.com/compose/install/))

<br />
<br />

###### Windows API development environment setup

As with UI development we recommend using our Vagrant image. Follow the instructions detailed in

[Developing UI changes on Windows](#windows-ui-development-setup) to get your development environment up and running.

<br />
<br />

###### Installing API dependencies

Next in the root of your local copy of this repository run:

```
make run-devzone
```

This will setup & run a local development cluster and Devzone Admin & API will be available at [http://127.0.0.1:8081](http://127.0.0.1:8081) in your browser.

More details on this can be found in the Devzone backend [developer readme](https://github.ihs.demonware.net/Demonware/devzone/blob/master/README.md#devzone-development-environment).

<br />
<br />

### UI Development

Devzone is a feature rich single-page application, with most development focussed on UI functionality.

This section will get you up and running with developing, testing and getting your feature into production.

<br />
<br />

#### How to add new features to the Devzone UI

Before beginning please make sure you have your frontend development environment up and running.

We will step through how to develop your changes, from coding through to production. And cover some of the core concepts behind UI design and good user experience.

<br />
<br />

#### How to add "new" label to the Devzone Mega Menu UI

When a new service is created which results in a link being added to the MegaMenu, you should create a new label to indicate the new service is available.

This is a simple process in

```
packages/devzone-core/src/NavigationBar/routes.js
```

Add a “new” label between the Title and the URL e.g.

```
title: 'Player Achievements',
label: 'new',
url: `${rootUrl}achievements/player-achievements`,
```

It is also important to remember to remove the “new” label after a certain agreed period of time.

<img src="/images/gs/image15.png" width="" alt="alt_text" title="image_tooltip">

<br />
<br />
<br />
<br />

#### Developing UI changes

Developing UI changes can initially seem like a daunting task.

This guide will help you through this with our UI design core concepts and developing a modern frontend application and our best practices

Use your favourite editor to develop your changes.

If you want to jump ahead, the [Frontend Developer’s Guide](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/docs/README.md) contains a comprehensive explanation of our file structure, coding style conventions and useful development tools.

<br />
<br />

##### Frontend development using a local Devzone backend

By default your local frontend development environment will talk to the [Devzone QA](https://devzone-studio-qa.demonware.net/) environment for app API requests.

To develop against a local running instance of Devzone first setup & [run the Devzone backend](https://docs.google.com/document/d/1BYMDvjBhr_Dyz0RyKfVHO3zV_Wnuzj21uGNIiNFgwgM/edit#heading=h.r1emc0gif8y5).

Update your _.env.local_ file with:

```
REACT_APP_API_HOST=http://127.0.0.1:8081

REACT_APP_AUTH_SERVICE_PROVIDER_HOST=http://127.0.0.1:8081

REACT_APP_LEGACY_HOST=http://127.0.0.1:8081

REACT_APP_AUTH_CLIENT=react
```

<br />
<br />

##### Using feature flags in the frontend

We recommend putting every new feature behind a feature flag. This will enable you to roll out the feature and test with a select number of users in production before giving all users access.

Devzone makes use of [switches](https://waffle.readthedocs.io/en/stable/types/switch.html) (which affect the entire userbase) and [flags](https://waffle.readthedocs.io/en/stable/types/flag.html) (which can be more specific).

A switch is used to totally enable or disable a behaviour or feature. Whereas a flag is used to roll out that feature to a subset of the Devzone userbase.

To feature-flag a component in React code, use the FeatureSwitchesCheck to wrap your code:

```
<FeatureSwitchesCheck
featureSwitches={[fs.MUST_HAVE_SWITCH_OR_FLAG]}
isStaffAllowed={true/false}
>
      {yourFunctionality()}
</FeatureSwitchesCheck>
```

Note that this component works for **both** feature switches and flags.

You can find examples of it’s usage in routes and other components in the devzone frontend codebase (hint [use the search term](https://github.ihs.demonware.net/Demonware/devzone-frontend/search?q=%3CFeatureSwitchesCheck&unscoped_q=%3CFeatureSwitchesCheck) “_&lt;FeatureSwitchesCheck“)_.

For high-order components the `withFeatureSwitchesCheck` version of this component is available.

To add a new feature flag or switch, you can use Devzone Admin, in [the Waffle menu](https://devzone.demonware.net/admin/waffle/).

<br />
<br />

#### Debugging UI changes

To debug React better, it can be helpful to install [React Developer Tools](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html#installation). It is an extension for Chrome-based browsers and Mozilla Firefox that implements React-specific debugging functionality. It provides a visualization of the Component hierarchy and the props passed to one another.

We also recommend installing [Redux Developer Tools](https://github.com/reduxjs/redux-devtools) to debug state changes, triggered actions, etc. When working with Redux on a large application, it is hard to keep the mental image of how the redux store is updated for every action and which actions were triggered before others. The “Redux” tab on the DevTools provides an interactive list of the actions triggered in redux and how they updated the state at given times, to make debugging easier.

<br />
<br />

#### Testing UI changes

Your features will be using Devzone’s CI pipeline to run our testing suites. Any Pull Request open against our master branch will run Devzone’s unit and integration tests. Any tests you write will be included in and run as part of the test suite.

We use Jest and **[Enzyme](https://github.com/enzymejs/enzyme) **for unit tests. If you are not familiar, here there are some recommended tutorials for [Jest+Enzyme](https://egghead.io/courses/test-react-components-with-enzyme-and-jest) and [Cypress](https://egghead.io/courses/end-to-end-testing-with-cypress).

End to end testing is used to validate all features and releases. We use **[Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell)**, a javascript framework, to create and run all tests.

We also recommend testing the edge-cases & user experience manually at all stages of development.

<br />
<br />

#### Committing UI changes

The Devzone [contributing doc](https://github.ihs.demonware.net/Demonware/devzone/blob/master/CONTRIBUTING.md) details how you can commit & get your code reviewed by the Devzone team.

In short, commit your code on a feature branch and raise a pull request against the `master` branch. The Devzone team will review this as per the Demonware [Code Review standard](https://github.ihs.demonware.net/Demonware/dw-standards/blob/master/code_reviews.md) and give feedback if needed.

In occasional situations we will merge against _release_ branches if we want some change to be deployed to Production outside of the normal release cycle.

If you need an urgent review on your changes, please reach out to the Devzone team via our Slack channel _[#dw-devzone](https://demonware.slack.com/archives/C01PNGF5C00)_ or via a [support ticket](mailto:support@support.demonware.net) and we will work to have your code reviewed as soon as possible.

<br />
<br />

#### Validating UI changes on QA

When the pull request has been approved it will be automatically merged and deployed to the Devzone QA environment. Deployment notifications are done via Slack integrations setup in your channel.

As part of the deployment pipeline, end-to-end tests will be run against the live QA environment, performing an automated sanity & regression test of features. Any failures will cause the deployment to be rolled back.

You can then validate your changes on the QA environment and ensure they are correct.

<br />
<br />

#### Deploying UI changes to production

Releasing to Production is handled by the Devzone team. This is typically done **weekly**, on Thursday morning UTC.

At sensitive times throughout the year (launch) we may increase or decrease this cadence, and will notify all affected development partners in advance.

We require **QA signoff** from all development partners working in the Devzone codebase and a healthy environment with no restrictions on deployments.

If you require an urgent deployment please reach out to the Devzone team via our Slack channel _[#dw-devzone](https://demonware.slack.com/archives/C01PNGF5C00)_ or [support ticket](mailto:support@support.demonware.net) and we will work with you as soon as possible.

<br />
<br />

#### UI design core concepts

In this section we will cover the concepts that are important to understand when developing UI features in Devzone.

Devzone consists of a React based Javascript UI and a number of python APIs. Local development is done as described above by running the app and a local cluster of devzone services.

Understanding the React component lifecycle is important to determine when to trigger actions which will affect the behaviour and performance of your components. If you are new to React, we recommend reading the [React lifecycle docs](https://reactjs.org/docs/react-component.html).

We use react-redux to manage component state on the frontend. If you are not familiar with this binding, there is a good tutorial here - [Starting with redux](https://egghead.io/courses/getting-started-with-redux). Devzone Studio also follows the idea of using presentational and container components.

<br />
<br />

#### Libraries

Devzone supports multiple code implementations, but we leverage a set of common libraries for Devzone components. These reflect the production-level design libraries. The frameworks are listed below with their primary maintainers:

React: DZ Core team

CSS/Vanilla: DZ Core team

Material-UI: Material-UI (external)

AGGrid: AGGrid (external)

<br />
<br />

#### Components

Components are one of the key building blocks of the design system. Each component is designed and coded to solve a specific UI problem, such as presenting a list of options, enabling submission of a form, providing feedback to the user, and so on.

The goals of the component system includes improving consistency and quality, making the design and development process more efficient and focused, establishing a shared vocabulary between designer and developer, and providing clear, discoverable guidance around design and development best practices.

Some examples of commonly used components can be found in the appendix [here](#appendix)

Storybooks is Devzone’s [component-by-component documentation](https://github.ihs.demonware.net/pages/Demonware/devzone-frontend/storybook/?path=/story/welcome--start-here) for devzone-frontend codebase. Use it as in-depth documentation for how to use a particular custom component. Bear in mind that this is a live process and some components that are integrated in Devzone.

This is achieved through using specific UI Libraries which are currently used by the Devzone team and leveraging common patterns which the Devzone team have accumulated and implemented.

Components can be assembled together to build applications and can be pulled from a number of sources.

- [Devzone components](https://github.ihs.demonware.net/pages/Demonware/devzone-frontend/storybook/?path=/story/welcome--start-here)
- [Material UI](https://v3.material-ui.com/)
- [AG Grid](https://www.ag-grid.com/documentation-main/documentation.php)

<br />
<br />

##### Presentational Components

These components are considered the ‘view’ layer. We don’t put any stateful logic into these components. Rather we use these types of components to display the UI using HTML markup. Values from the _props_ are used to show data coming from API’s.

All presentational components should be named as presentational.js inside the folder where the component definitions live.

<br />
<br />

##### Container Components

These components hold state and handle business logic. These include dispatching actions, calling external APIs or performing some sort of side-effects like resizing the browser window.

They return a presentational component and pass all the props or the state values that the presentational component needs to display the information inside a UI. This type of component is named container.js inside the folder where the component definitions live.

In summary, presentational components display the data (UI) and container components hold stateful logic.

Whenever we look into a component we always check the container component and check what sort of props are being passed to the presentational component to get some sort of an idea of how the presentational component will display the data.

<br />
<br />

#### Devzone building blocks

In Devzone we also have other non-components like building blocks, relevant to the world of React+Redux that are worth mentioning:

<br />

##### Selectors

Sometimes we need to get stateful data back from the redux store & display it in a presentational component. There could be a use case where we need to cross-reference some data from one API with another and return a result that contains some fields from both the API’s.

We need to use selectors in this situation.

Selectors are simply functions we create which accept a state argument. The function takes in the state and uses that to retrieve the desired state value needed by the component. It is useful in case we make changes to the structure of how the initial state should look like and if we are not using selectors then we will have to go and change everywhere where we have defined the use of state.

Selectors are called from a container component inside the mapStateToProps function. The name for this function is dependent on the developer but the idea is that the selector will always be inside a function which maps the state from the redux store to the props.

The definitions for all the selectors are written inside a selectors.js file.

<br />

##### Constants

Any string for that will remain the same all over that application component will be defined inside this file. This could include redux action prefixes or some sort of data items.

They are all written inside a constants.js file.

<br />

##### Middleware

In case we need to perform some sort of operation in between dispatching a redux action and then reducing the state inside the reducer we write them as a middleware.

This is written inside a middleware.js file.

<br />

##### Sagas

Inside of devzone we primarily use Redux-saga for performing side-effects like calling external API’s.

They are written inside a saga.js file.

Note that there are saga files inside components which are then exported to another global level saga file.

<br />

##### UI Permissions

Devzone Studio incorporates a Permission Management UI for administrators and staff, that interfaces with our customized permission system.

It allows fine-grained permissions, such as giving a specific group of users permissions to view and edit publisher objects on a specific Title Environment (e.g. MyTitle DEV).

Permissions are defined and configured at the API level, for more details on this see the

[API permissions ](#api-permissions)section.

To check permissions in React code, we have the <code><em>PermissionCheck</em></code> wrapper component. This enables you to wrap your existing components to show/hide them based on permissions:

```
<PermissionCheck permissions={permissions.MUST_HAVE_PERMISSION}>
      	{yourFunctionality()}
</PermissionCheck>
```

<br />
<br />

#### Code example

Here is an example based on the Title Info page of how Devzone components are assembled with links to the relevant code snippets in Git.

On Devzone’s Title Info page, we have the page setup to fetch data when the page loads. A custom **[action](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/fdb8a20a0870860b4c52666026033718ebf4de2c/src/dw/online-configuration/scenes/TitleInfo/actions.js#L8)** is **[dispatched on load](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/fdb8a20a0870860b4c52666026033718ebf4de2c/src/dw/online-configuration/scenes/TitleInfo/container.js#L39)**, a **[saga](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/fdb8a20a0870860b4c52666026033718ebf4de2c/src/dw/online-configuration/scenes/TitleInfo/saga.js#L26)** handles the action to make the API request and notifies the **[reducer](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/fdb8a20a0870860b4c52666026033718ebf4de2c/src/dw/online-configuration/scenes/TitleInfo/reducer.js#L9)** when the data fetch success/fails.

That is all you need generally to perform simple CRUD actions against the API.

In-depth examples of components, reducers and selectors can be found in the docs section of the Devzone-frontend git repo.

<br />
<br />

#### Using the Devzone API

By default your local frontend development environment will talk to the [Devzone QA](https://devzone-studio-qa.demonware.net/) environment for app API requests.

You can now quickly and easily get started on bug fixes and adding to existing features or adding new features that use existing APIs.

API documentation is available through a [live interactive swagger page](https://devzone.demonware.net/schema/).

If you do need to make API changes you will need to setup and run the Devzone API (see API development section) and update your frontend development environment to use this local API setup.

**Note: **It is not possible to make API requests to production directly from your local environment.

<br />
<br />

#### Frontend Requirements & Standards

To ensure a smooth development and user experience there are several standards & requirements for all frontend development.

<br />
<br />

#### Testing

There is a **unit-test code coverage **requirement of** 80%**. All new features **must** adhere to this and updates to existing features should adhere.
This check is done as part of our code-review and CI build process.
Additionally all new features _should_ have an end-to-end integration test via Cypress as detailed in the testing section.

<br />
<br />

#### Browser compatibility

Devzone supports the 3 major browsers:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge.

Your development **must** maintain compatibility with these browsers.

<br />
<br />

#### API requests

All requests from the Devzone Platform UI (browser application) **must** be made via the Devzone API Gateway at

```
https://devzone-api-gateway.demonware.net
```

All requests made via the Devzone frontend framework will automatically do this.

<br />
<br />

#### Navigation

All Devzone Tooling must include the Core Navigation Component

How to add to it?

**Updated information will be added to provide an overview of the Nav Bar Library **

<br />
<br />

### API Development

The Devzone API provides secure and fast access to a wide range of services in Devzone and Demonware including live titles and game services such as Object Store & Marketplace.

<br />
<br />

#### How to add new features to the Devzone API

Before beginning please make sure you have your api development environment up and running.

<br />
<br />

#### Developing API changes

Developing an API entirely within the Devzone codebase is as simple as adding new [Django views](https://docs.djangoproject.com/en/1.11/intro/tutorial03/) to the existing files in the [Demonware/devzone GitHub](https://github.ihs.demonware.net/Demonware/devzone) repository and exposing them via Django [urlpatterns](https://docs.djangoproject.com/en/1.11/topics/http/urls/#syntax-of-the-urlpatterns-variable).

Note that Devzone uses Python 3.6 and the [API design core concepts](#api-design-core-concepts) section below contains a full example API.

<br />
<br />

#### Debugging API changes

The local environment supports debugging via logs & the Django development server.

To access logs for any running component:

```
docker-compose logs -f <component>
```

Which is running as it would in Production, giving you a like for like environment.

The Django development server supports an improved debug toolbar, details of which can be found in the [readme here](https://github.ihs.demonware.net/Demonware/devzone/#run-django-development-server).

For debugging in QA and production there are several tools available:

- [Kibana](https://kibana-prod.las.demonware.net/goto/a7b70abfbb3729f44fd0d6f85854742e)
- [Lucene query syntax docs](https://www.elastic.co/guide/en/kibana/current/lucene-query.html)
- [Sentry](http://titles-sentry.las.demonware.net/) to track exceptions and errors
- [Jaeger](https://tracing.las.demonware.net/jaeger/) to trace transactions

<br />
<br />

#### Testing API changes

Your features will be using **Devzone’s CI pipeline** to run our testing suites. Any Pull Request open against our master branch will run Devzone’s unit and integration tests. Any tests you write will be included in and run as part of the test suite.

We use [Pytest](http://doc.pytest.org/en/latest/) **for unit testing **API changes\*\* \*\*with a required coverage level of 80% on all new features.

We also recommend testing the edge-cases & user experience manually at all stages of development.

<br />
<br />

#### Committing API changes

As with [committing Devzone Frontend changes](#committing-ui-changes) there is a Devzone API [Contributing doc](https://github.ihs.demonware.net/Demonware/devzone/blob/master/CONTRIBUTING.md) details how you can commit & get your code reviewed by the Devzone team.

In short, commit your code on a feature branch and raise a pull request against the `master` branch. The Devzone team will review this as per the Demonware [Code Review standard](https://github.ihs.demonware.net/Demonware/dw-standards/blob/master/code_reviews.md) and give feedback if needed.

In occasional situations we will merge against _release_ branches if we want some change to be deployed to Production outside of the normal release cycle.

If you do need urgent review on your changes, please reach out to the Devzone team via our Slack channel _[#dw-devzone](https://demonware.slack.com/archives/C01PNGF5C00)_ or [support ticket](mailto:support@support.demonware.net) and we will work with you as soon as possible.

<br />
<br />

#### Validating API changes on QA

When the Pull Request has been merged it will be automatically deployed to the Devzone QA environment. Deployment notifications are done via Slack integrations setup in your channel.

As part of the deployment end-to-end tests will be run against the live QA environment, performing an automated sanity & regression test of features.
Any failures will cause the deployment to be rolled back.

You can then validate your changes and ensure they are correct and to your liking.

<br />
<br />

#### Deploying API changes to Production

Releasing to Production is handled by the Devzone team. This is typically done **weekly**, on Thursday morning UTC.  
At sensitive times throughout the year (launch) we may increase or decrease this cadence, and will notify all affected development partners in advance.

We require **QA signoff** from all development partners working in the Devzone codebase and a healthy environment with no restrictions on deployments.

If you require an urgent deployment please reach out to the Devzone team via our Slack channel _[#dw-devzone](https://demonware.slack.com/archives/C01PNGF5C00)_ or [support ticket](mailto:support@support.demonware.net) and we will work with you as soon as possible.

<br />
<br />

#### API design core concepts

The Devzone API is built on the [Django](https://docs.djangoproject.com/en/1.11/intro/overview/) framework and uses the [Django REST Framework](https://www.django-rest-framework.org/) for all API definitions.

Django is based around the concept of [applications](https://docs.djangoproject.com/en/1.11/ref/applications/#projects-and-applications). A Django application is a reusable package of code.

This application will contain your API views, ORM models, DB schema migrations and other logic. This structure and separation of views from models/other logic helps keep your application lighter, more testable, and easier to understand.

We recommend you start with the [Django tutorial](https://docs.djangoproject.com/en/1.11/intro/tutorial01/) for new developers and the corresponding [Django Rest Framework tutorial](https://www.django-rest-framework.org/tutorial/quickstart/). And that you create a new application for all of your features in Devzone.

<br />
<br />

#### Creating your application

Create your application via the [startapp command](https://docs.djangoproject.com/en/3.0/ref/django-admin/#startapp) at the same level as [devzone/api](https://github.ihs.demonware.net/Demonware/devzone/tree/master/devzone/api), and with a brief descriptive name.

You will then need to add it to the list of `INSTALLED_APPLICATIONS` in `devzone/settings/devzone.py` to enable your application.

<br />
<br />

#### Creating API views

As the Devzone API consists mainly of Django Rest Framework (DRF) views we follow most of their conventions.

API views live at `<code>devzone/<yourapp>/api/views/<strong><em> </em></strong></code>` and may be further nested if necessary. Views are also placed in files with the naming scheme:

`devzone/<yourapp>/api/views/<yourappsubcategory>.py` OR `devzone/<yourapp>/api/views.py.`

We primarily use class-based views from DRF to perform API interactions. There are some key parts we use for this:

- DRF's [APIView](https://www.django-rest-framework.org/api-guide/views/) or the [rest_framework.generics](https://www.django-rest-framework.org/api-guide/generic-views/) module for some basics
- [DWTokenAuthenticationRequiredMixin](https://github.ihs.demonware.net/Demonware/devzone/blob/master/devzone/api/generics.py#L17) to [Enforce DWToken authentication](#authorization--authentication) for clients
- Permissioning down to the Object level (see permissions below)

<br />
<br />

##### Example API view

[Django views](https://docs.djangoproject.com/en/1.11/intro/tutorial03/) are easy to write and best when kept simple and testable.

Here's what a very simple view might look like:

```
class YourAppAPIView(
    DWTokenAuthenticationRequiredMixin, TitleEnvSingleObjectMixin, APIView
):
    renderer_classes = (JSONRenderer,) # turns responses into JSON
    permission_classes = (CanViewTitleEnv,) # permission gate class

    def get(self, request, **kwargs):
        result = {"data": self.object.id} # this is the title env ID
        return Response(result)
```

<br />
<br />

#### Exposing API views

You will need to expose your views to clients. To do so add a Django [urlpatterns](https://docs.djangoproject.com/en/1.11/topics/http/urls/#syntax-of-the-urlpatterns-variable) that match path regexes and direct them to view functions in the urls file for your application:

`devzone/<yourapp>/urls.py`

as though they were at the top-level of the resource tree. For example:

```
urlpatterns = [
    url(r'^your-resource/(?P<pk>\d+)/$', yourapp.YourappDetailAPIView.as_view(), name='yourapp-detail'),
]
```

Lastly import and add this named list to the master urlpatterns at the bottom of the `devzone/api/frontend_urls.py` file:

```
from devzone.yourapp.urls import urlpatterns as yourapp_patterns
...
urlpatterns = [
    ...
    url(r'^yourapp/', include((yourapp_patterns, 'yourapp'))),
    ...
]
```

Now, requests that come in to `/api/v2/yourapp/your-resource/<ID>` will be directed to the appropriate view.

<br />
<br />

#### Using feature flags in the API

We recommend putting every new feature behind a feature flag. This will enable you to roll out the feature and test with a select number of users in production before giving all users access.

Devzone uses a library called [Waffle](https://waffle.readthedocs.io/en/stable/) to manage feature flagging. It includes three methods of feature flagging:

- Switches
- Flags
- samples

Devzone makes use of switches (which affect the entire userbase) and flags (which can be more specific).

A switch is used to totally enable or disable a behaviour or feature. Whereas a flag is used to roll out that feature to a subset of the Devzone userbase.

Note: checking a flag requires the `request` object, so it cannot be used outside of the normal view flow.

To add a switch or flag, visit the Waffle admin section at [https://localhost:8081/admin/waffle/](https://localhost:8081/admin/waffle/).

<br />
<br />

##### Example switch & flag usage

Once you have set a switch or flag, you can use it in code like this:

```
# can be used anywhere in the code
if waffle.switch_is_active('MY_COOL_FEATURE'):
    my_cool_feature.go()

# must be used in a view (where you have access to a request object)
# this is because it checks the request to determine if that request
# should have the flag active or not (based on user, group, etc.)
if waffle.flag_is_active(request, 'ROLL_OUT_COOL_FEATURE'):
    my_cool_feature.go()
```

See the [Waffle documentation](https://waffle.readthedocs.io/en/stable/) for more details on the differences.

<br />
<br />

#### Talking to a game title

MMP is the game services cluster for a Title. It contains most of the base functionality a game client inteacts with, including user profile management, anticheat and leaderboards to name a few.

For more details on this please see the [Demonware documentation portal](https://info.demonware.net/miscellaneous/latest/welcome-to-demonware.html).

Devzone interacts with nearly every aspect of MMP and there is a special view mixin, [TitleEnvSingleObjectMixin](https://github.ihs.demonware.net/Demonware/devzone/blob/master/devzone/api/mixins.py#L42) to manage operations with MMP Webservices and details about the environment itself.

Each operation can be done against a single, specific **_title environment. _**For example we can query the user profile for a user in the Crash Team Racing Dev PS4 environment.

<br />
<br />

#### Talking to other Demonware services

Other Demonware services communicate via HTTP, and authenticate via an internal library called [DWToken](#working-with-dwtoken).

Devzone has integrated these services and provides an _[integration client](https://github.ihs.demonware.net/Demonware/devzone/tree/master/devzone/integration)_ abstracting these details.

For example, the [Object Store client](https://github.ihs.demonware.net/Demonware/devzone/blob/master/devzone/integration/object_store/client/object_store.py#L59) supports the different instances & versions of Object Store while providing a python interface to make calls against.

<br />
<br />

#### API Permissions

Permissions are used to validate all actions performed by a user. They are automatically checked as part of every API request and require minimal configuration to setup.

You do not need to do any additional work to start defining and using permissions.

We recommend working with permissions right from the beginning. To help ensure a safe and secure API.

Your API views **must **inherit from the `DWTokenAuthenticationRequiredMixin` to ensure that only logged in users can access your views.

In the Devzone codebase permission checks have been integrated with the [Devzone authz service](https://github.ihs.demonware.net/scratch/devzone-authz) automatically via the [Django permissions model](https://www.django-rest-framework.org/api-guide/permissions/).

<br />
<br />

##### Object level permissions

Object level permissioning is the smallest level of permissioning. It allows fine-grained control over access to each and every Object that you create.

You can do this by first defining the permissions you want:

```
YOUROBJ_PERMS = (

    ('edit_yourobj', 'Your Object | Edit'),
    ('view_yourobj', 'Your Object | View'),
)
```

and add them to your Object model like this:

```
class YourObj(models.Model)
    class Meta:
        permissions = YOUROBJ_PERMS
```

This will then be checked automatically as part of the Django Rest Framework view processing.

Care must be taken with this approach to avoid creating too fine-grained a permissions system which will be difficult to maintain over time.

<br />
<br />

##### API View level permissions

By default permissions will be checked on the Object level for each view. You can customize this, checking permissions at the view level itself via a custom `permission_class`. Care must be taken to check the existing permissions first.

For example, a simple view that lets a user access if they have the `have-access` HTTP header set:

```
class MyListAPIView(DWTokenAuthenticationRequiredMixin, APIView):

	permission_classes = (CanAccessMyView,)

class CanAccessMyView(permissions.BasePermission):

	def has_permission(self, request, view):
      if super(CanAccessMyView, self).has_permission(request, view):
                        	return True
		If 'have-access' in request.headers:
                        	return True
```

<br />
<br />

##### Permissions Admin

Assigning permissions to users is done via the [Devzone permissions admin](https://devzone-studio.demonware.net/permission-management) page. This can be given to entire companies, groups within companies, or individual users.

Contact the [Devzone team](mailto:support@support.demonware.net) or via our Slack channel [#dw-devzone](link:https://demonware.slack.com/archives/C01PNGF5C00) to get access to this for your feature in production.

<br />
<br />

#### API Requirements & Standards

To ensure a smooth development and user experience there are several standards & requirements for all API development.

<br />
<br />

#### Testing

There is a **unit-test code coverage **requirement of** 80%**. All new features **must** adhere to this and updates to existing features should adhere. \
This check is done as part of our code-review and CI build process.

<br />
<br />

#### Authorization & Authentication

All requests must check the users permissions before performing any actions. See [API Permissions](#api-permissions) for more details.

Your API views **must **inherit from the `DWTokenAuthenticationRequiredMixin` to ensure that only logged in users can access your views.

<br />
<br />

### Appendix

#### Top 5 component functionality

(for which there is a solution that you can lift and drop)

<table>
<tbody>
  <tr>
   <td><strong>Common Component </strong>
   </td>
   <td><strong>Features who have integrated them</strong>
   </td>
   <td><strong>Code Snippet</strong>
   </td>
   <td><strong>Code description</strong>
   </td>
  </tr>
  </tbody>
  <tbody>
  <tr>
   <td>Table
   </td>
   <td>Player Inventory, Session Viewer, Lobby Viewer, Publisher Objects
   </td>
   <td>Player Inventory:

<img src="/images/gs/image02.png" width="" alt="alt_text" title="image_tooltip">

<p>
AGGrid table solution inside Player Inventory component:

<img src="/images/gs/image03.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>Inventory Items component is a generic solution for inventory management. 
<p>
We leverage the capabilities of AGGrid library inside it, adding our custom components around to interact with the data easily.
   </td>
  </tr>
  </tbody>
  <tbody><tr>
   <td>List
   </td>
   <td>Accounts, Object Groups, Leaderboards, Publisher Storage, User Files
   </td>
   <td>Accounts:
<p>

<img src="/images/gs/image04.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>Our solution for lists is a generic component that allows to search over the contained elements by default, allowing to define the search parameters.
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Autocomplete Search
   </td>
   <td>Player Inventory, User Objects, Object Groups
   </td>
   <td>

<img src="/images/gs/image05.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>In our AutoComplete component we have combined Material-UI standard components with the fuzzy search from react-select library. This pre-combination allows us to quickly iterate over the different versions the component provides. 
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Freetext Search
   </td>
   <td>Accounts, Leaderboards, Active Store, Marketplace Stores
   </td>
   <td>Search component inside SearchableList (our List solution):

<img src="/images/gs/image06.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>Able to use it separated or together with template components (combining multiple of our components together)
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Text Field
   </td>
   <td>AB Testing Create, AB Testing Groups, Object Store Groups
   </td>
   <td>

<img src="/images/gs/image07.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>Using generic Field and then passing Select component.
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Tabs
   </td>
   <td>Player Inventory, Account, Active Store, Rulesets, AB Testing Schedule
   </td>
   <td>

<img src="/images/gs/image09.png" width="" alt="alt_text" title="image_tooltip">

   </td>
   <td>Leveraging Material-UI components with Devzone’s style
   </td>
  </tr></tbody>
</table>

<br />
<br />

#### Other component examples

**Text field/data table**

![alt_text](/images/gs/image08.png 'data_table')

**DateTime selector**

![alt_text](/images/gs/image10.png 'date-time-selector')

**AGGrid usability example for PlayerInventory**

![alt_text](/images/gs/image11.png 'player-inventory')

**AutoComplete solution, including Select and Create new features:**

![alt_text](/images/gs/image13.png 'autocomplete')

**ListView:**

**SearchableList and ListItem examples with Material-UI**

![alt_text](/images/gs/image14.png 'searchablelist')

<br />
<br />

#### Working with DWToken

DWToken is Demonware's method for user authentication, based on JWT. Applications on the Devzone platform are \*\*

[required](#authorization--authentication)\*\* to authenticate via DWToken.

DWToken is a Python library for issuing and consuming Demonware authentication tokens. It provides a secure authentication API across all Demonware services including the game client.

Your application will be required to validate & consume tokens only. Devzone will automatically issue and add this token to every request made by the client. This is commonly referred to as the **b2c** case.

<br />
<br />

#### Example

We can use the Devzone Django implementation as an example.

A [Django request middleware](https://github.ihs.demonware.net/Demonware/devzone/blob/master/devzone/helpers/middleware/dwtoken.py) is executed before every request to decrypt and validate the DWToken

This marshalls the relevant data from the incoming request and passes it off to the [python-django-dwtoken middleware here](https://github.ihs.demonware.net/Demonware/python-django-dwtoken/blob/master/django_dwtoken/middleware.py) which then does the hard work.

Then integrated into the Django Rest Framework via [an Authentication class](https://github.ihs.demonware.net/Demonware/devzone/blob/master/devzone/auth/authentication.py) which is set as the default authentication mechanism in the [Django settings file](https://github.ihs.demonware.net/Demonware/devzone/blob/master/devzone/settings/devzone.py)

```
'DEFAULT_AUTHENTICATION_CLASSES': (
    	'devzone.auth.authentication.DjangoDWTokenAuthentication',
)
```

And the configuration defined to trust the Devzone issued token

```
DWTOKEN_CONSUMER = {
	'token_consumer': {
      	'name': 'https://<your-service>',
      	'environment': 'dev|prod',
           'require_authorization_requirements': False
	},
	'trusted_issuer devzone': {
      	'name': 'https://<devzone-api>',
      	'jwt_type': 'encrypted',
           'key_encryption_algorithm': 'RSA-OAEP',
      	'content_encryption_algorithm': 'A128CBC-HS256',
      	'key': DWTOKEN_PRIVATE_KEY_FROM_DEVZONE_TEAM,
	},
}

DWTOKEN_CLIENT_FACTORY = 'devzone.auth.client_factory.ModelClientFactory'
```

Contact the Devzone team for more details on how to get the DWTOKEN_PRIVATE_KEY_FROM_DEVZONE_TEAM

<br />
<br />

##### How to make calls to other Devzone services

**b2b** or inter-service calls require a separate API client token to authenticate with.

The flow is the following:

1. Request an API Client to be created for you by the Devzone team (one time setup)
2. Get a valid token with your API Client credentials (see further below)
3. Pass the token with each API request in the Authorization header as Bearer token_value. In addition you need to always pass the `client=<client-id>` GET parameter with each request.

Details on this can be found in the Devzone [API Client documentation](https://github.ihs.demonware.net/pages/Demonware/devzone/authentication.html#get-auth-token).

<br />
<br />

#### How to get access to DWToken

Source code is available through the [DW Token Github repository](https://github.ihs.demonware.net/Demonware/python-dwtoken/releases/). And pre-built packages via the [Demonware Python Package Index](https://pypi.las.demonware.net/simple/dwtoken/).

For Django applications a middleware [Django DWToken](https://github.ihs.demonware.net/Demonware/python-django-dwtoken) is available and we recommended using this over a custom integration.

<br />
<br />

#### Keeping up to date

Finally to ensure prompt and secure updates we recommend integrating the [Demonware Artifact repository](http://artifactory.ihs.demonware.net/) into your build pipeline.

<br />
<br />

## Required Formatting

There are a number of formatting elements within the creation of Devzone UI that are required.

<br />
##### Button links

All button links should be uppercase to align with Material UI button format. Whether they are contained, text or outlined. Hyperlinks within meta e.g. ID links should retain normal capitalization.
<br />
[Material UI Buttons](https://material-ui.com/components/buttons)

For example "VIEW ALL" text button to open in modal in the Accounts Dashboard

![alt_text](/images/dd/image09formattingpercountry.png 'Formatting Per Country')

<br />
##### Numeric Values

All should be right aligned. The right-alignment just makes numbers of different lengths look easier on the eye.

For example per age group in the Accounts Dashboard

![alt_text](/images/dd/image10fromattingperage.png 'Formatting Per Age')

<br />
##### Headings Capitalisation

Headings should be capitalised and the objects referenced in the heading should be Capitalised. For example

- Interactions by Title
- Total # Players Registered for 2FA
- Total # of Linked Accounts
- Total # of Verified Emails

<br />
<br />

## Material Design

Devzone uses the [Material UI V3 library](https://v3.material-ui.com/) for the majority of functional components. We refer and use their engineering guides & documentation.

Material-UI is an open-source project that features React components that implement Google’s Material Design.

This is an external library of Material design based components. They are used for all basic elements in Devzone such as list, tabs, buttons etc.

Devezone UI is built around 2 fundamentals building blocks, Components and Master Containers which inform the layout.

<br />
<br />

**Components**

Are one of the key building blocks of the design system. Each component is designed and coded to solve a specific UI problem, such as presenting a list of options, enabling submission of a form, providing feedback to the user, and so on. All of the components have been selected to work harmoniously together, as parts of a greater whole.

<br />
<br />

**Master Container (layout formation)**

A collection of components shared by all services within a platform. It provides a common set of interaction patterns that persist between and across products.

<br />
<br />

**Patterns**

There are many regular patterns in Devzone, which are useful as a starting boiler plate for any new service.

Patterns are best practice solutions for how a user achieves a goal. They show reusable combinations of components and templates that address common user objectives with sequences and flows.

<br />
<br />

**Documentation**

To get started using Material UI with Devzone use these links to the primary documentation sections used by the Devzone team. Devzone uses Material UI V3

- [Getting Started](https://v3.material-ui.com/getting-started/installation/)

- [Style](https://v3.material-ui.com/style/icons/)

- [Layout](https://v3.material-ui.com/layout/basics/)

- [Utils](https://v3.material-ui.com/utils/modal/)

- [Component Demos](https://v3.material-ui.com/demos/autocomplete/)

- [Component API](https://v3.material-ui.com/api/avatar/)
