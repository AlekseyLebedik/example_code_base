import React from 'react';
import { createStore, combineReducers } from 'redux';
import { shallowUntilTarget } from 'dw/test-utils';

import { reducer as reduxFormReducer } from 'redux-form';

import CreateGroupForm from '../index';

describe('CreateGroupForm', () => {
  let store = null;
  let props;

  beforeEach(() => {
    store = createStore(combineReducers({ form: reduxFormReducer }));
    props = {
      store,
      contextList: [
        { id: '1:dev', name: 'PS3 /Dev' },
        { id: '1:cert', name: 'PS3 / Cert' },
      ],
      onSubmit: jest.fn(),
    };
  });

  it('renders component', () => {
    expect(
      shallowUntilTarget(<CreateGroupForm {...props} />, 'ReduxForm')
    ).toMatchSnapshot();
  });
});
