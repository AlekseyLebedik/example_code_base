import React from 'react';
import { shallow } from 'enzyme';

import { TEST_STATUS } from 'dw/abtesting-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'shared/store';

import ActionsPanelComponent from '../index';

const initialState = {
  record: {
    id: 1,
    status: 'config',
  },
  history: {
    push: jest.fn(),
  },
  events: {
    approveHandler: jest.fn(),
    killHandler: jest.fn(),
    archiveHandler: jest.fn(),
  },
};

describe('ActionsPanel', () => {
  let store = null;
  beforeEach(() => {
    ({ store } = createStore());
  });
  it('renders properly when is a main route', () => {
    const context = createRouterContext({
      match: {
        params: {
          id: 1,
        },
        path: '?id=1',
      },
    });
    expect(
      shallowUntilTarget(
        <Router>
          <ActionsPanelComponent store={store} {...initialState} />
        </Router>,
        'ActionsPanel',
        {
          shallowOptions: { context },
        }
      )
    ).toMatchSnapshot();
  });

  it('renders properly for each of any states', () => {
    Object.values(TEST_STATUS).forEach(status => {
      const newProps = { ...initialState, record: { id: 1, status } };
      expect(
        shallow(<ActionsPanelComponent store={store} {...newProps} />)
      ).toMatchSnapshot();
    });
  });
});
