## Application Structure

### Basic Layout

Devzone is a big application composed of many independent tools, like:

- Online Configuration: to configure Demonware's services for a specific title, debugging tools, etc
- Reporting: graph for executive and live ops
- _more to come_

Each of these individual tools are named **Units**. You can see a **unit** as an equivalent to Django app.

A unit is generally composed of multiple sections (the main routes or group of features). For example, the Online Configuration unit is composed of Accounts, Learderboards, Storage, etc.

Each unit has its own separated Redux store. A unit is built by exposing the result of `makeUnit(...)` in their main `index.js`. This method is then used by the application to bootstrap the unit. You can see an example in this [folder](examples/unitName).

The application is responsible for:

- bootstrapping the application:
  - authentication
  - authorization
  - fetching the user profile, permissions, etc
- managing the user profile and permissions (the data are replicated to the unit store, but the source of truth is in the application store)
- setup Google Analytics
- the sidebar
- 404 pages

Everything else is managed at the unit level (unit bootstrapping, navigation bar, main content, routes, etc).

### Directory Layout

All the Javascript code is in the `src/` directory. This directory is organized as follows:

- `src/`: main folder for the react source code
  - `dw/`: our packages namespace (this folder exist so that we can import file like this `dw/core/...`)
    - `devzone`: the entry point of the application
    - `{unitName}/`: each unit has it's own package
      - `scenes/`: folder for different sections of the unit
      - `components/`: folder for shared components between scenes
      - `services/`: folder for the store shared services in the application, like API calls, cache, etc...
      - `index.js`: where we create our unit with `makeUnit`
      - `reducer.js`: where we connect all reducers together
      - `store.js`: where we create our Unit store
    - `core/`: contains every core components, shared helpers and modules
    - `auth/`: the authentication package
    - `config/`: the config package
    - `test-utils`: utils for unit testing

You will find more information about how the unit should be structured in the complete example under the [Components](components.md) section.

## Redux Store

After loading the application, some core information will be available in the redux store. When connecting your unit, you can use our helpers to replicate the data to your local redux store:

- `state.user` _(replicated data)_:
  - `profile`: the user profile (user id, name, is staff, etc)
  - `projects`: list of available projects
- `state.permission` _(replicated data)_
  - `memberships`: user's memberships
  - `permissions`: user's permissions
- `state.Components`: your unit's components state
- `state.Scenes`: your unit's scenes state
- `state.Core`: core components state
