import React from 'react';
import { createStore, combineReducers } from 'redux';
import { shallowUntilTarget } from 'dw/test-utils';

import { reducer as reduxFormReducer } from 'redux-form';

import PropagateObjectsForm from '../index';

describe('PropagateObjectsFormForm', () => {
  let store = null;
  let props;

  beforeEach(() => {
    store = createStore(combineReducers({ form: reduxFormReducer }));
    props = {
      store,
      onSubmit: jest.fn(),
      externalSubmit: jest.fn(),
      initialValues: {
        objects: [{ fileName: 'blah1' }, { fileName: 'blah2' }],
      },
    };
  });

  it('renders component', () => {
    expect(
      shallowUntilTarget(
        <PropagateObjectsForm {...props} />,
        'PropagateObjectsForm'
      )
    ).toMatchSnapshot();
  });
});
