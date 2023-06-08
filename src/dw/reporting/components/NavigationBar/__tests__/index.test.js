import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallowUntilTarget } from 'dw/test-utils';
import { shallow } from 'enzyme';
import createRouterContext from 'react-router-test-context';
import createStore from 'dw/reporting/store';
import * as actions from 'dw/reporting/actions';
import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';
import NavigationBar from '../index';

describe.skip('NavigationBar', () => {
  const franchiseId = 2;
  let store;
  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
  });

  it('renders LoadingSkeleton while no franchise', () => {
    const context = createRouterContext();
    const wrapper = shallow(
      <NavigationBar.WrappedComponent store={store} {...context.router.route} />
    );
    expect(wrapper.find('LoadingSkeleton')).toHaveLength(3);
  });

  it('renders Franchises navigation links', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { params: { franchiseId } },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.franchise-selector Link')).toHaveLength(
      franchisesMock.length
    );
    expect(wrapper.find('.franchise-selector .active')).toHaveLength(1);
  });

  it('no active item in franchise selector on 404', () => {
    const nonExistFranchise = 999;
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { params: { franchiseId: nonExistFranchise } },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.franchise-selector Link')).toHaveLength(
      franchisesMock.length
    );
    expect(wrapper.find('.franchise-selector .active')).toHaveLength(0);
  });

  it('renders back link', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { path: '/reporting/:franchiseId', params: { franchiseId } },
      location: { pathname: `/reporting/${franchiseId}/stats` },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.back-to-index')).toHaveLength(1);
  });

  it('no back link on 404', () => {
    const nonExistFranchise = 999;
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { params: { franchiseId: nonExistFranchise } },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.back-to-index')).toHaveLength(0);
  });

  it('no back link for Franchise Statistic', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { path: '/reporting/:franchiseId', params: { franchiseId } },
      location: { pathname: `/reporting/${franchiseId}` },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.back-to-index')).toHaveLength(0);
  });

  it('unique for Franchise Statistic', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { path: '/reporting/:franchiseId', params: { franchiseId } },
      location: { pathname: `/reporting/${franchiseId}` },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.header')).toMatchSnapshot();
  });

  it('unique for Franchise Report', () => {
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: { path: '/reporting/:franchiseId', params: { franchiseId } },
      location: { pathname: `/reporting/${franchiseId}/stats` },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.header')).toMatchSnapshot();
  });

  it('unique for Title Report', () => {
    const projectId = 4;
    store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const context = createRouterContext({
      match: {
        path: '/reporting/:franchiseId/projects/:projectId',
        params: { franchiseId, projectId },
      },
      location: { pathname: `/reporting/${franchiseId}/projects/${projectId}` },
    });
    const wrapper = shallowUntilTarget(
      <Router>
        <NavigationBar store={store} />
      </Router>,
      'NavigationBar',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.find('.header')).toMatchSnapshot();
  });
});
