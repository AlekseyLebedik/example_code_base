## Reducers structure

- Expose reducers as the **default export**.
- Use constants instead of inline strings for action types.
- Always define an `INITIAL_STATE` variable.

```js
// reducer.js
import * as AT from './actionTypes';

const INITIAL_STATE = {
  todos: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AT.ADD:
      return { ...state, todos: [...state.todos, action.todo] };
    default:
      return state;
  }
}
```

A reducer handles incoming actions. All reducers are triggered for all actions, so it's up to each reducer to decide
whether or not to act on the incoming action. This is commonly done by switching on the action type. Reducers receive
a current state and an action object and must return a new (updated or not) state. Their function signature is as
follows:

```js
(state, action) => state;
```

Reducers in Redux are pure functions, which means they cannot access outside information other than the arguments they
are given. It's also not allowed to mutate outside state, be it by referencing outer scope or by mutating objects which
they receive as arguments. In other words they must take the data they are given and return a new state without using
mutation. This can often be achieved by using the array and object spread operators.

Good to read: https://medium.com/@alexmngn/how-to-use-redux-on-highly-scalable-javascript-applications-4e4b8cb5ef38

## Selectors

[Reselect](https://github.com/reactjs/reselect) is a simple “selector” library for Redux.

Selectors:

- can compute derived data, allowing Redux to store the minimal possible state.
- are efficient. A selector is not recomputed unless one of its arguments change (cache of size 1)
- are composable. They can be used as input to other selectors.

```js
import { createSelector } from 'reselect';

const shopItemsSelector = state => state.shop.items;
const taxPercentSelector = state => state.shop.taxPercent;

const subtotalSelector = createSelector(shopItemsSelector, items =>
  items.reduce((acc, item) => acc + item.value, 0)
);

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
);

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
);

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [{ name: 'apple', value: 1.2 }, { name: 'orange', value: 0.95 }],
  },
};

console.log(subtotalSelector(exampleState)); // 2.15
console.log(taxSelector(exampleState)); // 0.172
console.log(totalSelector(exampleState)); // { total: 2.322 }
```
