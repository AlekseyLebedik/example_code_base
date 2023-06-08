import React from 'react';
import { change as changeFieldValue } from 'redux-form';

import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'shared/store';

import { FORM_NAME as TEST_FORM_NAME } from '../../../constants';
import { fetchConfigsSuccess } from '../../../actions';
import ConfigFieldComponent from '../index';

describe('ABTesting component ConfigFieldComponent', () => {
  let store = null;
  const props = {
    input: {
      name: 'TEST-FORM',
      value: { configName: 'testCfg', configID: '15716207803415653925' },
    },
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    ({ store } = createStore());
  });

  it('renders valid config', () => {
    const context = '1:cert';
    const configs = [
      {
        updated: '1542027298',
        modifiers: '{"second_campaign_value": 2}',
        name: 'cfg1',
        created: '1542027282',
        serviceID: 't8',
        context: 'game2',
        configID: '15716207803415653925',
        immutable: true,
      },
    ];
    store.dispatch(changeFieldValue(TEST_FORM_NAME, 'context', context));
    store.dispatch(fetchConfigsSuccess({ data: configs }, context));
    expect(
      shallowUntilTarget(
        <ConfigFieldComponent store={store} {...props} />,
        'SelectedConfig'
      )
    ).toMatchSnapshot();
  });

  it('renders invalid config', () => {
    expect(
      shallowUntilTarget(
        <ConfigFieldComponent store={store} {...props} />,
        'SelectedConfig'
      )
    ).toMatchSnapshot();
  });
  it('renders disabled config', () => {
    const newProps = {
      ...props,
      disabled: true,
    };
    const context = '1:cert';
    const configs = [
      {
        name: 'cfg1',
        configID: '15716207803415653925',
      },
    ];
    store.dispatch(changeFieldValue(TEST_FORM_NAME, 'context', context));
    store.dispatch(fetchConfigsSuccess({ data: configs }, context));
    expect(
      shallowUntilTarget(
        <ConfigFieldComponent store={store} {...newProps} />,
        'SelectedConfig'
      )
    ).toMatchSnapshot();
  });
});
