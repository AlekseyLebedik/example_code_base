import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { shallowUntilTarget } from 'dw/test-utils';
import createRouterContext from 'react-router-test-context';
import SearchAuditLogs from '../container';

describe('SearchForm Container', () => {
  let context;

  const values = {
    username: 'jheslin',
    userType: 'b2b',
    unixtime: 1558452266,
    unixtimeMillis: 1558452266892,
    category: 'Devzone.Admin.TestAction.SubAction',
    titleID: 1,
    auditTitleID: 4444,
    env: 'dev',
    auditEnv: 'dev',
    context: 'big_context',
    auditContext: 'important_context',
    entityName: 'user_c',
    entityID: 1008,
    sourceName: 'auditlog',
    extra: {
      example_specific_property: 25555,
    },
  };

  beforeEach(() => {
    // eslint-disable-next-line
    context = createRouterContext();
  });
  it('onSearch triggers fetchAuditLogs action', () => {
    const props = {
      onRefresh: jest.fn(),
    };
    const wrapper = shallowUntilTarget(
      <Router>
        <SearchAuditLogs {...props} />
      </Router>,
      'ReduxForm',
      {
        shallowOptions: { context },
      }
    );
    wrapper.props().onSearch(values);
    expect(props.onRefresh).toHaveBeenCalled();
  });
});
