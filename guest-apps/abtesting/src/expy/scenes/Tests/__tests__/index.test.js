import React from 'react';

import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import { shallowUntilTarget } from 'dw/test-utils';
import { useSelector } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';

import TestView from '../index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useHistory: jest.fn(),
}));

describe('ABTesting Test', () => {
  let wrapper = null;
  const props = {
    match: {
      params: {
        id: 1,
      },
      path: '?id=1',
      url: 'test/blah',
    },
    testId: 56,
    history: {
      location: { search: {} },
      replace: jest.fn(),
    },
  };
  const render = () => {
    const { store } = createStore();
    const context = createRouterContext({
      match: {
        params: {
          id: 1,
        },
        path: '?id=1',
      },
    });

    wrapper = shallowUntilTarget(
      <Router>
        <TestView store={store} {...props} />
      </Router>,
      'Tests',
      {
        shallowOptions: { context },
      }
    );

    return wrapper;
  };
  beforeEach(() => {
    useSelector.mockReturnValueOnce(true);
    useParams.mockReturnValue(props);
    useHistory.mockReturnValue(props.history);
    wrapper = render();
  });
  it('renders test snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
