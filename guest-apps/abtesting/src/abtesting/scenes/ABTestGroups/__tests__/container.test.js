import React from 'react';

import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';

import createStore from 'shared/store';
import ABTestingGroupContainer from '../container';
import * as actions from '../actions';
import { GROUPS_LIST_PREFIX } from '../constants';

describe('ABTestingGroup container', () => {
  const { store } = createStore();

  beforeEach(() => {
    store.dispatch({
      type: `${GROUPS_LIST_PREFIX}_FETCH_SUCCESS`,
      data: [
        { groupID: 1, groupName: 'g1', description: 'G1' },
        { groupID: 2, groupName: 'g2', description: 'G2' },
      ],
    });
  });

  const render = (newProps = {}) => {
    const props = {
      match: {
        params: {
          id: 1,
        },
        path: '?id=1',
        url: 'test/blah',
      },
      history: {
        location: { search: {} },
        replace: jest.fn(),
      },
      ...newProps,
    };
    const context = createRouterContext({
      match: {
        params: {
          id: 1,
        },
        path: '?id=1',
      },
    });
    const wrapper = shallowUntilTarget(
      <ABTestingGroupContainer store={store} {...props} />,
      'ABTestingGroups',
      {
        shallowOptions: { context },
      }
    );

    return wrapper;
  };

  it('renders the presentational component', () => {
    const wrapper = render();
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('fetchGroups when component mounts', () => {
    const fetchGroups = jest.spyOn(actions, 'fetchGroups');
    const wrapper = render();
    wrapper.instance().changeContext({ target: { value: '1:dev' } });
    expect(fetchGroups).toBeCalled();
  });

  it('selected Group id should match params in the router', () => {
    const wrapper = render();
    expect(wrapper.props().selectedItem).toEqual({
      groupID: 1,
      groupName: 'g1',
      description: 'G1',
    });
  });

  it('selected Group would be null if no params in the router', () => {
    const newProps = {
      match: {
        params: {},
        path: '',
        url: 'test/blah',
      },
    };
    const wrapper = render(newProps);
    expect(wrapper.props().selectedItem).toBeNull();
  });
});
