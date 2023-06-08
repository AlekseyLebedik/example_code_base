import React from 'react';
import * as reduxForm from 'redux-form';
import { masterDetailFormProps as props } from 'playpants/testUtils/projectSettingsProps';
import mockState from 'playpants/testUtils/mockState';

import { createMockStore } from 'redux-test-utils';
import { shallowUntilTarget } from 'dw/test-utils';
import MasterDetailForm from '../index';

describe.skip('MasterDetailForm:', () => {
  let store = null;
  let masterDetailFormWrapper = null;
  const state = mockState;
  beforeEach(() => {
    store = createMockStore(state);

    reduxForm.initialize = jest.fn();
    reduxForm.change = jest.fn();
    jest.clearAllMocks();
    masterDetailFormWrapper = shallowUntilTarget(
      <MasterDetailForm store={store} {...props} />,
      'ReduxForm'
    );
  });

  it('correctly renders the ReduxForm', () => {
    expect(masterDetailFormWrapper).toMatchSnapshot();
  });

  describe('Triggers:', () => {
    it('triggers initialize on onSubmitSuccess', () => {
      masterDetailFormWrapper
        .props()
        .onSubmitSuccess(null, item => item, { values: {} });

      expect(reduxForm.initialize).toHaveBeenCalled();
    });
  });
});
