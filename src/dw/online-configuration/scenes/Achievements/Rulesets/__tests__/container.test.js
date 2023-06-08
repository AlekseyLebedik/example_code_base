import React from 'react';
import createRouterContext from 'react-router-test-context';
import { BrowserRouter as Router } from 'react-router-dom';

import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'dw/online-configuration/store';

import ConnectedRulesets from '../container';

describe('PlayerAssets', () => {
  let store;
  let context;

  const renderConnected = (customProps = {}) => {
    ({ store } = createStore());
    context = createRouterContext({
      match: {
        url: '/achievements/rulesets',
      },
      path: '/achievements/rulesets/:id?',
    });
    const onLoad = jest.fn();
    const onShowMore = jest.fn();
    const propsConnected = {
      store,
      onLoad,
      onShowMore,
      ...customProps,
    };

    return shallowUntilTarget(
      <Router>
        <ConnectedRulesets {...propsConnected} />
      </Router>,
      'Connect(Rulesets)',
      {
        shallowOptions: { context },
      }
    );
  };

  describe('Connected Ruleset Assets', () => {
    it('renders correctly', () => {
      const wrapper = renderConnected();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
