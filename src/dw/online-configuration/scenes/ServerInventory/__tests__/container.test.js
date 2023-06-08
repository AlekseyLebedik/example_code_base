import React from 'react';

import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';

import createStore from 'dw/online-configuration/store';

import ServerInventory from '../container';
import * as AT from '../actionTypes';
import {
  fetchServersAllocation,
  fetchServersAllocationSuccess,
} from '../actions';

jest.mock('../actions');

fetchServersAllocation.mockImplementation(() => ({
  type: AT.SERVERS_ALLOC_FETCH,
}));

fetchServersAllocationSuccess.mockImplementation(payload => ({
  type: AT.SERVERS_ALLOC_FETCH_SUCCESS,
  data: payload && payload.data ? payload.data : [],
}));

describe.skip('ServerInventory container', () => {
  let store;
  let context;

  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
    context = createRouterContext({
      match: {
        url: 'server-inventory/',
        params: {
          context: 'context1',
          buildName: 'build1',
          dataCenter: 'gs-los-angeles',
        },
      },
    });
    fetchServersAllocation.mockClear();
    fetchServersAllocationSuccess.mockClear();
  });

  it('renders the presentational component', () => {
    const wrapper = shallowUntilTarget(
      <ServerInventory store={store} />,
      'ServerInventory',
      {
        shallowOptions: { context: createRouterContext() },
      }
    );
    expect(wrapper).toHaveLength(1);
  });

  it('fetchServersAllocation when component mounts', () => {
    shallowUntilTarget(<ServerInventory store={store} />, 'ServerInventory', {
      shallowOptions: { context: createRouterContext() },
    });
    expect(fetchServersAllocation).toBeCalled();
  });

  it('selected Variables would be null if no params in the router', () => {
    context = createRouterContext({
      match: {
        url: 'server-inventory/',
        params: {},
      },
    });
    const wrapper = shallowUntilTarget(
      <ServerInventory store={store} />,
      'ServerInventory',
      { shallowOptions: { context } }
    );
    expect(wrapper.props().selectedContext).toBeNull();
    expect(wrapper.props().selectedBuildName).toBeNull();
    expect(wrapper.props().selectedDataCenter).toBeNull();
  });

  it('selectedContext would be matching the router params', () => {
    context = createRouterContext({
      match: {
        url: 'server-inventory/',
        params: {
          context: 'context1',
        },
      },
    });
    const wrapper = shallowUntilTarget(
      <ServerInventory store={store} />,
      'ServerInventory',
      { shallowOptions: { context } }
    );
    expect(wrapper.props().selectedContext).toEqual('context1');
    expect(wrapper.props().selectedBuildName).toBeNull();
    expect(wrapper.props().selectedDataCenter).toBeNull();
  });

  it('selectedBuild would be matching the router params', () => {
    context = createRouterContext({
      match: {
        url: 'server-inventory/',
        params: {
          context: 'context1',
          buildName: 'build1',
        },
      },
    });
    const wrapper = shallowUntilTarget(
      <ServerInventory store={store} />,
      'ServerInventory',
      { shallowOptions: { context } }
    );
    expect(wrapper.props().selectedContext).toEqual('context1');
    expect(wrapper.props().selectedBuildName).toEqual('build1');
    expect(wrapper.props().selectedDataCenter).toBeNull();
  });

  it('selectedDataCenter would be matching the router params', () => {
    context = createRouterContext({
      match: {
        url: 'server-inventory/',
        params: {
          context: 'context1',
          buildName: 'build1',
          dataCenter: 'dataCenter1',
        },
      },
    });
    const wrapper = shallowUntilTarget(
      <ServerInventory store={store} />,
      'ServerInventory',
      { shallowOptions: { context } }
    );
    expect(wrapper.props().selectedContext).toEqual('context1');
    expect(wrapper.props().selectedBuildName).toEqual('build1');
    expect(wrapper.props().selectedDataCenter).toEqual('dataCenter1');
  });
});
