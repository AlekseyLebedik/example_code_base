# Check Permissions

The goal of this implementation is to allow us to check permissions against Authz through the devzone API (django app) backend.

**NOTE** This implementation doesn't currently have any caching, so it will request permissions everytime it is called

In Authz speak we have the following:

- `subject` which in this case is the current user
- `predicate` which is the actual permission name (action)
- `object` which is the "target" for that permission
  For example: janedoe (the subject) can view_title_env (the predicate) on titleenv.1234 (the object)

This interface allows us to check either multiple predicates against a single object, or one predicate against multiple subjects

## How to use

There are three ways of checking permissions against Authz, all of them based on the function described below:

1. As a function

```
import { fetchPermissions } from './CheckPermissions/index'

const predicates = ['predicate1', 'predicate2']
const object = 'titleenv.1234'
const titleEnvPermissions = await fetchPermissions(predicates, object)
```

This will return the permissions grouped by either predicates or objects (depending on which was a list), otherwise it will return a simple boolean:

```
await fetchPermissions(['a','b'], 'c') // {'a': true, 'b': false}
await fetchPermissions('a', ['b', 'c']) // {'b': true, 'c': true}
await fetchPermissions('a', 'b') // true
```

2. As a hook

```
import { usePermissions } from './CheckPermissions/index'

const SomeComponent = props => {
  const predicate = 'predicate'
  const objects = ['titleenv.1234', 'titleenv.2345']
  const [loading, error, result] = usePermissions(predicate, objects)

  return <div>I'm using permissions!!!</div>
}

```


3. As a component (Note that this only checks 1 predicate on 1 object)

```
import { CheckPermission } from './CheckPermissions/index'

const SomeComponent = props => {
  <CheckPermission object="titleenv.1234" predicate="view_thing">
    <p>I'm visible only if allowed</p>
  </CheckPermission>
}
```
