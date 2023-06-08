import React from 'react';
import createRouterContext from 'react-router-test-context';

import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'dw/online-configuration/store';

import ConnectedPlayerAssets from '../container';

describe.skip('PlayerAssets', () => {
  let store;
  let context;

  const renderConnected = (customProps = {}) => {
    ({ store } = createStore());
    context = createRouterContext({
      match: {
        url: '/marketplace/player-inventory',
        path: '/marketplace/player-inventory/:tab?/:userId?',
      },
    });
    const propsConnected = {
      store,
      ...customProps,
    };

    return shallowUntilTarget(
      <ConnectedPlayerAssets {...propsConnected} />,
      'Connect',
      {
        shallowOptions: { context },
      }
    );
  };

  describe('Connected Player Assets', () => {
    it('should change url if tab is selected', () => {
      const wrapper = renderConnected();
      const spy = jest.spyOn(wrapper.props().history, 'push');

      wrapper.props().onSelectTab(null, 'audit');

      expect(spy).toHaveBeenCalledWith('/marketplace/player-inventory/audit');
    });
  });
});
