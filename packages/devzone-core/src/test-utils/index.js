/* eslint-disable import/no-extraneous-dependencies */
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import rootReducer, { INITIAL_STATE } from '../modules/reducers';

configure({ adapter: new Adapter() });
/*
 * Repeatedly render a component tree using enzyme.shallow() until
 * finding and rendering TargetComponent.
 *
 * This is useful for testing a component wrapped in one or more
 * HOCs (higher order components).
 *
 * The `componentInstance` parameter is a React component instance.
 * Example: <MyComponent {...props} />
 *
 * The `TargetComponent` parameter is the React class (or function) that
 * you want to retrieve from the component tree.
 *
 * Copied from: https://github.com/mozilla/addons-frontend
 */
export function shallowUntilTarget(
  componentInstance,
  TargetComponent,
  { maxTries = 10, shallowOptions, _shallow = shallow, rendered = false } = {}
) {
  if (!componentInstance) {
    throw new Error('componentInstance parameter is required');
  }
  if (!TargetComponent) {
    throw new Error('TargetComponent parameter is required');
  }

  let root = rendered
    ? componentInstance
    : _shallow(componentInstance, shallowOptions);

  if (typeof root.type() === 'string') {
    // If type() is a string then it's a DOM Node.
    // If it were wrapped, it would be a React component.
    throw new Error('Cannot unwrap this component because it is not wrapped');
  }

  for (let tries = 1; tries <= maxTries; tries += 1) {
    if (root.is(TargetComponent)) {
      // Now that we found the target component, render it.
      return root.shallow(shallowOptions);
    }
    // Unwrap the next component in the hierarchy.
    root = root.dive();
  }

  throw new Error(
    `Could not find ${TargetComponent} in rendered instance: ${componentInstance};
    gave up after ${maxTries} tries`
  );
}

export const createTestStore = (
  reducer = rootReducer,
  initialState = INITIAL_STATE
) => {
  const store = {
    state: reducer(initialState, {}),
  };
  const getState = () => store.state;
  const dispatch = action => {
    if (typeof a === 'function') {
      action(dispatch, getState);
    } else {
      store.state = reducer(store.state, action);
    }
  };
  store.dispatch = dispatch;
  return store;
};
