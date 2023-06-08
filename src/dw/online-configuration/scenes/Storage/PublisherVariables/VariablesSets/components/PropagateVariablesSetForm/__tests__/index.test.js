import React from 'react';
import { createStore, combineReducers } from 'redux';
import { shallowUntilTarget } from 'dw/test-utils';

import { reducer as reduxFormReducer } from 'redux-form';

import PropagateVariablesSetForm from '../index';

describe('PropagateVariablesSetForm', () => {
  let store = null;
  let props;

  beforeEach(() => {
    store = createStore(combineReducers({ form: reduxFormReducer }));
    props = {
      store,
      onSubmit: jest.fn(),
      externalSubmit: jest.fn(),
      isAllowed: true,
      setAllowed: jest.fn(),
    };
  });

  it('renders component', () => {
    expect(
      shallowUntilTarget(
        <PropagateVariablesSetForm {...props} />,
        'PropagateVariablesSetFormBase'
      )
    ).toMatchSnapshot();
  });
});
