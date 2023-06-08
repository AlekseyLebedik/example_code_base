As part of Guest App integration our Host App provides core components through window object.
With webpack config tricks we are able to use `import <Component> from 'dw/core/components/<Component>'`
in our guest app.
But eslint fails on resolving `dw` package.

This custom eslint resolver allows to treat packages as external.

# Install

```bash
yarn add -D @demonware/eslint-import-resolver-external
```

# Usage

**.eslintrc.json**
```json
{
  "settings": {
    "import/resolver": {
      "@demonware/eslint-import-resolver-external": ["dw/**"],
    }
  }
}
```
