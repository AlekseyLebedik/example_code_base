import React from 'react';
import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import setupApollo from 'dw/core/helpers/setupApollo';

import titleSelectorReducer from 'dw/core/components/TitleSelector/reducer';
import userReducer, {
  actions as userActions,
} from '@demonware/devzone-core/modules/user';
import permissionsReducer, {
  actions as permissionsActions,
} from '@demonware/devzone-core/modules/permissions';
import switchesReducer, {
  actions as switchesActions,
} from '@demonware/devzone-core/modules/switches';

const reducers = combineReducers({
  user: userReducer,
  permissions: permissionsReducer,
  switches: switchesReducer,

  Components: combineReducers({
    TitleSelector: titleSelectorReducer,
  }),
});

export default function createStore() {
  const store = _createStore(reducers, applyMiddleware(thunk));
  return { store };
}

export const { store } = createStore();

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export function mountWithProvider(component) {
  const wrapper = mount(<ReduxProvider>{component}</ReduxProvider>)
    .dive({ context: { store } })
    .dive();
  return wrapper;
}

export function shallowWithProvider(component, context = {}) {
  const wrapper = shallow(<ReduxProvider>{component}</ReduxProvider>)
    .dive({ context: { store, ...context } })
    .dive();
  return wrapper;
}

export function ApolloTestProvider({ children }) {
  return <ApolloProvider client={setupApollo()}>{children}</ApolloProvider>;
}

export { userActions, permissionsActions, switchesActions };
