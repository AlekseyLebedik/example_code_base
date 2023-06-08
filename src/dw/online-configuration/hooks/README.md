useConfigOption
===============

The title environment has `options` dictionary where we can store per title env options.

But sometimes we need per title or per project options.

To not duplicate them in every title env we have `CONFIG_OPTIONS` on frontend.

It is an object like

```js
window.APP_CONFIG_CONFIG_OPTIONS = {
  MY_COOL_OPTION: [
    {
      type: 'title',
      entityIds: [1, 5555],
      value: 'My cool option value for titles 1 and 5555'
    },
    {
      type: 'project',
      entityIds: [1, 3],
      value: 'My cool option value for projects 1 and 3'
    },
  ],
}
```

The `useConfigOption` hook allows to access config options in an easy way:

```js
import { useConfigOption } from 'dw/online-configuration/hooks';

const MyComponent = () => {
  const optionValue = useConfigOption('MY_COOL_OPTION');
}
```
