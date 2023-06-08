import React from 'react';

import { shallowUntilTarget } from 'dw/test-utils';

import { createStore } from 'redux';
import { reduxForm } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
// import { LocalizedFormFieldDateTimePicker as DateTimePicker } from 'dw/core/components/DateTimePicker';
import SearchForm from '../presentational';
import { FORM_NAME, LOG_LEVELS } from '../constants';

const shallow = (
  wrapper,
  target,
  { context, initialSelector, maxTries = 10 } = {}
) => {
  let result;
  let root = wrapper;
  if (initialSelector) root = root.find(initialSelector);
  for (let tries = 1; tries <= maxTries; tries += 1) {
    result = root.find(target);
    if (result.length > 0) return result;
    root = root.shallow({ context });
  }
  return result;
};

const getStore = (values = {}) =>
  createStore(state => state, {
    form: { [FORM_NAME]: { values } },
    user: { profile: {} },
  });

const getReduxFormContext = store => {
  const FakeForm = reduxForm({
    form: FORM_NAME,
  })(() => {});

  const fakeForm = shallowUntilTarget(
    <FakeForm store={store} />,
    'ReduxForm'
  ).instance();
  fakeForm.getFormState = state =>
    fakeForm.props.getFormState(state)[fakeForm.props.form];
  return { _reduxForm: fakeForm, store };
};

describe('SearchForm presentational', () => {
  const wrapper = shallowUntilTarget(
    <SearchForm onSearch={jest.fn()} store={getStore()} />,
    'SearchFormStateless'
  );

  it('Structure', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Fields', () => {
    const values = {
      startDate: 1,
      endDate: 2,
      userId: '1234567890',
      connId: '123',
      transId: '321',
      error: true,
      warning: false,
      debug: false,
      info: true,
    };
    const store = getStore(values);
    const context = getReduxFormContext(store);

    it.skip('userId > Input', () => {
      const field = shallow(wrapper, Input, {
        context,
        initialSelector: 'Field[name="userId"]',
      });
      expect(field).toHaveLength(1);
      expect(field.props().input.value).toBe(values.userId);
    });

    it.skip('connId > Input', () => {
      const field = shallow(wrapper, Input, {
        context,
        initialSelector: 'Field[name="connId"]',
      });
      expect(field).toHaveLength(1);
      expect(field.props().input.value).toBe(values.connId);
    });

    it.skip('transId > Input', () => {
      const field = shallow(wrapper, Input, {
        context,
        initialSelector: 'Field[name="transId"]',
      });
      expect(field).toHaveLength(1);
      expect(field.props().input.value).toBe(values.transId);
    });

    // describe('TimeRange', () => {
    //   const timeRangeFields = shallow(wrapper, 'RenderTimeRange', {
    //     context,
    //     initialSelector: 'FormValues',
    //   }).shallow();

    //   it('startDate > DateTimePicker', () => {
    //     const field = shallow(timeRangeFields, DateTimePicker, {
    //       context,
    //       initialSelector: 'Field[name="startDate"]',
    //     });
    //     expect(field).toHaveLength(1);
    //     expect(field.props().input.value).toBe(values.startDate);
    //     expect(field.props().maxDate).toBe(values.endDate);
    //   });

    //   it('endDate > DateTimePicker', () => {
    //     const field = shallow(timeRangeFields, DateTimePicker, {
    //       context,
    //       initialSelector: 'Field[name="endDate"]',
    //     });
    //     expect(field).toHaveLength(1);
    //     expect(field.props().input.value).toBe(values.endDate);
    //     expect(field.props().minDate).toBe(values.startDate);
    //   });
    // });

    it.skip('LogLevels', () => {
      LOG_LEVELS.forEach(logLevel => {
        const field = shallow(wrapper, Checkbox, {
          context,
          initialSelector: `WithStyles[logLevel="${logLevel}"]`,
        });
        expect(field).toHaveLength(1);
        expect(field.props().input.value).toBe(values[logLevel]);
      });
    });
  });
});
