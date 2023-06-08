/* eslint-disable jest/valid-expect */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';

import { useABTestingProjectPermission } from 'dw/core/hooks';
import { useContextListHook } from 'abtesting/scenes/hooks';
import ABTestForm from '../presentational';

jest.mock('dw/core/hooks', () => ({
  ...jest.requireActual('dw/core/hooks'),
  useABTestingProjectPermission: jest.fn(),
}));
jest.mock('abtesting/scenes/hooks', () => ({
  ...jest.requireActual('abtesting/scenes/hooks'),
  useContextListHook: jest.fn(),
}));

describe('abtesting/scenes/ABTestForm', () => {
  const props = {
    contextList: [{ id: '1:dev', name: 'GTR-PS3 / PS3 / dev' }],
    history: {},
    handleSubmit: jest.fn(() => jest.fn()),
    saveTestSubmit: jest.fn(),
    handlerAddTest: jest.fn(),
    showPlatformField: false,
    categoriesList: ['foo', 'bar'],
    firstPartiesList: ['foo', 'bar'],
  };
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <ABTestForm {...props} />
      </Provider>
    );
  });
  it('displays default component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('displays form errors', () => {
    wrapper.setProps({
      ...props,
      submitFailed: true,
      formErrors: {
        cohorts: [
          {
            percent: 'Should be in a range (1 to 100)',
            name: 'Required',
            treatments: [
              {
                start: 'Required',
                end: 'Required',
                configs: {
                  _error: 'Config is required',
                },
              },
            ],
          },
        ],
        context: 'Required',
        name: 'Required',
        catchStart: 'Required',
        catchEnd: 'Required',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('submit button enabled by default', () => {
    expect(wrapper.contains(<span>Save</span>));
  });

  it('submit button disabled when saving', () => {
    wrapper.setProps({
      ...props,
      saving: true,
    });
    expect(wrapper.contains(<span>Saving...</span>));
  });

  it('loading component when contextlist is loading', () => {
    useABTestingProjectPermission.mockReturnValueOnce([true, '', {}]);
    useContextListHook.mockReturnValueOnce([true, []]);
    const wrapperChild = wrapper.dive().dive();
    expect(wrapperChild).toMatchSnapshot();
  });

  it('loading component when permission is loading', () => {
    useABTestingProjectPermission.mockReturnValueOnce([true, '', {}]);
    useContextListHook.mockReturnValueOnce([false, props.contextList]);
    const wrapperChild = wrapper.dive().dive();
    expect(wrapperChild).toMatchSnapshot();
  });

  it('ABTestForm component when loaded', () => {
    useABTestingProjectPermission.mockReturnValueOnce([
      false,
      '',
      { data: { permission: true } },
    ]);
    useContextListHook.mockReturnValueOnce([false, props.contextList]);
    const wrapperChild = wrapper.dive().dive();
    expect(wrapperChild).toMatchSnapshot();
  });
});
