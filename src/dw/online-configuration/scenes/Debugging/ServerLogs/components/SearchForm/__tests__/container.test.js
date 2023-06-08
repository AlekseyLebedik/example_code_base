import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import { shallowUntilTarget } from 'dw/test-utils';
import queryString from 'query-string';
import createRouterContext from 'react-router-test-context';

import createStore from 'dw/online-configuration/store';

import SearchForm from '../container';

jest.mock('../../../actions');

describe('SearchForm container', () => {
  let store;
  let context;

  const values = {
    connId: null,
    debug: true,
    achievements_engine: true,
    'loot-generation': true,
    'tournament-engine': true,
    commsservice: true,
    dwThcnagios: false,
    dwsproxy: true,
    lsg: true,
    auth3: true,
    warning: true,
    marketplace: true,
    mmp3: true,
    abtesting: true,
    loginqueue: true,
    objectstore: true,
    webservice: true,
    endDate: 123456789,
    error: true,
    info: true,
    startDate: null,
    transId: null,
    userId: null,
    uno: false,
    umbrella: false,
    'storage-script-service': true,
  };
  const now = 123456789;
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(now * 1000));
  });

  beforeEach(() => {
    // eslint-disable-next-line
    store = createStore().store;
    context = createRouterContext();
  });

  it('has empty values by default', () => {
    const wrapper = shallowUntilTarget(
      <MemoryRouter>
        <SearchForm store={store} />
      </MemoryRouter>,
      'ReduxForm',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.props().initialValues).toEqual({
      connId: null,
      startDate: null,
      transId: null,
      userId: null,
      abtesting: true,
      loginqueue: true,
      commsservice: true,
      objectstore: true,
      webservice: true,
      achievements_engine: true,
      auth3: true,
      debug: true,
      dwThcnagios: false,
      dwsproxy: true,
      endDate: 123456789,
      error: true,
      info: true,
      'loot-generation': true,
      lsg: true,
      marketplace: true,
      mmp3: true,
      'tournament-engine': true,
      warning: true,
      uno: false,
      umbrella: false,
      'storage-script-service': true,
    });
  });

  it('uses values from store', () => {
    const wrapper = shallowUntilTarget(
      <MemoryRouter>
        <SearchForm store={store} />
      </MemoryRouter>,
      'ReduxForm',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.props().initialValues).toEqual(values);
  });

  it('uses values from query param', () => {
    context = createRouterContext({
      location: {
        search: queryString.stringify({
          ...omit(values, [
            'error',
            'debug',
            'auth3',
            'abtesting',
            'loginqueue',
            'objectstore',
            'webservice',
            'achievements_engine',
            'dwThcnagios',
            'dwsproxy',
            'info',
            'loot-generation',
            'lsg',
            'marketplace',
            'tournament-engine',
            'mmp3',
          ]),
        }),
      },
    });
    const wrapper = shallowUntilTarget(
      <MemoryRouter>
        <SearchForm store={store} />
      </MemoryRouter>,
      'ReduxForm',
      {
        shallowOptions: { context },
      }
    );
    expect(wrapper.props().initialValues).toEqual(values);
  });
});
