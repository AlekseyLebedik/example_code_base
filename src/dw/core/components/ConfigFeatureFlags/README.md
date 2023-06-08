# Config Feature Flags

## Overview

To control feature appearance in Devzone Studio we use two mechanisms: `waffle.Switches` (from API) and
`Config Feature Flags` stored in local frontend configuration.

`waffle.Switches` are not flexible and allows only enable or disable feature globally.
The main advantage of it - `Switch` could be easilly enabled / disabled through Devzone legacy admin without need to
wait next deployment.

The `Config Feature Flags` are more flexible. Them allow to display feature per projects, titles or only for particular
users.

## Configuration

To add a new `Config Feature Flag` we need to add it to
https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/src/dw/core/components/ConfigFeatureFlags/configFeatureFlags.js
like

```javascript

export const MY_COOL_FEATURE = 'MY_COOL_FEATURE';
```

Then we need to prepare gerrit change (**puppet_modules/devzone_frontend/templates/DEVZONE_[DEV|PROD]_LAS/app-config.erb**)
to enable our new feature in frontend configuration:

### Per Projects

```javascript
window.APP_CONFIG_FEATURE_FLAGS={
  ..., // existing feature flags
  MY_COOL_FEATURE: {
    type: "project",
    value: [1, 2] // Would be enabled for projects with ids 1 and 2
  }
}
```

### Per Titles

```javascript
window.APP_CONFIG_FEATURE_FLAGS={
  ..., // existing feature flags
  MY_COOL_FEATURE: {
    type: "title",
    value: [1, 2] // Would be enabled for titles with ids 1 and 2
  }
}
```

### Per Users

```javascript
window.APP_CONFIG_FEATURE_FLAGS={
  ..., // existing feature flags
  MY_COOL_FEATURE: {
    type: "user",
    value: [1, 2] // Would be enabled for users with ids 1 and 2
  }
}
```

## Properties

| Name | Type | Default Value | Description
| ---- | ---- | ------------- | -----------
| aggregated  | bool | true | For case when multiple features passed aggregates feature checks into single boolean value using `AND`. If set to `false` all feature checks are stored in array and may be used by render function or selector.
| configFeatureFlags | array of  strings |  | List of feature flags to check. Just string could be passed if one feature flag should be checked.
| children | node |  | Element which should be displayed when feature check evaluated to true. If render function is passed depending on `aggregated` it would recieve single boolean value or array of booleans for each feature listed. `(value[, value1, ...]) => { ... }`
| isStaffAllowed     | bool | true | If `true` feature check is bypassed for staff users. In other case feature check performed as for regular users.
| noAccessComponent  | node | null | Component that should be shown when feature check evaluated to `false`.


## Usage Examples

### Hide component if not allowed

```javascript

import ConfigFeatureFlags from 'dw/core/components/ConfigFeatureFlags';
import { MY_COOL_FEATURE, ONE_MORE_FEATURE } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';

...

// Single feature
<ConfigFeatureFlags
  configFeatureFlags={MY_COOL_FEATURE}
>
  <div>
    That is my element which should be hidden if I dont have access to the `MY_COOL_FEATURE`.
    Note: If Im staff - I will see this element anyway.
  </div>
</ConfigFeatureFlags>

// Few feature checks
<ConfigFeatureFlags
  configFeatureFlags={[MY_COOL_FEATURE, ONE_MORE_FEATURE]}
>
  <div>
    That is my element which should be hidden if I dont have access to the `MY_COOL_FEATURE` and `ONE_MORE_FEATURE`.
    Note: If Im staff - I will see this element anyway.
  </div>
</ConfigFeatureFlags>
```

### Disable feature check bypass for staff

```javascript
<ConfigFeatureFlags
  configFeatureFlags={MY_COOL_FEATURE}
  isStaffAllowed={false}
>
  <div>That is my element which should be hidden if I dont have access to the `MY_COOL_FEATURE` even Im staff.</div>
</ConfigFeatureFlags>

```

### Children as render function

```javascript
// Single feature
<ConfigFeatureFlags
  configFeatureFlags={MY_COOL_FEATURE}
>
  {enabled => {
    return enabled
    ? <div>That is my element Im seeing because I have access to the `MY_COOL_FEATURE`.</div>
    : <div>Oooops!!!</div>
  }}
</ConfigFeatureFlags>

// With aggregated set to false
<ConfigFeatureFlags
  configFeatureFlags={[CAN_EDIT, CAN_DELETE]}
  aggregated={false}
>
  {(canEdit, canDelete) => {
    <div>
      <ListItem>
        Some info here
        <Button
          label="Edit"
          disabled={!canEdit}
        />
        <Button
          label="Delete"
          disabled={!canDelete}
        />
      </ListItem>
    </div>
  }}
</ConfigFeatureFlags>
```

### Using Selector

`ConfigFeatureFlags` provides a selector which may be used to check feature manually in a component.
The selector accepts `configFeatureFlags` and `isStaffAllowed` props.

```javascript
import { MY_COOL_FEATURE } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import { makeHasFeaturesEnabledSelector } from 'dw/core/components/ConfigFeatureFlags/selectors';

const stateToProps = state => {
  const hasFeatureFlagSelector = makeHasFeaturesEnabledSelector();
  return {
    myFeatureEnabled: hasFeatureFlagSelector(state, { configFeatureFlags: MY_COOL_FEATURE }),
  }
}

class MyComponent extends Component {
  componentDidMount() {
    if(this.props.myFeatureEnabled) {
      this.initMyCoolFeature();
    }
  }

  render() {
    if(this.props.myFeatureEnabled) {
      // Render feature specific code
      ...
    } else {
      ...
    }
  }
}

export default connect(stateToProps)(MyComponent);
```
