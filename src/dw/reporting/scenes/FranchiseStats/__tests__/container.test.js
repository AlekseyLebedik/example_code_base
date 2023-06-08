import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';
import Error404 from 'dw/core/components/Error404';
import createStore from 'dw/reporting/store';
import * as actions from 'dw/reporting/actions';
import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';
import FranchiseStats from '../container';

describe.skip('FranchiseStats container', () => {
  let store;
  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
  });
  it('no franchises', () => {
    store.dispatch(actions.fetchFranchisesSucceed([]));
    const context = createRouterContext({
      location: { pathname: '/reporting' },
      match: { path: '/reporting', params: { franchiseId: 1 } },
    });
    const props = {
      store,
    };
    const wrapper = shallowUntilTarget(
      <Router>
        <FranchiseStats {...props} />
      </Router>,
      Error404,
      { shallowOptions: { context } }
    );
    expect(wrapper).toHaveLength(1);
  });

  it('renders FranchiseStatsStateless component', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      location: { pathname: '/reporting' },
      match: { path: '/reporting', params: { franchiseId: 1 } },
    });
    const props = {
      store,
    };
    const wrapper = shallowUntilTarget(
      <Router>
        <FranchiseStats {...props} />
      </Router>,
      'FranchiseStats',
      { shallowOptions: { context } }
    );
    expect(wrapper.find('FranchiseStatsStateless')).toHaveLength(1);
  });
});
