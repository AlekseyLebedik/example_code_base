import React from 'react';
import { createTestStore, shallowUntilTarget } from 'dw/test-utils';

import reducer from 'dw/core/components/ModalHandlers/reducer';
import { openModalHandler } from 'dw/core/components/ModalHandlers/actions';
import ConfigForm from '../index';

describe('ABTesting component ConfigForm', () => {
  let store = null;
  beforeEach(() => {
    ({ store } = createTestStore('Core.ModalHandlers', reducer));
  });

  it('renders default form', () => {
    const props = {
      store,
      formName: 'Test',
    };
    expect(
      shallowUntilTarget(<ConfigForm {...props} />, 'ConfigForm')
    ).toMatchSnapshot();
  });

  it('renders visible form', () => {
    const formName = 'test';
    const props = {
      store,
      formName,
      config: {
        updated: '1542027298',
        modifiers: '{"second_campaign_value": 2}',
        name: 'cfg1',
        created: '1542027282',
        serviceID: 't8',
        context: 'game2',
        configID: '15716207803415653925',
        immutable: true,
      },
    };
    store.dispatch(openModalHandler(formName));
    expect(
      shallowUntilTarget(<ConfigForm {...props} />, 'ConfigForm')
    ).toMatchSnapshot();
  });
});
