import React from 'react';
import { createTestStore, shallowUntilTarget } from 'dw/test-utils';

import { reducer } from '../../../reducer';
import AddConfig from '../index';

describe('ABTesting component AddConfig', () => {
  let store = null;
  beforeEach(() => {
    ({ store } = createTestStore('Scenes.ABTestForm', reducer));
  });

  it('renders component', () => {
    const props = {
      store,
      onAdd: jest.fn(),
    };
    expect(
      shallowUntilTarget(<AddConfig {...props} />, 'AddConfigComponent')
    ).toMatchSnapshot();
  });
});
