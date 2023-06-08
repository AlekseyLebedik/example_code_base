import React from 'react';
import { shallow } from 'enzyme';
import set from 'lodash/set';

import RouteLink from '../index';

describe('RouteLink', () => {
  const linkParams = {
    two: 2,
    three: 3,
  };
  const queryParams = {
    q: 'blah',
  };
  const routes = [
    {
      name: 'route-one',
      routePath: 'route-one/:two?/:three?/',
    },
  ];
  const state = {};
  set(state, 'Components.TitleSelector.currentEnv.shortType', 'dev');
  set(state, 'Components.TitleSelector.currentTitle.id', 1);
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state,
  };
  describe('render', () => {
    it('linkName if route not found', () => {
      const wrapper = shallow(
        <RouteLink
          routeName="route-one"
          linkName="My Link"
          linkParams={linkParams}
          baseUrl="go-online"
          store={store}
        />
      ).shallow();
      expect(wrapper).toMatchSnapshot();
    });
    it('Link with correct path to route', () => {
      const wrapper = shallow(
        <RouteLink
          routeName="route-one"
          linkName="My Link"
          linkParams={linkParams}
          baseUrl="go-online"
          routes={routes}
          store={store}
        />
      ).shallow();
      expect(wrapper).toMatchSnapshot();
    });
    it('Link with correct path to route with query params', () => {
      const wrapper = shallow(
        <RouteLink
          routeName="route-one"
          linkName="My Link"
          queryParams={queryParams}
          baseUrl="go-online"
          routes={routes}
          store={store}
        />
      ).shallow();
      expect(wrapper).toMatchSnapshot();
    });
    it('custom params passed to <a> tag', () => {
      const wrapper = shallow(
        <RouteLink
          routeName="route-one"
          linkName="My Link"
          linkParams={linkParams}
          baseUrl="go-online"
          routes={routes}
          store={store}
          className="custom-link"
          target="blank"
        />
      ).shallow();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
