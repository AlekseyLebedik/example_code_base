import React from 'react';
import { shallowUntilTarget } from 'dw/test-utils';
import Error404 from 'dw/core/components/Error404';
import createStore from 'dw/reporting/store';
import * as actions from 'dw/reporting/actions';
import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';
import Dashboard from '../container';

describe('Dashboard container', () => {
  let store;
  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
  });
  it('no franchises', () => {
    store.dispatch(actions.fetchFranchisesSucceed([]));
    const props = {
      match: { path: '/reporting', params: { franchiseId: 1 } },
      store,
    };
    const wrapper = shallowUntilTarget(<Dashboard {...props} />, Error404);
    expect(wrapper).toHaveLength(1);
  });

  it('renders TrendTable, TrendCharts and PlatformsTable', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const props = {
      history: {},
      location: { pathname: '/reporting/1' },
      match: {
        path: '/reporting/:franchiseId',
        params: { franchiseId: 1 },
      },
      store,
    };
    const wrapper = shallowUntilTarget(
      <Dashboard {...props} />,
      'DashboardStateless'
    );
    expect(wrapper).toMatchSnapshot();
    const sizer = wrapper.find('AutoSizer').shallow();
    expect(sizer).toMatchSnapshot();
  });
});
