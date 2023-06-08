import React from 'react';
import { shallowUntilTarget } from 'dw/test-utils';

import createStore from 'dw/reporting/store';
import * as actions from 'dw/reporting/actions';
import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';
import { AppConnected as App } from '../container';

describe('Reporting App', () => {
  let baseProps = {};
  beforeEach(() => {
    // eslint-disable-next-line
    const { store } = createStore();
    baseProps = Object.assign(baseProps, {
      store,
      match: { path: '/reporting', params: {} },
    });
  });

  it.skip('renders Empty element on empty franchises list', () => {
    baseProps.store.dispatch(actions.fetchFranchisesSucceed([]));
    const wrapper = shallowUntilTarget(<App {...baseProps} />, 'Empty');
    expect(wrapper).toHaveLength(1);
  });

  it.skip('renders AppStateless when franchises is null (loading)', () => {
    const wrapper = shallowUntilTarget(<App {...baseProps} />, 'AppStateless');
    expect(wrapper).toHaveLength(1);
  });

  it.skip('renders AppStateless with defaultId prop', () => {
    baseProps.store.dispatch(actions.fetchFranchisesSucceed(franchisesMock));
    const wrapper = shallowUntilTarget(<App {...baseProps} />, 'App');
    expect(wrapper).toHaveLength(1);
    expect(wrapper.props().defaultId).toBe(1);
  });
});
