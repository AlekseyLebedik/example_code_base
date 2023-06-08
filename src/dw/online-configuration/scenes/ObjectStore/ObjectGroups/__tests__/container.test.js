import React from 'react';

import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';

import createStore from 'dw/online-configuration/store';
import ObjectGroupsContainer from '../container';
import * as actions from '../actions';

describe.skip('ObjectGroups container', () => {
  let store;
  let context;
  let props;
  let fetchGroups;
  let fetchCategories;

  beforeEach(() => {
    fetchGroups = jest.spyOn(actions, 'fetchGroups');
    fetchCategories = jest.spyOn(actions, 'fetchCategories');
    // eslint-disable-next-line
    store = createStore().store;
    props = {
      match: {
        params: {
          id: 1,
        },
        path: '?id=1',
      },
    };
    context = createRouterContext({
      match: {
        params: {
          id: 1,
        },
        path: '?id=1',
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the presentational component', () => {
    const wrapper = shallowUntilTarget(
      <ObjectGroupsContainer store={store} {...props} />,
      'ObjectGroups',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('fetchGroups when component mounts', () => {
    shallowUntilTarget(
      <ObjectGroupsContainer store={store} {...props} />,
      'ObjectGroups',
      {
        shallowOptions: { context },
      }
    );
    expect(fetchGroups).toBeCalled();
  });

  it('fetchCategories when component mounts', () => {
    shallowUntilTarget(
      <ObjectGroupsContainer store={store} {...props} />,
      'ObjectGroups',
      {
        shallowOptions: { context },
      }
    );
    expect(fetchCategories).toBeCalled();
  });

  it('selected Groups would be null if no params in the router', () => {
    props = {
      match: {
        params: {},
        path: '',
      },
    };
    const wrapper = shallowUntilTarget(
      <ObjectGroupsContainer store={store} {...props} />,
      'ObjectGroups',
      { shallowOptions: { context } }
    );
    expect(wrapper.props().selectedItem).toBeNull();
  });
});
