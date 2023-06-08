import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';
import { AgGridReact } from 'ag-grid-react';

import createStore from 'shared/store';
import AgGridIndex from '../index';

describe('AgGridComponent', () => {
  let wrapper;
  const rowData = [
    {
      category: '',
      environment: 'dev',
      id: '1234',
      name: 'bar',
      platform: 'PSN\nXBL',
      project: { id: 22, contentTypeId: 57 },
      source: '',
      status: 'config',
      target: '',
      testPeriodEnd: 1607531860,
      testPeriodFrom: '1573231060',
      testPeriodStart: 1573231060,
      testPeriodTo: '1607531860',
      testStatus: 'Upcoming',
      title: 'test_1',
      titleID: 5682,
    },
    {
      category: '',
      environment: 'live',
      id: '5678',
      name: 'foo',
      platform: 'PSN\nXBL',
      project: { id: 22, contentTypeId: 57 },
      source: '',
      status: 'config',
      target: '',
      testPeriodEnd: 1606581954,
      testPeriodFrom: '1573231554',
      testPeriodStart: 1573231554,
      testPeriodTo: '1606581954',
      testStatus: 'Upcoming',
      title: 'test_2',
      titleID: 5682,
    },
  ];
  const render = (newProps = {}) => {
    const { store } = createStore();
    const props = {
      rowData,
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

    wrapper = shallowUntilTarget(
      <Router>
        <AgGridIndex store={store} {...props} />
      </Router>,
      'AgGridComponent',
      {
        shallowOptions: { context },
      }
    );

    return wrapper;
  };
  beforeEach(() => {
    wrapper = render();
  });
  it('renders AgGridComponent', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders AgGrid with row data', () => {
    const agGridReact = wrapper.find(AgGridReact);
    expect(agGridReact).toMatchSnapshot();
    expect(agGridReact.props().rowData).toEqual(rowData);
  });
});
