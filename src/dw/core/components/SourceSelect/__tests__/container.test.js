import React from 'react';

import { shallowUntilTarget, createTestStore } from 'dw/test-utils';

import SourceSelect from '../container';
import SourceSelectStateless from '../presentational';
import * as actions from '../actions';
import reducer from '../reducer';

describe.skip('SourceSelect', () => {
  let store = null;

  function render() {
    const props = {
      store,
      initialValue: '1234567890',
      apiCall: jest.fn(),
      renderOption: item => `${item.userName} | ${item.userID}`,
      onSelect: jest.fn(),
      onFocus: jest.fn(),
      onChange: jest.fn(),
    };

    return shallowUntilTarget(
      <SourceSelect {...props} />,
      SourceSelectStateless
    );
  }

  beforeAll(() => {
    ({ store } = createTestStore('Core.SourceSelect', reducer));
  });

  it('renders container with default props', () => {
    const root = render();
    expect(root.find('AutoComplete').prop('value')).toBe('1234567890');
  });

  it('renders container with formatted dataSource param', () => {
    const data = {
      userName: 'rockstar_user',
      reputation: 15,
      userID: '1234567890',
    };
    const fetchSuccessAction = actions.fetchSuccess({ data: [data] });
    store.dispatch(fetchSuccessAction);

    const root = render();
    expect(root.find('AutoComplete').prop('dataSource')).toEqual([
      'rockstar_user | 1234567890',
    ]);
  });
});
